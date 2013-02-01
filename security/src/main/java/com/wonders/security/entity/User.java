package com.wonders.security.entity;

import static javax.persistence.TemporalType.DATE;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.validation.constraints.NotNull;

import com.wonders.framework.entity.AbstractPersistable;

/**
 * Entity implementation class for Entity: User
 * 
 */
@Entity
@Table(name = "sec_user")
public class User extends AbstractPersistable<Long> {
	
	enum UserType {
		NORMAL, ADVINCED, ADMINISTRATOR
	}

	private static final long serialVersionUID = -8971754494504801891L;
	
	private String username;
	private int age;
	private Date birthday;
	private UserType userType;
	
	@NotNull
	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getAge() {
		return this.age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Temporal(DATE)
	public Date getBirthday() {
		return this.birthday;
	}

	public void setBirthday(Date birthday) {
		this.birthday = birthday;
	}

	@Enumerated
	@Column(name = "user_type", nullable = false)
	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

}
