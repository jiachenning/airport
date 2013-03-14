package com.wonders.security.repository

import org.springframework.data.jpa.repository.Query

import com.wonders.framework.repository.MyRepository
import com.wonders.security.entity.Group

interface GroupRepository extends MyRepository<Group, Long> {

	@Query("select distinct(g) from Group g left join fetch g.children where g.parent.id = ?1")
	List<Group> findByParentId(parentId)
	
}
