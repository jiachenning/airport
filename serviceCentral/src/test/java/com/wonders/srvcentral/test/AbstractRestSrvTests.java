package com.wonders.srvcentral.test;

import java.io.IOException;
import java.util.List;

import javax.inject.Inject;

import org.junit.BeforeClass;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.ClientHttpRequest;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RequestCallback;
import org.springframework.web.client.ResponseExtractor;
import org.springframework.web.client.RestTemplate;

public abstract class AbstractRestSrvTests extends AbstractSpringTests {
	
	private static final String USERNAME = "admin";
	private static final String PASSWORD = "123456";
	
	protected static String jsessionid = null;
	
	@Inject
	protected RestTemplate restTemplate;
	
	@BeforeClass
	public static void setUpBeforeClass() {
		
		jsessionid = new RestTemplate().execute(
				"http://10.1.43.202:8080/security/j_spring_security_check",
				HttpMethod.POST, new RequestCallback() {

					@Override
					public void doWithRequest(ClientHttpRequest request)
							throws IOException {
						
						request.getBody().write(
								String.format("j_username=%s&j_password=%s",
										USERNAME, PASSWORD).getBytes());
					}

				}, new ResponseExtractor<String>() {

					@Override
					public String extractData(ClientHttpResponse response)
							throws IOException {

						List<String> cookies = response.getHeaders().get("Cookie");

						if (cookies == null) {
							cookies = response.getHeaders().get("Set-Cookie");
						}

						String cookie = cookies.get(cookies.size() - 1);

						int start = cookie.indexOf('=');
						int end = cookie.indexOf(';');

						return cookie.substring(start + 1, end);
					}
				});
	}

}
