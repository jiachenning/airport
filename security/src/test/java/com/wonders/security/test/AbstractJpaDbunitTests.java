package com.wonders.security.test;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import org.junit.After;
import org.junit.Before;

public abstract class AbstractJpaDbunitTests extends AbstractSpringTests {
	
	@Inject
	private EntityManagerFactory entityManagerFactory;
	
	protected EntityManager entityManager;
	
	@Before
	public void setUp() {
		entityManager = entityManagerFactory.createEntityManager();
	}
	
	@After
	public void tearDown() {
		entityManager.close();
	}
	
	protected void beginTransaction() {
		entityManager.getTransaction().begin();
	}
	
	protected void commitTransaction() {
		entityManager.getTransaction().commit();
	}

}
