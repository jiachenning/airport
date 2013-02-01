package com.wonders.security.entity;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;

import org.hibernate.Hibernate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.wonders.framework.entity.AbstractTreeNode;

/**
 * Entity implementation class for Entity: Group
 * 
 */
@Entity
@Table(name = "sec_group")
public class Group extends AbstractTreeNode<Group, Long> {

	private static final long serialVersionUID = 7899448071331684193L;
	
	private String name;
	private boolean enabled;
	
	@NotNull
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
	
	@Override
	@ManyToOne(fetch = FetchType.LAZY)
	public Group getParent() {
		return super.getParent();
	}
	
	@Override
	@OneToMany(mappedBy = "parent")
	@JsonIgnore
	public Set<Group> getChildren() {
		return super.getChildren();
	}
	
	@Override
	@JsonProperty
	@Transient
	public String getText() {
		return this.name;
	}
	
	@Override
	@JsonProperty
	@Transient
	public boolean isLeaf() {
		if (!Hibernate.isInitialized(getChildren())) {
			return false;
		}
		return super.isLeaf();
	}
	
}
