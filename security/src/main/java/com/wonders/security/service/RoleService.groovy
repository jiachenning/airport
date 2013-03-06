package com.wonders.security.service

import javax.inject.Inject

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

import com.wonders.security.entity.Role
import com.wonders.security.repository.AuthorityRepository
import com.wonders.security.repository.RoleRepository

@Service
class RoleService {
	
	@Inject
	private AuthorityRepository authorityRepository
	
	@Inject
	private RoleRepository roleRepository

	@Transactional
	Role addRoleAuthority(long roleId, long... authIds) {
		
		def role = roleRepository.findOne(roleId)
		
		if (role) {
			def auths = authorityRepository.findAll(authIds as List)
			role.authorities = auths
		}
		role
	}
	
	@Transactional
	String findRoleAuthority(long roleId) {
		
		def role = roleRepository.findOne(roleId)
		
		(role.authorities*.id).join(',')
	}

}
