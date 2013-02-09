package com.wonders.security.repository;

import java.util.List;

import com.wonders.framework.repository.MyRepository;
import com.wonders.security.entity.Account;

public interface AccountRepository extends MyRepository<Account, Long> {
	
	Account findByLoginName(String loginName);
	
	List<Account> findByUserId(long userId);

}
