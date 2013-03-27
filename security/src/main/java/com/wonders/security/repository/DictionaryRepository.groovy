package com.wonders.security.repository

import org.springframework.data.jpa.repository.Query

import com.wonders.framework.repository.MyRepository
import com.wonders.security.entity.Dictionary

interface DictionaryRepository extends MyRepository<Dictionary, Long> {

	@Query("select distinct(a) from Dictionary a left join fetch a.children where a.parent.id = ?1 and a.typecode = ?2")
	List<Dictionary> findByParentId(long parentId, String typecode)
	
	@Query("from Dictionary where code = ?1")
	List<Dictionary> validateDictionaryCode(String code)
	
	@Query("from Dictionary where code = ?1 and id <> ?2")
	List<Dictionary> validateDictionaryCode(String code, long id)
	
	List<Dictionary> findByTypecode(String typecode)
}
