package com.wonders.security.entity;

import static javax.persistence.TemporalType.DATE

import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.ManyToOne
import javax.persistence.Table
import javax.persistence.Transient;
import javax.persistence.Version
import javax.validation.constraints.NotNull

import org.springframework.data.jpa.domain.AbstractPersistable

@Entity
@Table(name = "data_dictionary_manage")
class DictionaryManage extends AbstractPersistable<Long> {

	@Version
	int version

	@NotNull
	String name

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	Dictionary dictionary
	
	String description
	
}
