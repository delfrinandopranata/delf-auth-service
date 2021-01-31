
README

# Deployed to:

You may test the API on here!
https://ach1bxdas4.execute-api.ap-southeast-1.amazonaws.com/dev/api/documentation


https://ach1bxdas4.execute-api.ap-southeast-1.amazonaws.com/dev/api/*/*


# Installation

Local Set Up
In order to run this application on your own machine, you need to make sure you have installed this packages first.

- Latest version of NPM / YARN
- NODE version later than v12.*
- Java Runtime (To run local DynamoDB)

If you have none of them, please help your self with it first, because this repository will not teach you how to install it!


## Local Set Up
### Prerequisite & Requirement
- awscli => 1.16.220
- node => v12.x
- npm => 6.x or
- yarn => 1.x

Make sure you install all the required tools. This is not a tutorial how to install them on your laptop.

In order to run this application locally, you need to open 2 terminal. Both terminal will need to run this command to do initial setup and local ENV:
To setup local ENV, you may run this command:

```cli
. local.sh
```

First terminal will be used as the DynamoDB Client. You need to run this command:

```cli
serverless dynamodb install && serverless dynamodb start
```

This command will automatically setup the database structure on your memory machine. There is 3 tables: `users_dev`, `roles_dev` and `permissions_dev` 


Second terminal will be used to run the API. Command:
```cli
serverless offline
```

This command will start the service so that APIs will be available to be tested. They are:

```
API Contract & Documentation:
    GET    http://localhost:3000/dev/api/documentation 

Register & Login to get JWT Token:
    POST   http://localhost:3000/dev/api/signup           
    POST   http://localhost:3000/dev/api/login      

JWT Token Required:
    GET    http://localhost:3000/dev/api/users/{id}       
    GET    http://localhost:3000/dev/api/users            
    GET    http://localhost:3000/dev/api/permissions      
    POST   http://localhost:3000/dev/api/permissions      
    GET    http://localhost:3000/dev/api/roles            
    POST   http://localhost:3000/dev/api/roles            
    POST   http://localhost:3000/dev/api/users/roles      
    POST   http://localhost:3000/dev/api/users/permissions    
```

