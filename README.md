# Pafin CRUD API
 
 ## Technical assessment
 
 Steps to get the API running locally

 1. Install Node.js from https://nodejs.org/en/download
 2. Clone the project repo from https://github.com/rudolphventer/pafin-crud-backend.git
 3. Open the project folder in your editor of choice (I recommend [VSCode](https://code.visualstudio.com/))
 4. Open a terminal in the root of the project and run `npm install`, wait for the installation to complete
 5. Create an environment file in the root of the project, this will store database connection credentials and other information. See the note on `.env` files below
 6. Set up your PostgreSQL database (see the note below on how to do this)
 7. Run `npm run start` to start the project

 ## On .env files
A file named `.env` must be created in the root of the project and should contain the following:
```
DB_HOST=xyz
DB_USER=xyz
DB_PASSWORD=xyz
DB_NAME=xyz
DB_PORT=xyz (5432 is the usual default here)
JWT_SECRET=xyz
ADMIN_USERNAME=xyz
ADMIN_PASSWORD=xyz
```
Replace `xyz` with the relevant configuration variables, the admin login credentials for the API are hardcoded here due to the limited scope of the assessment.

## PostgreSQL Setup
I like to use this portable PostgreSQL version from here: https://github.com/garethflowers/postgresql-portable, you can download it and run it without installing anything. After launching the exe you can set up a table to test this API using the following commands:
```
CREATE ROLE apiRole WITH LOGIN PASSWORD 'password';

ALTER ROLE apiRole WITH SUPERUSER;

CREATE DATABASE api;

\c api;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(200)
);

\d users;

INSERT INTO users (name, email, password) VALUES ('TestUser', 'test@test.com', 'password1'), ('TestUser2', 'test2@test.com', 'password2');
```

The above commands will quickly set up the database for this assessment and are not best practice in any way. The `apiRole` account created here is what should be used for your `DB_USER` and `DB_PASSWORD` in you .env file.

## Manual testing
Once the API and database are running you can start testing the endpoints. You will need to get a JWT token by making a `GET` request to the `/api/signin` endpoint (`localhost:3000/api/login` if you are running the API locally). 

The request body should contain your admin credentials from your .env file like so:
```
{
  "username": "ADMIN_USERNAME",
  "password": "ADMIN_PASSWORD"
}
```
The response body will contain the header you need and should look like so:
```
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2OTA3NDUxNTR9.VbnvfL1Uz7mRw6kVRxBBI2SdCpepYmoMVJe8R5IQOHw"
}
```

The rest of your requests should be made after adding the authorization header from that response to the request headers. I have left [Postman](https://www.postman.com/) and [Thunder Client](https://www.thunderclient.com/) API test collections in the `./tests/` directory that can be imported into either program for easy manual testing of endpoints.

## Automated Testing
Once setup is complete, unit tests can be run using the `npm run test` command and can be reloaded live with code changes using `npm run test:watch`