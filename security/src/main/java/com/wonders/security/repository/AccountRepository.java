package com.wonders.security.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Account;

public interface AccountRepository extends MyRepository<Account, Long> {
	
	Account findByLoginName(String loginName);
	
	@Query("from Account a join fetch a.group where a.user.id = ?1")
	List<Account> findByUserId(long userId);

}
