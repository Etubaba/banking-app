# Etumnu Prosper

## Description

This application is a modern banking app powered by Nest JS and MongoDB on the backend (server and database respectively), and the latest version of NextJS on the frontend. It offers user signup and login functionalities with secure authentication using JWT. Users can credit their wallets using Paystack, withdraw money, and view their transaction history. It provides a seamless and secure banking experience, combining advanced technologies to ensure optimal performance and data security.

## Note

The backend was hosted on render, and due to it is hosted on a free tier, the APIs might take 1-2mins to be ready on the first hit of the api endpoints (This is so because of the time for the app to spine up after it is short down 15mins of app inactivity), so expect a loading for 1-2mins on the first call of any endpoint.

## user created for assessment purposes

```bash
$ phone : 09042528770
$ password : 12345

$ phone : 07054545678
$ password : 12345
```

## Guide and Instruction

Website URL : <a href='https://veegil-media-assessment-b5t83v87w-veegil.vercel.app/'>https://veegil-media-assessment-b5t83v87w-veegil.vercel.app/</a>

The index page is the home page, click on register button on the page header to create an account, after registration is complete it will authomatically take the user to the login page, user is expected to login , and have access to his dashboard where user can add money by clicking on the add money button or withdraw money by clicking on the withdraw money button.

# Server

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov

# specificfy
$ yarn test <test-file-name>

```

## API BASE_URL

```bash
 $ https://veegil-media-assessment.onrender.com/
```

# REST API

The REST API to the this app is described below.

## User Registration

### Request

`POST /auth/register`

    curl -i -H 'Accept: application/json' -d 'full_name=samuel lala&phone=0812323223&email=lamus@gmail.com&password=12345' https://veegil-media-assessment.onrender.com/api/v1/auth/register

### Response

    HTTP/1.1 201 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 created
    Connection: close
    Content-Type: application/json

{
"user": {
"id": "6494665ebaa5653dfcb90f39",
"full_name": "Samuel Folajimi",
"phone": "07054545678",
"email": "prosperdiscovery@gmail.com",
"account_balance": 0
},
"accessToken": "gfgh....",
"refreshToken": "jhj...."
}

## Refresh User Token

### Request

`POST /auth/refresh`

    curl -i -H 'Accept: application/json' -d 'refreshToken=mmsmmsm....' https://veegil-media-assessment.onrender.com/api/v1/auth/refresh

### Response

    HTTP/1.1 200
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 Created
    Connection: close
    Content-Type: application/json

{
"user": {
"id": "6494665ebaa5653dfcb90f39",
"full_name": "Samuel Folajimi",
"phone": "07054545678",
"email": "prosperdiscovery@gmail.com",
"account_balance": 0
},
"accessToken": "gfgh....",
"refreshToken": "jhj...."
}

## User Login

### Request

`POST /auth/login`

    curl -i -H 'Accept: application/json' -d 'phone=0908867776&password=new88' https://veegil-media-assessment.onrender.com/api/v1/auth/login

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 201 Created
    Connection: close
    Content-Type: application/json
    Location: /thing/1
    Content-Type: 'application/json'

{
"user": {
"id": "6494665ebaa5653dfcb90f39",
"full_name": "Samuel Folajimi",
"phone": "07054545678",
"email": "prosperdiscovery@gmail.com",
"account_balance": 0
},
"accessToken": "gfgh....",
"refreshToken": "jhj...."
}

## Fund User Account balance

### Request

`POST /transaction/payment`
`Authorization  Bearer`

    curl -i -H authorization:token 'Accept: application/json' -d 'amount=4000' https://veegil-media-assessment.onrender.com/api/v1/transaction/payment

### Response

    HTTP/1.1 201 Created
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 Created
    Connection: close
    Content-Type: 'application/json'

{
"status": true,
"message": "Authorization URL created",
"data": {
"authorization_url": "https://checkout.paystack.com/3kzryk4s435monf",
"access_code": "3kzryk4s435monf",
"reference": "1xyctk58ck"
}
}

## Withdraw fund from wallet

### Request

`POST /transaction/withdraw`
`Authorization  Bearer`

    curl -i -H authorization:token 'Accept: application/json' -d 'amount=400' https://veegil-media-assessment.onrender.com/api/v1/transaction/withdraw

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200
    Connection: close
    Content-Type: application/json

{
"transaction_status": "completed",
"message": "You have successfully withdrew 400"
}

## Get User Details with Transaction History

### Request

`GET /user/profile`
`Authorization  Bearer`

    curl -i -H 'Accept: application/json' -d  https://veegil-media-assessment.onrender.com/api/v1/user/profile

### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:31 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json

{
"id": "6494665ebaa5653dfcb90f39",
"full_name": "Samuel Folajimi",
"email": "prosperdiscovery@gmail.com",
"phone": "07054545678",
"account_balance": 25940,
"transaction_history":[]
}

#Front End

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
