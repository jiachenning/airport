package com.wonders.security.service.impl

import javax.inject.Inject

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.wonders.security.entity.Account;
import com.wonders.security.repository.AccountRepository
import com.wonders.security.repository.RoleRepository
import com.wonders.security.service.AccountService

@Service
class AccountServiceImpl implements AccountService {
	
	@Inject
	AccountRepository accountRepository
	
	@Inject
	RoleRepository roleRepository

	@Override
	@Transactional
	Account addRolesToAccount(long accountId, long... roleIds) {
		
		def account = accountRepository.findOne(accountId)
		
		if (account) {
			
			def roles = roleRepository.findAll(roleIds as List)
			
			account.roles.addAll(roles)
		}
		
		account
	}

}
