package com.wonders.security.config;

import java.util.List;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import com.wonders.framework.utils.HibernateAwareObjectMapper;
import com.wonders.framework.utils.PageableArgumentResolver;

@Configuration
@ComponentScan(
	basePackages = "com.wonders.security.**.controller",
	useDefaultFilters = false, 
	includeFilters = { 
		@ComponentScan.Filter(Controller.class)
	}
)
@EnableWebMvc
public class WebMvcConfig extends WebMvcConfigurerAdapter {

	@Override
	public void addArgumentResolvers(
			List<HandlerMethodArgumentResolver> argumentResolvers) {
		
		argumentResolvers.add(new PageableArgumentResolver());
	}

	@Override
	public void configureMessageConverters(
			List<HttpMessageConverter<?>> converters) {
		
		MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter();
		converter.setObjectMapper(new HibernateAwareObjectMapper());
		
		converters.add(converter);
	}

	@Override
	public void configureDefaultServletHandling(
			DefaultServletHandlerConfigurer configurer) {
		
		configurer.enable();
	}
	
}
