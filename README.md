
# Ecommerce App

A fully functional e-commerce application built with the MERN stack, offering a comprehensive shopping experience.


## Tech Stack

**Client:** React, React-bootstrap , Redux, RTK Query,

**Server:** Node, Express, MongoDB

**Dependencies:** react-helmet-async, react-icons, react-razorpay, react-redux, react-router-bootstrap, react-router-dom, react-toastify, uuid, bcryptjs, cookie-parser, cors, crypto, express, jsonwebtoken, mongoose, multer, razorpay, dotenv, nodemon, npm-run-all
## Features


- Full featured shopping cart with quantity selector.
- Product review and ratings.
- User registration and signin.
- User profile with orders.
- Top products carousel and pagination. 
- Product magnification.
- Product search feature.
- Admin product, user, and order management page.
- Multistage checkout process(shipping, paymentmethod, placeorder, payment).
- Razorpay payment integration.
- Fully mobile-responsive.



## Demo


User features #1

https://github.com/Hrithik-C-A/MERN-E-commerce/assets/117261838/48fc8333-879c-45ab-a6ba-e0fcfae323c0

User features #2

https://github.com/Hrithik-C-A/MERN-E-commerce/assets/117261838/91efbe19-30bb-4c9d-b0a9-344e098ae4d2

Admin features

https://github.com/Hrithik-C-A/MERN-E-commerce/assets/117261838/aac95f99-4d73-4f51-80c4-f3a4a262775e



## Environment Variables

To run this project, 

You will need to add the following environment variables to your .env file in backend directory

Here's the breakdown of each environment variable and its purpose:

```
NODE_ENV
```

This environment variable indicates that the application is running in development mode. This setting affects various aspects of the application, such as logging behavior, error handling, and performance optimizations.

```
PORT = 5000
```

This environment variable specifies the port that the Express server will listen on. In a real-world scenario, you would typically use a different port number, such as 80 or 443, for production deployments.

```
FRONTEND_URI = http://localhost:3000
```

This environment variable specifies the URL of the frontend application. The provided code uses this URL to set the origin option for the CORS middleware.

```
MONGO_URI
```

This environment variable contains the connection string for the MongoDB database. The backend server uses this connection string to connect to the database and perform data operations.

```
JWT_SECRET
```

This environment variable stores the secret key used for generating and verifying JSON Web Tokens (JWTs). JWTs are used for user authentication and authorization in the application.

```
KEY_ID
```

This environment variable holds the API key for Razorpay, a payment gateway service. The backend server uses this key to process payments through Razorpay.

```
KEY_SECRET
```

This environment variable contains the API secret for Razorpay. The backend server uses this secret key to authenticate with Razorpay and process payments securely.

```
PAGINATION_LIMIT
```

This environment variable specifies the maximum number of items to return per page when fetching paginated data. This setting helps control the amount of data loaded at once and improves performance.
## Run Locally

Clone the project

  ```bash
  git clone https://github.com/Hrithik-C-A/MERN-E-commerce.git
```

Go to the project directory

   ```bash
  cd MERN-E-commerce
```

Install the backend dependencies:
   ```bash
   npm install
   ```

Start the backend server
   ```bash
   npm run server
   ```

Install the frontend dependencies:
   ```bash
   cd frontend
   
   npm install
   ```   

Start the frontend development server:
   ```bash
   npm start
   ```

To start both backend and frontend server:                     
   ```bash
   npm run dev
   ```

Open the application in your browser at http://localhost:3000/.

**Additional Commands**

* To import sample data:
```bash
npm run data:import
```

* To destroy sample data:
```bash
npm run data:destroy
```

* To build the production-ready frontend application:
```bash
npm run build
```



## Author

- [@Hrithik-C-A](https://github.com/Hrithik-C-A)


## Live link

https://ecommerce-kf9o.onrender.com/
## License

Copyright © 2023 [@Hrithik-C-A](https://github.com/Hrithik-C-A).

This project is [MIT](./LICENCE.md) licensed.

