Auth0 Authentication and Email Service

This project is a Node.js backend that integrates Auth0 authentication and sends authentication tokens via email using Nodemailer.

#Features

Auth0 authentication token validation

Sending authentication tokens to users via email

Secure environment variable management with dotenv

Express server setup with CORS and body parsing

#Technologies Used

Node.js

Express.js

Auth0

Nodemailer

Axios

dotenv

CORS

body-parser



#A Gmail account for sending emails

#Getting Started


#Install Dependencies

npm install

#Set Up Environment Variables

Create a .env file in the root directory and add the following:

PORT=5000

AUTH0_DOMAIN=***********

EMAIL_USER=************

EMAIL_PASS=************

#Run the Server

npm start

The server will start on http://localhost:5000.

API Endpoints

POST /auth/callback

Deployment

You can deploy this application to Render
