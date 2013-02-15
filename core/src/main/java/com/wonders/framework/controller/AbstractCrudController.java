package com.wonders.framework.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Serializable;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wonders.framework.repository.MyRepository;

public abstract class AbstractCrudController<T, ID extends Serializable> {
	
	protected final Logger logger = LoggerFactory.getLogger(getClass());

	protected abstract MyRepository<T, ID> getRepository();

	@RequestMapping(method = RequestMethod.GET)
	protected @ResponseBody
	Page<T> findAll(@RequestParam Map<String, ?> params, Pageable pageable) {
		Map<?, ?> searchParams = getSearchParams(params);
		return getRepository().findAll(searchParams, pageable);
	}

	@RequestMapping(value = "{id}", method = RequestMethod.GET)
	protected @ResponseBody
	T findOne(@PathVariable ID id) {
		return getRepository().findOne(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	protected @ResponseBody
	String add(@RequestBody T entity) {
		getRepository().save(entity);
		return "{success: true}";
	}

	@RequestMapping(value = "{id}", method = RequestMethod.DELETE)
	protected @ResponseBody
	String delete(@PathVariable ID id) {
		getRepository().delete(id);
		return "{success: true}";
	}
	
	protected Map<String, Object> getSearchParams(Map<String, ?> params) {
		Map<String, Object> searchParams = new TreeMap<>();
		for (String key : params.keySet()) {
			if (StringUtils.startsWith(key, "search_")) {
				String name = StringUtils.substringAfter(key, "search_");
				Object value = params.get(key);
				searchParams.put(name, value);
			}
		}
		return searchParams;
	}
	
	@ExceptionHandler
	protected void handleException(HttpServletResponse response, Exception ex) {
		
		response.setCharacterEncoding("UTF-8");
		response.setContentType("application/json; charset=UTF-8");
		response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		
		try {
			PrintWriter writer = response.getWriter();
			writer.println(String.format("{success: false, errorMsg: '%s'}", ex.getMessage()));
			writer.flush();
		} catch (IOException e) {
			
		}
	}
	
}