package com.wonders.security.repository

import org.springframework.data.jpa.repository.Query

import com.wonders.framework.repository.MyRepository
import com.wonders.security.entity.Account

interface AccountRepository extends MyRepository<Account, Long> {
	
	@Query("from Account a where a.user.loginName = ?1")
	List<Account> findByLoginName(loginName)

	@Query("from Account a join fetch a.group where a.user.id = ?1")
	List<Account> findByUserId(userId)

	@Query("from Account a join fetch a.group where a.group.id = ?1")
	List<Account> findByGroupId(groupId)
}
