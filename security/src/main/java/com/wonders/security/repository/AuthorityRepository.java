package com.wonders.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Authority;

public interface AuthorityRepository extends MyRepository<Authority, Long> {

	@Query("select distinct(a) from Authority a left join fetch a.children where a.parent.id = ?1")
	List<Authority> findByParentId(long parentId);
}
