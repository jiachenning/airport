package com.wonders.security.service

import javax.inject.Inject
import javax.inject.Named

import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException

import com.wonders.security.repository.UserRepository

@Named
class UserService implements UserDetailsService {
	
	@Inject
	private UserRepository userRepository
	
	@Override
	UserDetails loadUserByUsername(String username) {
		
		def user = userRepository.findByLoginName(username)
		if (!user) {
			throw new UsernameNotFoundException("user not found with username: [$username]!")
		}

		new User(user.loginName, user.password, [])
	}
	
}
