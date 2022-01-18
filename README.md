# MERN Ecommerce - Shop


Full Stack e-commerce application built with MERN and third-party packages. This application provides these features:

1. Handle authentication using firebase, differentiating between admins and users
2. Enable admins to make all the crud operations on products, categories, and subcategories
3. Enable users to discover products, search and add to cart.


* Tools:
  * Node provides the backend environment for this application
  * Express middleware is used to handle requests, routes
  * Mongoose schemas to connect the backend with MongoDB
  * React for displaying UI components
  * Redux to manage application's state


## Install

Some basic Git commands are:

```
$ npm install
```

## Setup

```
 Create .env file in server folder that include:

  * DATABASE='MongoDB URL'  
  * PORT= Port number

 Create .env file in client folder that include:
 
  * REACT_APP_REGISTER_REDIRECT_URL = 'http://localhost:3000/register/complete'
  * REACT_APP_FORGOT_PASSWORD_REDIRECT = 'http://localhost:3000/login'
  * REACT_APP_API = 'http://localhost:8000/api'
  
```


## Run the application for development

```
$ npm start
```


## Languages & tools

- [Node](https://nodejs.org/en/)

- [Express](https://expressjs.com/)

- [Mongoose](https://mongoosejs.com/)

- [React](https://reactjs.org/)

- [Webpack](https://webpack.js.org/)