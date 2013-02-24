package com.wonders.security.entity;

import org.junit.Assert;
import org.junit.Test;

import com.wonders.security.test.AbstractJpaDbunitTests;

public class AuthorityTest extends AbstractJpaDbunitTests {

	@Test
	public void testCount() {
		
		long count = (Long) entityManager.createQuery("select count(auth) from Authority auth")
				.getSingleResult();

		Assert.assertEquals(0, count);
	}

}
