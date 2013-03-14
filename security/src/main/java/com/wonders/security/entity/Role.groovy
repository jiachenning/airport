package com.wonders.security.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.JoinColumn
import javax.persistence.JoinTable
import javax.persistence.ManyToMany
import javax.persistence.OrderBy
import javax.persistence.Table
import javax.persistence.Version
import javax.validation.constraints.NotNull

import org.springframework.data.jpa.domain.AbstractPersistable

@Entity
@Table(name = "sec_role")
class Role extends AbstractPersistable<Long> {
	
	@Version
	int version

	@NotNull
	String name
	
	@Column(unique = true)
	String code
	
	String description

	boolean enabled

	@ManyToMany
	@JoinTable(name = "sec_role_auth",
		joinColumns = @JoinColumn(name = "role_id"),
		inverseJoinColumns = @JoinColumn(name = "auth_id")
	)
	@OrderBy
	Set<Authority> authorities = []
	
	boolean getEnabled() {
		this.enabled
	}
	
}
