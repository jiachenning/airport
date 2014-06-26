package com.wonders.security.repository

import java.util.List;

import org.springframework.data.jpa.repository.Query

import com.wonders.framework.repository.MyRepository
import com.wonders.security.entity.Account;
import com.wonders.security.entity.Role

interface RoleRepository extends MyRepository<Role, Long> {

	@Query("select a.roles from Account a where a.id = ?1")
	List<Role> findByAccountId(accountId)
	
	Role findByCode(code)
	
	@Query("select distinct a from Role a join fetch a.authorities where a.id = ?1")
	List<Role> findRoleAuthorityByRoleId(roleId)
}
