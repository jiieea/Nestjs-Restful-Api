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

## NestJS RESTful API
A modern, scalable RESTful API built with NestJS, a progressive Node.js framework for building efficient and reliable server-side applications.

### 🚀 Features
* Modular Architecture: Built with a clean, decoupled structure (Modules, Controllers, Services).
* Type Safety: Fully written in TypeScript for robust development.
* RESTful Endpoints: Full CRUD functionality for Create , Update , Delete , and Read.
* Validation: Input validation using Zod.
* Database: Integrated with MySQL using TypeORM/Prisma.
  
### Project setup
### 1. Clone The Repository:
```bash
git clone https://github.com/jiieea/Nestjs-Restful-Api.git
cd Nestjs-Restful-Api
```
### 2. Install Depedencies:
```bash
npm install
```
### 3. Set up Environtment Variables: Create a .env file int the root dir and add your configs:
```Code snippet
  DATABASE_URL="mysql://root:async15@localhost:3306/restapi"
  DATABASE_HOST="localhost"
  DATABASE_USER="YOUR_DB_USERNAME"
  DATABASE_PASSWORD="YOUR_DB_PASSWORD"
```
## Running the App
```bash
# development
$ npm run start

# watch mode (hot-reload)
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 🧪 Testing
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## 📂 Project Structure
