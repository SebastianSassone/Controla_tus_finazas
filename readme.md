<h2><strong>Controla tus finanzas</strong></h2>
Se trata de una aplicación web destinada al control nuestros gastos personales para lograr 
una mejor administración de nuestro dinero, cumplir las metas de ahorro que nos proponemos para cada mes
y cada año y llevar un mejor control de nuestro consumo.
Para poder utilizar la aplicación web una vez registrados dentro de la misma , nos dirigimos a la pestaña
de cuenta donde se mostraran nuestros datos personales, y abajo de ellos encontraremos un formulario en 
el cual debemos ingresar el monto inicial que sería el que disponemos para cada mes y la meta de ahorro propuesta,
una vez ingresados se muestran siempre en la pestaña de cuenta y no cambiaran a lo largo del año en cuanto lo 
decidamos asi nosotros, usado el monto inicial y la meta de ahorro, mas la suma total de los gastos automáticamente
se calcularan los gastos y se indicara si la meta se está cumpliendo o no, por defecto la meta de ahorro estará 
cumplida, asi mismo estos valores mostrados servirán para hacer el cierre mensual automaticamente.
Para comenzar a registrar nuestros gastos debemos realizar un ingreso del gasto realizado, para esto nos dirigimos
a la pestaña de "Nuevo Ingreso" donde nos aparece aun formulario en el debemos ingresar el nombre del producto, 
seleccionar la categoría a la que corresponde(las cuales están predefinidas), luego ingresar la subcategoría 
si asi lo deseamos, finalmente ingresamos el valor del producto grabamos el nuevo ingreso,  la fecha y la hora local se
registraran automáticamente. 
Para llevar un control de los balances obtenidos nos dirigimos a la pestaña de balances, donde podemos observar el 
total de gastos de todo el mes en un gráfico y en listado donde podemos editar y eliminar los diferentes ingresos 
registrados, cuando el mes haya finalizado la aplicación detectara automáticamente este cambio y ya no se podrán 
realizar ingresos, cuando esto sucede necesario hacer un cierre del mes volviendo a la sección cuenta podemos 
encontrar que ahora aparece formulario con todos los datos antes necesarios para hacer el cierre del mes en este
mostraran el monto inicial, la meta de ahorro, el total de gastos realizados y si la meta fue cumplida o no, 
con estos datos presionamos en confirmar cierre, luego podemos comenzar a registrar gastos del nuevo mes en 
la pestaña ingresos, el monto y la meta seguirá igual como fue antes mencionado. 
Para acceder a los registros de los gastos acumulados de cada mes deberemos dirigirnos a la pestaña de balances sección global, 
donde podremos seleccionar uno de los 12 meses del año y allí se mostraran los registros acumulados de cada mes e un listado y 
gráfico además se mostrara el cierre, monto inicial meta de ahorro y si esta cumplió o si no lo hizo.


Instrucciones para desplegar "Controla tus finanzas":

    1. Clonar el Repositorio:
    
    Clona el repositorio que contiene la API y el frontend en tus directorios locales utilizando Git.
    
    2. Configurar la Base de Datos Local:
    
    Utiliza sentencias SQL para crear las 4 tablas necesarias con la siguiente estructura:

    usertable ( id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(40), 
    lastname VARCHAR(40), 
    email VARCHAR(40), 
    password VARCHAR(40), 
    confirmPassword VARCHAR(40)); 
    
    ingresotabla ( id INT PRIMARY KEY AUTO_INCREMENT, 
    producto VARCHAR(40), 
    categoria VARCHAR(40), 
    subcategoria VARCHAR(30), 
    valor INTEGER, 
    fecha VARCHAR(8),
    hora VARCHAR(20),
    user_id INTEGER);

    montoinicialtable ( id INT PRIMARY KEY AUTO_INCREMENT, 
    monto_inicial INTEGER, 
    meta_ahorro INTEGER, 
    user_id INTEGER);

    montoalmacenadotable ( id INT PRIMARY KEY AUTO_INCREMENT, 
    monto INTEGER, 
    meta INTEGER, 
    gastos INTEGER, 
    ahorro INTEGER, 
    fecha VARCHAR(40), 
    meta_cumplida VARCHAR(40), 
    user_id INTEGER );

    3. Dirigirse a la API:
    
    Abrir el proyecto de la API en tu IDE (por ejemplo, IntelliJ IDEA o Eclipse).
    Configura la conexión a la base de datos en el archivo application.properties de la API, estableciendo los parámetros de conexión a tu base de datos local.
    Compilar y Ejecutar la API:
    
    Utiliza Maven o Gradle para compilar el proyecto desde tu IDE.
    Ejecuta mvn clean package o ./gradlew build en la terminal dentro del directorio de la API.
    Luego, ejecuta el archivo JAR generado con java -jar nombre_proyecto.jar desde la terminal o desde el entorno de ejecución del IDE para iniciar la API.
    Dirigirse al Frontend en JavaScript:
    
    4. Abrir el proyecto del frontend en tu editor de código preferido.
    Activa un servidor local para el frontend desde tu editor o utilizando herramientas como Live Server en Visual Studio Code.
    Finalizar y Verificar:
    
    Abre tu navegador web.
    Ingresa la dirección del servidor local donde se encuentra desplegado el frontend.
    ¡La aplicación "Controla tus finanzas" estara funcionando correctamente!

La aplicacion web consta un frontend en JavaScript Vanilla respaldado por un backend desarrollado en Java Spring Boot que
se conecta a una base de datos remota MySQL remota.
