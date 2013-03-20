package com.wonders.security.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Set;

import javax.inject.Inject;

import org.junit.Test;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.wonders.security.entity.Account;
import com.wonders.security.entity.Authority;
import com.wonders.security.entity.Role;
import com.wonders.security.test.AbstractSpringTests;

@DatabaseSetup("ServiceTest-DatabaseSetup.xml")
public class AccountServiceTest extends AbstractSpringTests {

	@Inject
	private AccountService accountService;

	@Test
	public void testAddRolesToAccount() {

		Account account = accountService.addRolesToAccount(1, 1, 3, 4);

		assertNotNull(account);
		assertEquals(1, (long) account.getId());

		Set<Role> roles = account.getRoles();
		assertEquals(3, roles.size());
	}
	
	@Test
	public void testRemoveRolesFromAccount() {
		
		Account account = accountService.removeRolesFromAccount(1, 1, 2, 3, 4);
		assertNotNull(account);
		assertEquals(1, (long) account.getId());
		
		Set<Role> roles = account.getRoles();
		assertEquals(0, roles.size());
	}
	
	@Test
	public void testAddAccountAuthority() {
		
		Account account = accountService.addAccountAuthority(1, 1, 2, 4);
		assertNotNull(account);
		assertEquals(1, (long) account.getId());
		
		Set<Authority> authorities = account.getAuthorities();
		assertEquals(2, authorities.size());
	}
	
}
