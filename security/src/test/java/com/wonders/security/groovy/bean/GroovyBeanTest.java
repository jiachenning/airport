package com.wonders.security.groovy.bean;

import javax.inject.Inject;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@ContextConfiguration
@RunWith(SpringJUnit4ClassRunner.class)
public class GroovyBeanTest {
	
	@Inject
	private GroovyBean groovyBean;

	@Test
	public void testHelloMethod() {
		
		Assert.assertNotNull(groovyBean);
		
		String hello = groovyBean.hello();
		Assert.assertEquals("Hello wangqiang", hello);
	}

}
