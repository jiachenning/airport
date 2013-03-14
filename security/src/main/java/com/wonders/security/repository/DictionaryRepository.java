package com.wonders.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Dictionary;

public interface DictionaryRepository extends MyRepository<Dictionary, Long> {

	@Query("select distinct(a) from Dictionary a left join fetch a.children where a.parent.id = ?1")
	List<Dictionary> findByParentId(long parentId);
	
}
