package com.wonders.security.repository;

import static org.junit.Assert.assertEquals;

import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.wonders.security.entity.Role;
import com.wonders.security.test.AbstractSpringTests;

@DatabaseSetup("RepositoryTest-DatabaseSetup.xml")
public class RoleRepositoryTest extends AbstractSpringTests {
	
	@Inject
	private RoleRepository roleRepository;
	
	@Test
	public void testCount() {
		
		long count = roleRepository.count();
		assertEquals(3, count);
	}

	@Test
	public void testFindByAccountId() {
		
		List<Role> roles = roleRepository.findByAccountId(1);
		Iterator<Role> iter = roles.iterator();
		
		assertEquals(2, roles.size());
		assertEquals(1, (long) iter.next().getId());
		assertEquals(3, (long) iter.next().getId());
	}

}
