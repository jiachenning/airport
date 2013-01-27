package com.wonders.framework.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate4.Hibernate4Module;

public class HibernateAwareObjectMapper extends ObjectMapper {

	private static final long serialVersionUID = -8651298276838621298L;

	public HibernateAwareObjectMapper() {
		this.registerModule(new Hibernate4Module());
	}
	
}
