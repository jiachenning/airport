package com.wonders.security.service

import javax.inject.Named
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler

@Named
class AuthSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	void onAuthenticationSuccess(HttpServletRequest request,
			HttpServletResponse response, Authentication authentication) {
			
		response.setContentType("text/json; charset=UTF-8")
		response.writer.print("{success: true}")
	}
}
