package com.wonders.security.entity

import static javax.persistence.TemporalType.DATE

import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Enumerated
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.persistence.Temporal
import javax.persistence.Version
import javax.validation.constraints.NotNull

import org.springframework.data.jpa.domain.AbstractPersistable

@Entity
@Table(name = "sec_user")
class User extends AbstractPersistable<Long> {

	@Version
	int version

	@NotNull
	String username
	
	@NotNull
	@Column(name = "login_name", unique = true)
	String loginName
	
	@NotNull
	String password
	
	boolean enabled

	String telephone
	
	String address
	
	// adder:zhuhaijian, 20130812
	String imoId;
	
	@Temporal(DATE)
	Date birthday

	@Enumerated
	@Column(nullable = false)
	Gender gender
	
	@Enumerated
	@Column(name = "user_type", nullable = false)
	UserType userType
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	Set<Account> accounts = []
	
	boolean getEnabled() {
		this.enabled
	}
	
	enum Gender {
		MALE, FEMALE
	}
	
	enum UserType {
		NORMAL, ADVINCED, ADMINISTRATOR
	}
	
}
