package com.wonders.framework.repository;

import static org.apache.commons.lang3.StringUtils.isBlank;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.split;
import static org.apache.commons.lang3.StringUtils.startsWith;
import static org.apache.commons.lang3.StringUtils.substringAfter;
import static org.apache.commons.lang3.StringUtils.substringBefore;
import static org.apache.commons.lang3.StringUtils.upperCase;
import static org.apache.commons.lang3.reflect.FieldUtils.getField;
import static org.apache.commons.lang3.reflect.MethodUtils.invokeMethod;
import static org.springframework.data.jpa.repository.query.QueryUtils.toOrders;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.beanutils.ConvertUtils;
import org.apache.commons.beanutils.converters.AbstractConverter;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.EnumUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;

@SuppressWarnings("rawtypes")
public class MyRepositoryImpl<T, ID extends Serializable> extends
		SimpleJpaRepository<T, ID> implements MyRepository<T, ID> {

	private final Class<T> domainClass;
	private final EntityManager entityManager;
	
	static {
		ConvertUtils.register(new AbstractConverter() {
			@Override
			protected Object convertToType(Class type, Object value)
					throws Throwable {
				
				if (value instanceof String) {
					return DateUtils.parseDate((String) value, "yyyy-MM-dd");
				}
				return value;
			}
			
			@Override
			protected Class getDefaultType() {
				return Date.class;
			}
		}, Date.class);
		
		ConvertUtils.register(new AbstractConverter() {
			@Override
			protected Object convertToType(Class type, Object value)
					throws Throwable {
				
				if (value instanceof String) {
					return NumberUtils.toLong((String) value);
				}
				return value;
			}
			
			@Override
			protected Class getDefaultType() {
				return String.class;
			}
		}, Serializable.class);
	}

	public MyRepositoryImpl(Class<T> domainClass, EntityManager entityManager) {
		super(domainClass, entityManager);

		this.domainClass = domainClass;
		this.entityManager = entityManager;
	}

	@Override
	public Page<T> findAll(Map<?, ?> params, Pageable pageable) {
		
		TypedQuery<T> query = getQuery(params, pageable);
		return pageable == null ? new PageImpl<T>(query.getResultList()) : readPage(query, pageable, params);
	}

	private TypedQuery<T> getQuery(Map<?, ?> params, Pageable pageable) {
		
		Sort sort = pageable == null ? null : pageable.getSort();
		return getQuery(params, sort);
	}

	private TypedQuery<T> getQuery(Map<?, ?> params, Sort sort) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<T> query = builder.createQuery(domainClass);

		Root<T> root = query.from(domainClass);
		query.select(root);

		applySearchParamsCriteria(params, query);

		if (sort != null) {
			query.orderBy(toOrders(sort, root, builder));
		}

		return entityManager.createQuery(query);
	}

	private TypedQuery<Long> getCountQuery(Map<?, ?> params) {

		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> query = builder.createQuery(Long.class);

		Root<T> root = query.from(domainClass);
		query.select(builder.count(root));

		applySearchParamsCriteria(params, query);

		return entityManager.createQuery(query);
	}

	@SuppressWarnings("unchecked")
	private <S> void applySearchParamsCriteria(Map<?, ?> params, CriteriaQuery<S> query) {
		
		if (MapUtils.isEmpty(params)) {
			return;
		}
		
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		
		Root<T> root =  (Root<T>) query.getRoots()
			.iterator().next();
		
		List<Predicate> predicates = new ArrayList<>();
		for (Object key : params.keySet()) {
			
			String name = substringBefore((String) key, "_");
			String operator = substringAfter((String) key, "_");
			String value = (String) params.get(key);
			
			if (isBlank(value) 
					&& !startsWith(operator, "is")
					&& !StringUtils.equals(operator, "fetch")) {
				continue;
			}
			
			if (StringUtils.equals(operator, "fetch")) {
				if (query.getSelection() == root) {
					JoinType jt = JoinType.INNER;
					if (isNotBlank(value)) {
						jt = EnumUtils.getEnum(JoinType.class, upperCase(value));
					}
					root.fetch(name, jt);
				}
				continue;
			}
			
			try {
				predicates.add(buildPredicate(builder, root, name, operator, value));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		if (CollectionUtils.isNotEmpty(predicates)) {
			query.where(predicates.toArray(new Predicate[predicates.size()]));
		}
		
	}

	@SuppressWarnings("unchecked")
	private Predicate buildPredicate(CriteriaBuilder builder, Root<T> root,
			String name, String operator, String value) throws Exception {

		String[] names = split(name, ".");
		Path path = root.get(names[0]);
		for (int i = 1; i < names.length; i++) {
			path = path.get(names[i]);
		}

		Object val = convert(names, value);
		switch (operator) {
		case "eq":
			return builder.equal(path, val);
		case "like":
			return builder.like(path, "%" + val + "%");
		case "gt":
			return builder.greaterThan(path, (Comparable) val);
		case "lt":
			return builder.lessThan(path, (Comparable) val);
		case "ge":
			return builder.greaterThanOrEqualTo(path, (Comparable) val);
		case "le":
			return builder.lessThanOrEqualTo(path, (Comparable) val);
		}
		
		if (StringUtils.startsWith(operator, "is")) {
			return (Predicate) invokeMethod(builder, operator, path);
		}
		
		return (Predicate) invokeMethod(builder, operator, path, val);
	}

	private Page<T> readPage(TypedQuery<T> query, Pageable pageable,
			Map<?, ?> params) {

		query.setFirstResult(pageable.getOffset());
		query.setMaxResults(pageable.getPageSize());

		long total = getCountQuery(params).getSingleResult();
		List<T> content = total > pageable.getOffset() ? query.getResultList() : Collections.<T> emptyList();

		return new PageImpl<T>(content, pageable, total);
	}
	
	private Object convert(String[] names, String value) {
		
		if (isBlank(value)) {
			return value;
		}
		
		Class<?> cls = getField(domainClass, names[0], true).getType();
		for (int i = 1; i < names.length; i++) {
			cls =  getField(cls, names[i], true).getType();
		}
		
		return ConvertUtils.convert(value, cls);
 	}

}
