package com.wonders.srvcentral.entity

import com.fasterxml.jackson.annotation.JsonIgnore;

class User {
	
	long id

	int version

	String username

	String loginName

	String password

	boolean enabled

	String telephone

	String address

	Date birthday

	Gender gender

	UserType userType
	
	Set accounts
	
	@JsonIgnore
	boolean isNew() {
		
	}

	enum Gender {
		MALE, FEMALE
	}

	enum UserType {
		NORMAL, ADVINCED, ADMINISTRATOR
	}
}
