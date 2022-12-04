# Restaurants REST API

A RESTful API built in [NodeJS.](https://nodejs.org/en/) for fetch restaurants data.

## Installation & Run

### Download this project
Fork and clone this repository. [Instructions here.](https://docs.github.com/es/get-started/quickstart/fork-a-repo)


### Set the database
Before running API server, you should set the database config with yours or set the your database config with my values on [db.config.js](https://github.com/mblason/restaurants_api/blob/main/config/db.config.js)
```bash
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tailorHubChallenge";
```

### Add data to the database
Once the database is connected, you can seed the database with restaurants by executing the following command: 
```bash
npm run seeds
```

### Run
And finally, to run de REST API execute the following command: 
```bash
npm start
```

## Main Structure
```  
|
├── config               // Integrations configuration and routes map
├── controllers          // Handle endpoints request
├── data                 // Data to seed
├── middlewares          // Authentication middlewares
├── models               // Data models
├── seeds                // Configuration to run seeds
├── templates            // Email templates                  
└── app.js               // App configuration
```

## API endpoints

### Authentication

* `GET` & `/`: Auth form screen
* `POST` & `/register`: Register request
* `GET` & `/activate/:token`: Activate account with token previously emailed
* `POST` & `/login`: Login request
* `GET` & `/login/google`: Auth with Google request
* `GET` & `/auth/google/callback`: Do the authentication with Google
* `GET` & `/users/me`: Get the user logged in

### Restaurants

* `GET` & `/restaurant/list`: Get all restaurants
* `GET` & `/restaurant/:id`: Get one restaurant
* `GET` & `/restaurant/list/:user`: Get restaurants posted by a specific user
* `POST` & `/restaurant/create`: Create a restaurant
* `POST` & `/restaurant/edit`: Edit a specific restaurant
* `DELETE` & `/restaurant/edit`: Delete a specific restaurant

### User's favourites restaurants

* `GET` & `/favourite/:user`: Get all favourites restaurants of a specific user
* `GET` & `/favourite/:restaurant/:user`: Get one favourite restaurant of a specific user
* `POST` & `/favourite/create`: Add a new favourite restaurant
* `DELETE` & `/favourite/delete/:restaurant/:user`: Delete a restaurant previously saved