package com.wonders.security.config;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;
//import org.springframework.web.servlet.support.AbstractDispatcherServletInitializer;

public class DispatcherServletInitializer /*extends AbstractDispatcherServletInitializer*/ {

//	@Override
	protected WebApplicationContext createRootApplicationContext() {

		XmlWebApplicationContext rootAppCtx = new XmlWebApplicationContext();
		rootAppCtx.setConfigLocation("classpath:applicationContext*.xml");

		return rootAppCtx;
	}

//	@Override
	protected WebApplicationContext createServletApplicationContext() {
		
		XmlWebApplicationContext servletAppCtx = new XmlWebApplicationContext();
		servletAppCtx.setConfigLocation("classpath:springmvc-servlet.xml");

		return servletAppCtx;
	}

//	@Override
	protected String[] getServletMappings() {
		return new String[] { "/*" };
	}

}
