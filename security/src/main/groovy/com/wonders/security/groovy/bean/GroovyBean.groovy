package com.wonders.security.groovy.bean

import javax.annotation.PostConstruct

class GroovyBean {

	String username
	String password
	int age
	Date birthday
	boolean enabled

	@PostConstruct
	void validatePropertyValues() {

		println 'validatePropertyValues method invoked!'

		assert username == 'wangqiang'
		assert password == '123456'
		assert age == 30
		assert enabled == true
		assert enabled == getEnabled()
	}

	String hello() {
		"Hello $username"
	}
}
