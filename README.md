# WebApi with NodeJS

A RESTful API developed using `NodeJs`, `Express`, `PostgreSQL`, `Sequelize` and `Bcrypt`. The API supports CRUD operations where a user can register themselves to the system and can add more members with their information and edit them. Many users can register themseleves to the system therfore, one user cannot view/edit members added by other users.

## Purpose

The goals for this project are:
 - build a simple and flexible webApi service using nodeJS from scratch
 - use JWT based authentication service to safeguard API resources
 - use postgreSQL as database and seed data with Sequelize
 - become familiar with password hashing strategies
 - create a sensible Express project structure that cleanly separates concerns
 - expose a user management REST API to perform CRUD operations to manage user information

 ## Prerequisites

Following dependencies is added to `package.json`

```
dependencies: {
    "bcrypt": "^5.0.0",
    "body-parser": "^1.19.0",
    "config": "^3.3.1",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "glob": "^7.1.6",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "nodemon": "^2.0.4",
    "pg": "^8.3.0",
    "sequelize": "^6.3.3",
    "validator": "^13.1.1"
  }
```

## Installation

  1. Clone this repo
  2. npm install
  3. create postgres database matchin the name from the models and modify the `postgres.js` according to your database details

## REST API
    1. /user
    2. /user/signup
    3. /user/login
    4. /user/my-profile
    5. /user/add-member
    6. /user/id
    7. /user/refresh-token
    8. /user/logout