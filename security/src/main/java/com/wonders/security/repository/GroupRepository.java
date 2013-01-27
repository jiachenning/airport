package com.wonders.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Group;

public interface GroupRepository extends MyRepository<Group, Long> {
	
	@Query("from Group g left join fetch g.children where g.parent.id = ?1")
	List<Group> findByParentId(long parentId);

}
