package com.wonders.security.entity;

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.persistence.Transient
import javax.persistence.Version
import javax.validation.constraints.NotNull

import org.hibernate.Hibernate

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import com.wonders.framework.entity.AbstractTreeNode

@Entity
@Table(name = "data_dictionary")
class Dictionary extends AbstractTreeNode<Dictionary, Long> {
	
	@NotNull
	String name
	
	boolean enabled
	
	@Column(unique = false)
	String code
	
	String description
	
	@Override
	@ManyToOne(fetch = FetchType.LAZY)
	Dictionary getParent() {
		super.getParent()
	}
	
	@Override
	@OneToMany(mappedBy = "parent")
	@JsonIgnore
	Set<Dictionary> getChildren() {
		super.getChildren()
	}
	
	@Override
	@JsonProperty
	@Transient
	String getText() {
		this.name
	}
	
	void setText(String text){}
	
	@Override
	@JsonProperty
	@Transient
	boolean isLeaf() {
		if (!Hibernate.isInitialized(getChildren())) {
			return false
		}
		super.isLeaf()
	}
	
	void setLeaf(boolean leaf){}
	
	boolean getEnabled() {
		this.enabled
	}
	
}
