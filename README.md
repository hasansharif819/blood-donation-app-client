# Blood Donation App

# Live --> https://blood-donation-app-kohl.vercel.app/

# Server Live Link --> https://blood-donation-server-final-six.vercel.app/

## Server Git Repo --> https://github.com/hasansharif819/blood-donation-server
## Client Git Repo --> https://github.com/hasansharif819/blood-donation-app-client

# Technology (Backend)
* In this project, I have used Node/Express.js for server. 
* Typescript as a programming language. 
* PostgreSQL as Database
* Using Supabase for cloud database
* Prisma as a ORM
* JWT(JSON WEB TOKEN) for authorization
* Zod for validation
* Also use moduler pattern
* Vercel for deploy

# Technology (Frontend)

* Next JS
* TypeScript
* Material UI
* Redux for State management
* Zod for for validation
* Sonar for Toast
* JWT
* Axios

# Project Overview
## This project is basically for a Blood Donation App where Donor/user, userProfile and Request are three types of model exists.
* There are three  types of collections available which are 1. users, 2. userProfile, 3. requests.
* Three types of user role exists, these are user, admin and super-admin
* For now admin not setup
* User can register and login.
* User can update their profile
* User can update request status which is request for donation.
* Requester can request for donor

* 
* Change Password --> https://blood-donation-app-server-sandy.vercel.app/api/login/auth/change-password
* You can not use your previous two passwords and also the current password when you change your password
* You need to pass access token using header. Without access token you can not change your password
  Format for changing password


## Also use
* Using ESLint
* Using Prettier
* Global error handling
* Local error handling
* And so on


## Install this node/express app on your local machine, Just clone it and hit the command --> npm install
## You need to create .env file on your root folder where your package.json file is exists.
* In the .env file you have to provide
* 1. Port,
  2. Database url,
  3. Bcrypt salt round
  4. JWT access secret
  5. last is JWT access expires in
  6. JWT Refresh Secret
  7. JWT Refresh Expires In
* Then you have to modify your index.ts file which is in app/config

## Install this Next JS app on your local machine, Just clone it and hit the command --> npm install
## You need to create .env file on your root folder where your package.json file is exists.
* In the .env file you have to provide
* 1. Backend API,

## Lets share your experience from this app. 

# Thank you
