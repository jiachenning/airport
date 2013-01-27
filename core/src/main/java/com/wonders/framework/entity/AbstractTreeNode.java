package com.wonders.framework.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

public abstract class AbstractTreeNode<T, ID extends Serializable> extends
		AbstractPersistable<ID> {

	private static final long serialVersionUID = -4533011194651480162L;

	private T parent;
	
	private Set<T> children = new HashSet<>(0);
	
	public abstract String getText();
	
	public T getParent() {
		return parent;
	}

	public void setParent(T parent) {
		this.parent = parent;
	}

	public Set<T> getChildren() {
		return children;
	}

	public void setChildren(Set<T> children) {
		this.children = children;
	}
	
	public boolean isLeaf() {
		return children == null || children.isEmpty();
	}

}