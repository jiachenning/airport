package com.wonders.security.service

import javax.inject.Inject

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.wonders.security.repository.AccountRepository

@Service
class UserService implements UserDetailsService {
	
	@Inject
	private AccountRepository accountRepository
	
	@Override
	@Transactional(readOnly = true)
	UserDetails loadUserByUsername(String username) {
		
		def account = accountRepository.findByLoginName(username)
		if (!account) {
			throw new UsernameNotFoundException("user not found with username: [$username]!");
		}
		
		println 'load account.roles'
		println account.roles
		
		println 'load account.authorities'
		println account.authorities
		
		new User(account.loginName, account.password, Collections.EMPTY_LIST)
	}
	
}
