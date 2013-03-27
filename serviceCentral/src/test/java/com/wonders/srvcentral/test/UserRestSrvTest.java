package com.wonders.srvcentral.test;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.web.client.RestTemplate;

public class UserRestSrvTest extends AbstractSpringTests {
	
	@Inject
	private RestTemplate restTemplate;

	@Test
	public final void testUserRestSrv() {
		String result = restTemplate.getForObject("http://10.1.43.202:8080/security/users/1", String.class);
		System.out.println(result);
	}

}
