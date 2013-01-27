package com.wonders.security.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.wonders.framework.entity.AbstractPersistable;

/**
 * Entity implementation class for Entity: Role
 * 
 */
@Entity
@Table(name = "sec_role")
public class Role extends AbstractPersistable<Long> {

	private static final long serialVersionUID = -5366450967355146944L;

	private String name;
	private boolean enabled;
	
	private Set<Authority> authorities = new HashSet<>();

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean getEnabled() {
		return this.enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@ManyToMany
	@JoinTable(name = "sec_role_auth", 
		joinColumns = @JoinColumn(name = "role_id"), 
		inverseJoinColumns = @JoinColumn(name = "auth_id")
	)
	@OrderBy
	public Set<Authority> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Set<Authority> authorities) {
		this.authorities = authorities;
	}

}
