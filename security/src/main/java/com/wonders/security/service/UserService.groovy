package com.wonders.security.service

import javax.inject.Inject

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service

import com.wonders.security.repository.AccountRepository

@Service
class UserService implements UserDetailsService {
	
	@Inject
	private AccountRepository accountRepository
	
	@Override
	UserDetails loadUserByUsername(String username) {
		
		def account = accountRepository.findByLoginName(username)
		if (!account) {
			throw new UsernameNotFoundException("user not found with username: [$username]!");
		}
				
		new User(account.loginName, account.password, Collections.EMPTY_LIST)
	}
	
}
