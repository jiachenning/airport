package com.wonders.security.service

import javax.inject.Inject

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.wonders.security.repository.AccountRepository
import com.wonders.security.repository.UserRepository;

@Service
class UserService implements UserDetailsService {
	
	@Inject
	private UserRepository userRepository
	
	@Override
	@Transactional(readOnly = true)
	UserDetails loadUserByUsername(String username) {
		
		def user = userRepository.findByLoginName(username)
		if (!user) {
			throw new UsernameNotFoundException("user not found with username: [$username]!");
		}

		new User(user.loginName, user.password, [])
	}
	
}
