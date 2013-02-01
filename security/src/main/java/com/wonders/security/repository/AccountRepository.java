package com.wonders.security.repository;

import org.springframework.data.jpa.repository.Query;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Account;

public interface AccountRepository extends MyRepository<Account, Long> {
	
	@Query("from Account a left join fetch a.roles left join fetch a.authorities where a.loginName = ?1")
	Account findByLoginName(String loginName);

}
