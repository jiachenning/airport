package com.wonders.security.repository;

import static org.junit.Assert.assertEquals;

import java.util.List;

import javax.inject.Inject;

import org.junit.Test;

import com.github.springtestdbunit.annotation.DatabaseSetup;
import com.wonders.security.entity.Account;
import com.wonders.security.test.AbstractSpringTests;

@DatabaseSetup("RepositoryTest-DatabaseSetup.xml")
public class AccountRepositoryTest extends AbstractSpringTests {
	
	@Inject
	private AccountRepository accountRepository;

	@Test
	public void testFindByUserId() {
		
		List<Account> accounts = accountRepository.findByUserId(1);
		
		assertEquals(2, accounts.size());
	}

}
