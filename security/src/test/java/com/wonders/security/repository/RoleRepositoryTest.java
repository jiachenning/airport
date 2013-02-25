package com.wonders.security.repository;

import javax.inject.Inject;

import org.junit.Test;

import com.wonders.security.test.AbstractSpringTests;

public class RoleRepositoryTest extends AbstractSpringTests {
	
	@Inject
	private RoleRepository roleRepository;

	@Test
	public void testFindByAccountId() {
		roleRepository.findByAccountId(0);
	}

}
