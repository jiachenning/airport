机场框架代码
=================

*HOW TO RUN*

*BUILD*

	cd {airport}
	mvn clean install -Dmaven.test.skip
	mvn resources:resources

*RUN*

	cd {security}
	mvn jetty:run

*PACKAGE*
	
	mvn clean package -Dmaven.test.skip

The security.war will be under target directory.
