package com.wonders.security.config;

import java.util.Properties;

import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.ImportResource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaDialect;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaDialect;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.wonders.framework.repository.MyRepositoryFactoryBean;

@Configuration
@ComponentScan(
	basePackages = "com.wonders.security",
	excludeFilters = {
		@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class),
		@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Configuration.class)
	}
)
@EnableJpaRepositories(
	basePackages = "com.wonders.security.**.repository", 
	repositoryFactoryBeanClass = MyRepositoryFactoryBean.class
)
@EnableTransactionManagement
@ImportResource("classpath:databaseConfig.xml")
public class AppConfig {
	
	@Inject
	private DataSource dataSource;
	
	@Bean
	public EntityManagerFactory entityManagerFactory() {
		
		LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();
		factoryBean.setDataSource(dataSource);
		factoryBean.setPackagesToScan("com.wonders.security.**.entity");
		
		HibernateJpaVendorAdapter jpaVendorAdapter = new HibernateJpaVendorAdapter();
		jpaVendorAdapter.setShowSql(true);
		jpaVendorAdapter.setGenerateDdl(true);
		factoryBean.setJpaVendorAdapter(jpaVendorAdapter);
		
		Properties jpaProperties = new Properties();
		jpaProperties.put("hibernate.format_sql", true);
		factoryBean.setJpaProperties(jpaProperties);
		
		factoryBean.afterPropertiesSet();
		return factoryBean.getObject();
	}
	
	@Bean
	public JpaDialect jpaDialect() {
		return new HibernateJpaDialect();
	}
	
	@Bean
	public PlatformTransactionManager transactionManager() {
		return new JpaTransactionManager(entityManagerFactory());
	}
	
}
