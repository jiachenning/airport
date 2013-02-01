package com.wonders.security.service

import javax.inject.Inject

import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service

import com.wonders.security.repository.UserRepository

@Service
class UserService implements UserDetailsService {
	
	@Inject
	private UserRepository userRepository

	@Override
	UserDetails loadUserByUsername(String username) {
		
//		println "username ===================== $username"
		
		def user = userRepository.findByUsername(username)
		if (!user) {
			throw new UsernameNotFoundException('user not fount with username [$username]')
		}
		
		def authorities = []
		user.roles.each { role ->
			def authority = new SimpleGrantedAuthority(role.name)
			authorities << authority
		}
		
		new User(user.username, user.password, authorities)
	}
	
}
