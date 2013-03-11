package com.wonders.security.service

import javax.inject.Named
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.authentication.AuthenticationFailureHandler

@Named
class AuthFailureHandler implements AuthenticationFailureHandler {

	@Override
	public void onAuthenticationFailure(HttpServletRequest request,
			HttpServletResponse response, AuthenticationException exception) {

		response.setContentType("text/json; charset=UTF-8")
		response.writer.print("{success: false}")
	}
}
