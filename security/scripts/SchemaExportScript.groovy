import com.wonders.security.entity.*
import org.hibernate.cfg.Configuration
import org.hibernate.tool.hbm2ddl.SchemaExport as SE

/***
 * 
 * @author blues 
 * 2013-3-12
 * 
 * 根据数据库方言（dialect）生成不同的数据库 Schema 脚本
 */

MYSQL_DIALECT  = 'org.hibernate.dialect.MySQL5InnoDBDialect'
ORACLE_DIALECT = 'org.hibernate.dialect.Oracle10gDialect'

def props = new Properties()
props.put("hibernate.dialect", ORACLE_DIALECT)

def configuration = new Configuration()
		.addProperties(props)
		.addAnnotatedClass(Group.class)
		.addAnnotatedClass(Account.class)
		.addAnnotatedClass(Role.class)
		.addAnnotatedClass(Authority.class)
		.addAnnotatedClass(User.class)
		.addAnnotatedClass(Department.class)

new SE(configuration)
		.setDelimiter(";")
		.setFormat(true)
		.setOutputFile("scripts/schema/schema-oracle.sql")
		.create(true, false)
