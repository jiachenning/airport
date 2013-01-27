package com.wonders.security.entity;

import org.junit.Assert;
import org.junit.Test;

import com.wonders.security.test.AbstractJpaDbunitTests;

public class UserTest extends AbstractJpaDbunitTests {
	
	@Test
	public void testCount() {
		
		long count = (Long) entityManager.createQuery("select count(u) from User u")
			.getSingleResult();
		
		Assert.assertEquals(0, count);
	}

}
