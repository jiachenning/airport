package com.wonders.security.entity;

import org.junit.Assert;
import org.junit.Test;

import com.wonders.security.test.AbstractJpaDbunitTests;

public class RoleTest extends AbstractJpaDbunitTests {

	@Test
	public void testCount() {

		long count = (Long) entityManager.createQuery("select count(r) from Role r")
				.getSingleResult();

		Assert.assertEquals(0, count);

	}

}
