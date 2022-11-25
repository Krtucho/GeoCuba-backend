<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Jsonwebtoken para la seguridad, sequelize el orm para mysql, express js

Breed: {
    name: ""
}


Person:{
    name: "" 
    username: "" +
    password: "" ** +
    photo: img
}

Pet:{
    name: ""
    BreedId: Breed +
    OwnerId: Person +
}

Shop:{
    name: ""
}

Animal: {
    ShopId: Shop
    BreedId: Breed
    price: 12.45
    amount: 5
}


las tiendas tienen animales, y los venden a un precio,
los animales tienen asociada una raza
los Usuarios compran animales y se convierten en sus mascotas

los usuario tienen foto.

para consumir el servicio de compra el usuario debe estar logueado

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Base de datos
PostgreSQL
El archivo de configuracion se encuentra en src/config
## Paths

Breeds
```bash
# Devuelve todos los breeds
$ GET localhost:3000/breeds

# Obtiene un breed por su id
$ GET localhost:3000/breeds/:id

# Busca un breed que contenga en su nombre a search
$ GET localhost:3000/breeds?search="argumento_opcional"

# Crea un Breed
$ POST localhost:3000/breeds
# Body
# name: string;

# Elimina un breed por su id
$ DELETE localhost:3000/breeds/:id

# Modifica un breed por su id. Este fue el unico ejemplo que puse de modificar, para ahorrar tiempo, en los demas casos el procedimiento seria parecido
$ PATCH localhost:3000/breeds/:id
# Body
# name: string;

```
Person-Auth
```bash
# Registra a un nuevo usuario
$ POST localhost:3000/auth/signup
# Body
# name?: string;
# username: string;
# password: string;

# Loguea a un nuevo usuario
$ POST localhost:3000/auth/signin
# Body
# username: string;
# password: string;

# Sube una imagen para foto de perfil del usuario, la ruta se establece en la propiedad img
$ POST localhost:3000/auth/person/upload
# Authorization: Bearer Token
# Body
# file: File
```
Pets
```bash
# Devuelve todos los pets que pertenecen a cierto person
$ GET localhost:3000/pets
# Authorization: Bearer Token

# Busca un pet que pertenezca a cierto person y contenga en su nombre a search
$ GET localhost:3000/pets?search="argumento_opcional"
# Authorization: Bearer Token

# Busca un pet que pertenezca a cierto person por su id(id del pet)
$ GET localhost:3000/pets/:id
# Authorization: Bearer Token
```
Shops-Person buy-Animals Create
```bash
# Devuelve todos los shops
$ GET localhost:3000/shops

# Obtiene un shop por su id
$ GET localhost:3000/shops/:id

# Busca un shop que contenga en su nombre a search
$ GET localhost:3000/shops?search="argumento_opcional"

# Crea un Shop
$ POST localhost:3000/shops
# Body
# name: string;

# Elimina un Shop por su id
$ DELETE localhost:3000/shops/:id

# Devuelve todos los Animals que pertenezcan a esta tienda(id)
$ GET localhost:3000/shops/:id/animals

# Busca un animal que se encuentre en esta tienda(id), contenga un precio menor que price y exista en la tienda una cantidad mayor que amount 
$ GET localhost:3000/shops:id/animals?price="0.1"&amount=2
# Ambos argumentos son opcionales

# Agrega un Animal a esta tienda(id)
$ POST localhost:3000/shops/:id/animals?price=0.1&amount=4&breedId=1
# Los 3 argumentos son requeridos
# breedId -> Id del Breed

# Un Person compra de la tienda(id) un Animal
POST localhost:3000/shops/:id/buy?animalId=1&amount=1&petName=nombre_opcional
# Authorization: Bearer Token
```
Aclaraciones
```
Al comprar un animal en la tienda solamente se podra comprar 1, ya que el usuario tendria que ponerle nombres a todas a la vez en otro caso y en el nuestro aceptamos solamente 1 nombre. Esto lo resolvi de esta forma porque no me quedo del todo claro eso en la orden, pero en caso de necesidad de cambio, no seria tan complicado ajustarlo para varios animales.

Si se compran la cantidad de mascotas que existen en amount de cierto animal, este es removido de la tienda y de la base de datos. Esto tampoco me quedo claro del todo en la orden, pero vi esta via como la que mas se ajustaba al problema que se queria representar.

Cuando un usuario compra un animal, se creara un pet con el nombre que la persona le puso y se restara 1 a la cantidad de animales de este tipo en la tienda.
```



## Stay in touch

- Author - Krtucho
- Telegram - [Krtucho](https://t.me/Krtucho)
