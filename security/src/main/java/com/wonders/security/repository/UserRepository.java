package com.wonders.security.repository;

import org.springframework.data.jpa.repository.Query;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.User;

public interface UserRepository extends MyRepository<User, Long> {
	
	@Query("from User u left join fetch u.roles where u.username = ?1")
	User findByUsername(String username);

}
