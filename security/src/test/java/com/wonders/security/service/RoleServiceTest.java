package com.wonders.security.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Set;

import javax.inject.Inject;

import org.junit.Test;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.wonders.security.entity.Authority;
import com.wonders.security.entity.Role;
import com.wonders.security.test.AbstractSpringTests;

@DatabaseSetup("ServiceTest-DatabaseSetup.xml")
public class RoleServiceTest extends AbstractSpringTests {
	
	@Inject
	private RoleService roleService;

	@Test
	public final void testAddRoleAuthority() {
		
		Role role = roleService.addRoleAuthority(2, 1, 3);
		assertNotNull(role);
		assertEquals(2, (long) role.getId());
		
		Set<Authority> authorities = role.getAuthorities();
		assertEquals(2, authorities.size());
	}

}
