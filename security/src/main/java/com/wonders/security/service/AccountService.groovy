package com.wonders.security.service

import javax.inject.Inject

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.wonders.security.entity.Account
import com.wonders.security.repository.AccountRepository
import com.wonders.security.repository.RoleRepository

@Service
class AccountService {
	
	@Inject
	private AccountRepository accountRepository
	
	@Inject
	private RoleRepository roleRepository

	@Transactional
	Account addRolesToAccount(long accountId, long... roleIds) {
		
		def account = accountRepository.findOne(accountId)
		
		if (account) {
			
			def roles = roleRepository.findAll(roleIds as List)
			
			account.roles += roles
		}
		
		account
	}
	
	@Transactional
	Account removeRolesFromAccount(long accountId, long... roleIds) {
		
		def account = accountRepository.findOne(accountId)
		
		if (account) {
			
			def roles = roleRepository.findAll(roleIds as List)
			
			account.roles -= roles
		}
		
		account
	}

}
