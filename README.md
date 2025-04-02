<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup
Para poder iniciar el proyecto es necesario tener instalado [Docker Compose](https://docs.docker.com/compose/) 
Ademas es necesario crear un archivo `.env` con la siguiente estructura 

```
POSTGRES_HOST=<nombreDelHost>
POSTGRES_PORT=5432
POSTGRES_USER=<userName>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<dbName>
```

y una carpeta llamada `pgdata` en la raiz del proyecto. donde se va a guardar de manera local nuestra data.

con eso instalado podemos proceder a iniciar el proyecto . 

```bash
$ docker compose up 
```

Esto levantara la instancia de la base de datos 
Ahora con respecto al proyecto. Se recomienda usar [Node 20.11](https://nodejs.org/es/blog/release/v20.11.0) ademas de usar [nvm](https://github.com/nvm-sh/nvm) para el manejo de los paquetes de node. 
Con eso instalado podemos iniciar el proyecto

```bash
$ npm install
$ npm run start:dev
```

Con el proyecto iniciado ejecutaremos lo siguiente 

```bash
$ npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/database/dataSource.ts
```
Esto ejecutara las migraciones en la base de datos para crear las tablas necesarias en la base de datos para poder trabajar 

```bash
$ npx ts-node src/database/seeds/initialSeed.ts
```
Esto llenara la base con cierta data necesaria para poder tener algunos clientes y saldos necesarios. 

```bash
$ npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate src/database/migrations/<nombreDeLaMigracion> -d src/database/dataSource.ts
```
Y por ultimo con esto nos permitira crear nuevas migraciones en caso de necesitar modificar los modelos o crear nuevas tablas. 

# 📌 Decisiones de Diseño del Proyecto

## 🔍 Suposiciones  

- Basándonos en la entrevista técnica, se decidió que una empresa puede tener múltiples cuentas dentro de la aplicación. Esto permite que una empresa esté asociada a más de una billetera o cuenta virtual.  
- Aunque las contraseñas en la base de datos deberían estar encriptadas, para fines de la prueba técnica se dejaron a nivel de mock, ya que no era un aspecto relevante en este contexto.  
- La API debería contar con un mecanismo de seguridad, como **JWT** o **OAuth2**, para evitar que esté abierta a cualquier usuario.  
- Se asume que esta aplicación servirá como backend para una aplicación móvil o web. Dado el negocio de **Eluter**, el backend debe proporcionar datos a estos clientes, por lo que se optó por **NestJS**, un framework enfocado en el desarrollo de Web APIs.  

## 🏗️ Decisiones Arquitectónicas  

- **📂 Estructura del proyecto:**  
  Se adoptó una arquitectura basada en **Controllers, Services, Models y Repositories**. Esta estructura permite organizar el código de manera clara, encapsulando responsabilidades y facilitando el mantenimiento. Además, es una de las prácticas recomendadas en NestJS y simplifica el proceso de testeo, ya que facilita la creación de **mocks** para los repositorios y la simulación de datos en la base.  

- **🛠️ Uso de un ORM (TypeORM):**  
  Se eligió un ORM para el manejo de la base de datos, lo que permitió mapear correctamente los datos en el servidor, evitando inconsistencias. Además, facilitó la gestión de **migraciones y scripts**, encapsulando la lógica de acceso a datos y permitiendo que el sistema se pueda desplegar en diferentes entornos sin cambios significativos.  

- **🗄️ Base de datos relacional:**  
  Se optó por una base de datos relacional debido a la experiencia previa en su uso y porque era la mejor opción para garantizar la consistencia de los datos. La estructura de datos del proyecto no es lo suficientemente compleja como para requerir una base de datos NoSQL.  

- **🐳 Uso de Docker:**  
  La base de datos se ejecuta dentro de un contenedor **Docker**. Esto facilita la instalación, encapsula la configuración del motor de base de datos y permite compartir y ejecutar la base en distintos entornos sin requerir instalaciones adicionales en cada máquina.  

- **🗑️ Soft Delete:**  
  Se implementó **Soft Delete** en todas las entidades del sistema para mantener un historial de cambios sin eliminar registros físicamente. Esto permite rastrear la evolución de los estados dentro del sistema.  
  Como siguiente paso, se podría agregar un **historial detallado de cambios** en los usuarios y cuentas, pero para la prueba técnica, esta solución fue suficiente.  

## 🔄 Estrategias para Manejo de Concurrencia  

- Se utilizaron los mecanismos de bloqueo proporcionados por **TypeORM** a través de **`pessimistic_write` y `pessimistic_read`** dentro del `EntityManager`. Esto garantizó que los recursos se bloquearan hasta la finalización de la transacción, evitando problemas de concurrencia.  
- Una alternativa sería gestionar la concurrencia directamente a nivel de base de datos mediante queries personalizadas con `COMMIT` y `ROLLBACK`. Sin embargo, el uso de TypeORM permitió automatizar este proceso y reducir la complejidad del código.  
- Un posible inconveniente de esta estrategia es el riesgo de **bloqueos excesivos de recursos**, lo que puede afectar el rendimiento en queries más complejas o con múltiples tablas.  

## ⚠️ Mecanismos de Gestión de Fallos en Sistemas Externos  

- Se manejaron transacciones dentro del `EntityManager` de **TypeORM**. En caso de fallo en un sistema externo, el error se capturaba dentro de la transacción, lo que permitía realizar automáticamente un **rollback** y desbloquear los recursos afectados.  

## 🚧 Pendientes  

- **🧪 Testeo:** Me hubiera gustado implementar pruebas para validar el correcto funcionamiento de las funciones y asegurar la calidad del código, pero por falta de tiempo no pude hacerlo.  



