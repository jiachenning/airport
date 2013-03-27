package com.wonders.srvcentral.config;

import org.springframework.web.context.AbstractContextLoaderInitializer;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.XmlWebApplicationContext;

public class ContextLoaderInitializer extends AbstractContextLoaderInitializer {
	
	private static final String ROOT_APP_CONTEXT_CONFIG_LOCATION = "classpath:applicationContext.xml";

	@Override
	protected WebApplicationContext createRootApplicationContext() {
		
		XmlWebApplicationContext rootAppContext = new XmlWebApplicationContext();
		rootAppContext.setConfigLocation(ROOT_APP_CONTEXT_CONFIG_LOCATION);
		
		return rootAppContext;
	}

}
