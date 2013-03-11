package com.wonders.security.entity

import javax.persistence.Entity
import javax.persistence.Table
import javax.persistence.Version
import javax.validation.constraints.NotNull

import org.springframework.data.jpa.domain.AbstractPersistable
@Entity
@Table(name = "sec_department")
class Department extends AbstractPersistable<Long> {

	@Version
	int version

	@NotNull
	String deptname

	String deptdesc
}
