package com.wonders.security.entity

import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.ManyToOne
import javax.persistence.OneToMany
import javax.persistence.Table
import javax.persistence.Transient
import javax.validation.constraints.NotNull

import org.hibernate.Hibernate

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import com.wonders.framework.entity.AbstractTreeNode

@Entity
@Table(name = "sec_group")
class Group extends AbstractTreeNode<Group, Long> {
	
	@NotNull
	String name
	
	boolean enabled
	
	boolean leaf
	
	@NotNull
	int ordernum
	
	long parentId
	
	String description
	
	String nodetype	
	
	String groupcode
	
	@Override
	@ManyToOne(fetch = FetchType.LAZY)
	Group getParent() {
		super.getParent()
	}
	
	@Override
	@OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)
	@JsonIgnore
	Set<Group> getChildren() {
		super.getChildren()
	}
	
	@Override
	@JsonProperty
	@Transient
	String getText() {
		this.name
	}
	
	void setText(String text) {
	}
	
	@Override
	@JsonProperty
	@Transient
	boolean isLeaf() {
		if (!Hibernate.isInitialized(getChildren())) {
			return false
		}
		super.isLeaf()
	}
	
	void setLeaf(boolean leaf) {
	}
	
	boolean getEnabled() {
		this.enabled
	}
	
	@Transient
	long getParentId() {
		this.parentId
	}
	
	void setParentId(long parentId) {
		this.parentId = parentId
	}
	
}
