package com.wonders.srvcentral.test;

import org.junit.Test;

import com.wonders.srvcentral.entity.User;

public class UserRestSrvTest extends AbstractRestSrvTests {
	
	private static final String SERVICE_URL = "http://10.1.43.202:8080/security/";
	
	private static final String GET_USER_URL = SERVICE_URL + "users/{id};jsessionid=" + jsessionid;
	private static final String GET_ALL_USER_URL = SERVICE_URL + "users;jsessionid=" + jsessionid;

	@Test
	public final void testUserRestSrvForGet() {
		final long id = 3;
		String result = restTemplate.getForObject(GET_USER_URL, String.class, id);
		System.out.println(" *********************  " + result + "*******************");
	}
	
	@Test
	public final void testUserRestSrvForGet2() {
		
		final long id = 3;
		User user = restTemplate.getForObject(GET_USER_URL, User.class, id);
		
		System.out.println(user.getId());
		System.out.println(user.getUsername());
		System.out.println(user.getAddress());
		System.out.println(user.getAccounts());
	}
	
	@Test
	public final void testUserRestSrvForALLGet() {
		String result = restTemplate.getForObject(GET_ALL_USER_URL, String.class);
		System.out.println(result);
	}

}
