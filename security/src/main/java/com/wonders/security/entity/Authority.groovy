package com.wonders.security.entity;

import javax.persistence.Entity
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.persistence.Transient
import javax.validation.constraints.NotNull

import org.hibernate.Hibernate

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import com.wonders.framework.entity.AbstractTreeNode

@Entity
@Table(name = "sec_authority")
public class Authority extends AbstractTreeNode<Authority, Long> {
	
	@NotNull
	String name
	
	boolean enabled
	
	boolean getEnabled() {
		this.enabled
	}
	
	Authority getParent() {
		super.getParent()
	}
	
	@Override
	@OneToMany(mappedBy = "parent")
	@JsonIgnore
	Set<Authority> getChildren() {
		super.getChildren()
	}

	@Override
	@JsonProperty
	@Transient
	String getText() {
		this.name
	}
	
	@Override
	@JsonProperty
	@Transient
	boolean isLeaf() {
		if (!Hibernate.isInitialized(getChildren())) {
			false
		}
		super.isLeaf()
	}

}
