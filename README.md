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

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

