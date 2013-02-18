package com.wonders.security.entity;

import static javax.persistence.TemporalType.DATE

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Enumerated
import javax.persistence.Table
import javax.persistence.Temporal
import javax.persistence.Version
import javax.validation.constraints.NotNull

import org.springframework.data.jpa.domain.AbstractPersistable

@Entity
@Table(name = "sec_user")
public class User extends AbstractPersistable<Long> {

	@Version
	int version

	@NotNull
	String username

	int age

	@Temporal(DATE)
	Date birthday

	@Enumerated
	@Column(name = "user_type", nullable = false)
	UserType userType
	
	enum UserType {
		NORMAL, ADVINCED, ADMINISTRATOR
	}
}
