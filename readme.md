Cuando cambia el mes se cierran los lotes y la meta de ahorro incluiodos el valor inical y lo que se ahorro, luego se inicia un nuevo lote de registros al cual se le carga 
nuevamente un valor inicial y meta de ahorro, es inportante que el listado anterior se guarda en una tabla aparte en la base de datos y se puede vizualizar una lista de todos 
los gastos de los meses en un apartado llamado gloval selec donde eleguis el mes y te muestra el listado de todos los gastos 
opcion 1 hacer un filtro en el front que mestre los datos dl mes actual primero y abajo la opcion global de los selct 
opcion 2 hacerlo desde java detectando la fecha de cada ingreso que cada vez que se consulte la base de daos y encuntre el nombre del mes o numero los agrupe en global y luego segun el mes actual haga los ingresos en ese registro podria ser una pantall
 agregar que pregunte po el id en login y regis  valan y listados si es 0 en listado valances y cuenta se mostarar una alerta que dira ud debe iniciar sesion o registrarase al hacer click desde el menu,
 en el caso de login o registro si el id es diferente de 0 a estas pantallas o se podra acceder o se oculataran directamente se puede mostras tambien una noticacion sesion avierta

solucionare ste eroor o hacer suma en valances totales grafico y agregar el grafico a goval
org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'controller' defined in file [C:\Users\compu\Documents\Proyectos subidos a git\Controla_tus_finazas\API_finanzas\target\classes\com\API_Finazas\app\rest\Controller\Controller.class]: Unsatisfied dependency expressed through constructor parameter 0; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'repository' defined in com.API_Finazas.app.rest.Repository.Repository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Invocation of init method failed; nested exception is org.springframework.data.repository.query.QueryCreationException: Could not create query for public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer); Reason: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!; nested exception is java.lang.IllegalArgumentException: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!
	at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:800) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.ConstructorResolver.autowireConstructor(ConstructorResolver.java:229) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.autowireConstructor(AbstractAutowireCapableBeanFactory.java:1372) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1222) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:582) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.preInstantiateSingletons(DefaultListableBeanFactory.java:955) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:921) ~[spring-context-5.3.29.jar:5.3.29]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:583) ~[spring-context-5.3.29.jar:5.3.29]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:147) ~[spring-boot-2.7.14.jar:2.7.14]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:731) ~[spring-boot-2.7.14.jar:2.7.14]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:408) ~[spring-boot-2.7.14.jar:2.7.14]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:307) ~[spring-boot-2.7.14.jar:2.7.14]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1303) ~[spring-boot-2.7.14.jar:2.7.14]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1292) ~[spring-boot-2.7.14.jar:2.7.14]
	at com.API_Finazas.app.rest.RestfulApiApplication.main(RestfulApiApplication.java:10) ~[classes/:na]
Caused by: org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'repository' defined in com.API_Finazas.app.rest.Repository.Repository defined in @EnableJpaRepositories declared on JpaRepositoriesRegistrar.EnableJpaRepositoriesConfiguration: Invocation of init method failed; nested exception is org.springframework.data.repository.query.QueryCreationException: Could not create query for public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer); Reason: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!; nested exception is java.lang.IllegalArgumentException: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1804) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:620) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:542) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:335) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:234) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:333) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:208) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.config.DependencyDescriptor.resolveCandidate(DependencyDescriptor.java:276) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1391) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1311) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.ConstructorResolver.resolveAutowiredArgument(ConstructorResolver.java:887) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:791) ~[spring-beans-5.3.29.jar:5.3.29]
	... 19 common frames omitted
Caused by: org.springframework.data.repository.query.QueryCreationException: Could not create query for public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer); Reason: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!; nested exception is java.lang.IllegalArgumentException: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!
	at org.springframework.data.repository.query.QueryCreationException.create(QueryCreationException.java:101) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.lookupQuery(QueryExecutorMethodInterceptor.java:107) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.lambda$mapMethodsToQuery$1(QueryExecutorMethodInterceptor.java:95) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at java.base/java.util.stream.ReferencePipeline$3$1.accept(ReferencePipeline.java:197) ~[na:na]
	at java.base/java.util.Iterator.forEachRemaining(Iterator.java:133) ~[na:na]
	at java.base/java.util.Collections$UnmodifiableCollection$1.forEachRemaining(Collections.java:1061) ~[na:na]
	at java.base/java.util.Spliterators$IteratorSpliterator.forEachRemaining(Spliterators.java:1845) ~[na:na]
	at java.base/java.util.stream.AbstractPipeline.copyInto(AbstractPipeline.java:509) ~[na:na]
	at java.base/java.util.stream.AbstractPipeline.wrapAndCopyInto(AbstractPipeline.java:499) ~[na:na]
	at java.base/java.util.stream.ReduceOps$ReduceOp.evaluateSequential(ReduceOps.java:921) ~[na:na]
	at java.base/java.util.stream.AbstractPipeline.evaluate(AbstractPipeline.java:234) ~[na:na]
	at java.base/java.util.stream.ReferencePipeline.collect(ReferencePipeline.java:682) ~[na:na]
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.mapMethodsToQuery(QueryExecutorMethodInterceptor.java:97) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.lambda$new$0(QueryExecutorMethodInterceptor.java:87) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at java.base/java.util.Optional.map(Optional.java:260) ~[na:na]
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.<init>(QueryExecutorMethodInterceptor.java:87) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.RepositoryFactorySupport.getRepository(RepositoryFactorySupport.java:365) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.RepositoryFactoryBeanSupport.lambda$afterPropertiesSet$5(RepositoryFactoryBeanSupport.java:323) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.util.Lazy.getNullable(Lazy.java:231) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.util.Lazy.get(Lazy.java:115) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.RepositoryFactoryBeanSupport.afterPropertiesSet(RepositoryFactoryBeanSupport.java:329) ~[spring-data-commons-2.7.14.jar:2.7.14]
	at org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean.afterPropertiesSet(JpaRepositoryFactoryBean.java:144) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1863) ~[spring-beans-5.3.29.jar:5.3.29]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1800) ~[spring-beans-5.3.29.jar:5.3.29]
	... 30 common frames omitted
Caused by: java.lang.IllegalArgumentException: Validation failed for query for method public abstract java.lang.Double com.API_Finazas.app.rest.Repository.Repository.sumarTotalValoresPorCategoriaAndUserId(java.lang.Integer)!
	at org.springframework.data.jpa.repository.query.SimpleJpaQuery.validateQuery(SimpleJpaQuery.java:96) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.data.jpa.repository.query.SimpleJpaQuery.<init>(SimpleJpaQuery.java:66) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.data.jpa.repository.query.JpaQueryFactory.fromMethodWithQueryString(JpaQueryFactory.java:51) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.data.jpa.repository.query.JpaQueryLookupStrategy$DeclaredQueryLookupStrategy.resolveQuery(JpaQueryLookupStrategy.java:169) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.data.jpa.repository.query.JpaQueryLookupStrategy$CreateIfNotFoundQueryLookupStrategy.resolveQuery(JpaQueryLookupStrategy.java:253) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.data.jpa.repository.query.JpaQueryLookupStrategy$AbstractQueryLookupStrategy.resolveQuery(JpaQueryLookupStrategy.java:93) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	at org.springframework.data.repository.core.support.QueryExecutorMethodInterceptor.lookupQuery(QueryExecutorMethodInterceptor.java:103) ~[spring-data-commons-2.7.14.jar:2.7.14]
	... 52 common frames omitted
Caused by: java.lang.IllegalArgumentException: org.hibernate.hql.internal.ast.QuerySyntaxException: unexpected token: ( near line 1, column 69 [SELECT COALESCE(SUM(subquery.suma_categoria), 0) as suma_total FROM (SELECT COALESCE(SUM(m.valor), 0) as suma_categoria       FROM com.API_Finazas.app.rest.Model.Model m       WHERE m.user_id = :userId       GROUP BY m.categoria) as subquery]
	at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:138) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:181) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.internal.ExceptionConverterImpl.convert(ExceptionConverterImpl.java:188) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.internal.AbstractSharedSessionContract.createQuery(AbstractSharedSessionContract.java:757) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.internal.AbstractSharedSessionContract.createQuery(AbstractSharedSessionContract.java:114) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method) ~[na:na]
	at java.base/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:77) ~[na:na]
	at java.base/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43) ~[na:na]
	at java.base/java.lang.reflect.Method.invoke(Method.java:568) ~[na:na]
	at org.springframework.orm.jpa.ExtendedEntityManagerCreator$ExtendedEntityManagerInvocationHandler.invoke(ExtendedEntityManagerCreator.java:362) ~[spring-orm-5.3.29.jar:5.3.29]
	at jdk.proxy2/jdk.proxy2.$Proxy100.createQuery(Unknown Source) ~[na:na]
	at org.springframework.data.jpa.repository.query.SimpleJpaQuery.validateQuery(SimpleJpaQuery.java:90) ~[spring-data-jpa-2.7.14.jar:2.7.14]
	... 58 common frames omitted
Caused by: org.hibernate.hql.internal.ast.QuerySyntaxException: unexpected token: ( near line 1, column 69 [SELECT COALESCE(SUM(subquery.suma_categoria), 0) as suma_total FROM (SELECT COALESCE(SUM(m.valor), 0) as suma_categoria       FROM com.API_Finazas.app.rest.Model.Model m       WHERE m.user_id = :userId       GROUP BY m.categoria) as subquery]
	at org.hibernate.hql.internal.ast.QuerySyntaxException.convert(QuerySyntaxException.java:74) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.hql.internal.ast.ErrorTracker.throwQueryException(ErrorTracker.java:93) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.hql.internal.ast.QueryTranslatorImpl.parse(QueryTranslatorImpl.java:301) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.hql.internal.ast.QueryTranslatorImpl.doCompile(QueryTranslatorImpl.java:189) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.hql.internal.ast.QueryTranslatorImpl.compile(QueryTranslatorImpl.java:144) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.engine.query.spi.HQLQueryPlan.<init>(HQLQueryPlan.java:112) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.engine.query.spi.HQLQueryPlan.<init>(HQLQueryPlan.java:73) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.engine.query.spi.QueryPlanCache.getHQLQueryPlan(QueryPlanCache.java:162) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.internal.AbstractSharedSessionContract.getQueryPlan(AbstractSharedSessionContract.java:636) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	at org.hibernate.internal.AbstractSharedSessionContract.createQuery(AbstractSharedSessionContract.java:748) ~[hibernate-core-5.6.15.Final.jar:5.6.15.Final]
	... 66 common frames omitted


Process finished with exit code 1
