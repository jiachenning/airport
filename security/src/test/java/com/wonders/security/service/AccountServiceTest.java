package com.wonders.security.service;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.Iterator;
import java.util.Set;

import javax.inject.Inject;

import org.junit.Test;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.wonders.security.entity.Account;
import com.wonders.security.entity.Role;
import com.wonders.security.test.AbstractSpringTests;

@DatabaseSetup("AccountServiceTest-DatabaseSetup.xml")
public class AccountServiceTest extends AbstractSpringTests {

	@Inject
	private AccountService accountService;

	@Test
	public void testAddRolesToAccount() {

		Account account = accountService.addRolesToAccount(1, 2, 3, 4);

		assertNotNull(account);
		assertEquals(1, (long) account.getId());

		Set<Role> roles = account.getRoles();
		assertEquals(2, roles.size());
		
		Iterator<Role> iterator = roles.iterator();
		assertEquals(2, (long) iterator.next().getId());
		assertEquals(3, (long) iterator.next().getId());
	}

}
