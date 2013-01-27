package com.wonders.security.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.wonders.framework.entity.AbstractPersistable;
import javax.persistence.Temporal;
import static javax.persistence.TemporalType.DATE;
import javax.persistence.ManyToOne;
import static javax.persistence.FetchType.LAZY;
import javax.persistence.Enumerated;
import javax.persistence.Column;
import javax.persistence.ManyToMany;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.OrderBy;

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
	private String password;
	private int age;
	private Date birthday;
	private boolean enabled;
	private UserType userType;
	
	private Group group;
	
	private Set<Role> roles = new HashSet<>(0);

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public boolean getEnabled() {
		return this.enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Enumerated
	@Column(name = "user_type", nullable = false)
	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	@ManyToOne(fetch = LAZY, optional = false)
	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	@ManyToMany
	@JoinTable(name = "sec_user_role", 
		joinColumns = @JoinColumn(name = "user_id"), 
		inverseJoinColumns = @JoinColumn(name = "role_id")
	)
	@OrderBy
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

}
