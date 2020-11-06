# LovingSitter

### Table of Contents

- [Description](#description)
- [Technologies](#technologies-used)
- [env](#env)
- [Links to APIS](#links-to-apis)
- [Backend](#backend)
- [Frontend](#frontend)
- [Authors](#authors)

## Description

A two-sided marketplace website that allows dog owners to find dog sitters and dog services easily and quickly, while providing dog sitters jobs. It has a real time notification and messaging system to allow real time communication. Search easily to find the perfect dog sitter based on rating, location, and even pay rate. Easy and quick payment and personal profiles setups. Also create your own schedule, for when you want to work as a sitter.

## Technologies Used

This is a MERN application:

- MongoDB
- ExpressJS
- React
- NodeJS
- Amazon S3
- Stripe
- MapQuest

## env

This is the necessary .env file needed to run the application:
```
MONGODB_URI=<MONGODB_URI>
ACCESS_TOKEN_NAME=<ACCESS_TOKEN_NAME>
ACCESS_TOKEN_SECRET=<ACCESS_TOKEN_SECRET>
ACCESS_TOKEN_LIFE=<ACCESS_TOKEN_LIFE>
AWSAccessKeyId=<AWSAccessKeyId>
AWSSecretKey=<AWSSecretKey>
S3_BUCKET=<S3_BUCKET>
STRIPE_KEY=<STRIPE_KEY>
STRIPE_SECRET=<STRIPE_SECRET>
RETURN_PAYMENT_LINK=<RETURN_PAYMENT_LINK>
MAP_QUEST_KEY=<MAP_QUEST_KEY>
RETURN_PAYMENT_LINK=<RETURN_PAYMENT_LINK>
```
### NOTE

_ACCESS_TOKEN_NAME_, _ACCESS_TOKEN_SECRET_, _ACCESS_TOKEN_LIFE_ is used for _passport-jwt_

## Links to APIS

- [Amazon S3](https://aws.amazon.com/s3/)
- [Amazon Web Services](https://aws.amazon.com/products/)
- [Stripe](https://stripe.com/en-ca)
- [MapQuest](https://developer.mapquest.com/)

## Backend

### Folder Structure

```
server
|-----bin
|      └---- www*  # HTTP Server entry point
|-----controllers  # The logic for routes
|-----middleware   # Custom ExpressJS middleware modules
|-----models       # Database Schema models for MongoDB
|-----routes       # Express server API endpoints
|-----test         # Unit server testing files
|-----utils        # Utility module files
└-----scripts      # Any automation scripts files
```

### API End Points

#### NOTE
- User and Profile refer to MongoDB Document objects.
- Responses are always JSON unless stated.
- Body may only be some properties of the Document object.

| End Point                     | Method | Private/Protected Route | Params       |                Body                   | Status  |    Response     |
|-------------------------------|--------|:-----------------------:|--------------|:-------------------------------------:|---------|:---------------:|
| /welcome                      | GET    |                         |              |                                       | 200     |      text       |
| /ping                         | POST   |                         |              |         {teamName: String}            | 200     |      text       |
| /profile/create               | POST   |                         |              |              Profile                  | 201     |    Profile      |
| /profile/:id                  | PUT    |                         | {id: String} |      Profile, {email: String}         | 200     |    Profile      |
| /profile                      | GET    |                         |              |                                       | 200     |   [Profile]     |
| /profile/me                   | GET    |           Yes           |              |                                       | 200     |    Profile      |
| /profile/:id                  | GET    |                         | {id: String} |                                       | 200     |    Profile      |
| /user/me                      | GET    |           Yes           |              |                                       | 200     |  {user: User}   |
| /register                     | POST   |                         |              |           User, Profile               | 201     |      User       |
| /login                        | POST   |                         |              | {email: String, password: String}     | 200     |  {user: User}   |
| /logout                       | POST   |           Yes           |              |                                       | 200     |  {user: User}   |
| /upload                       | POST   |           Yes           |              |        Multipart/Form-data            |         | {url: String}   |
| /upload/delete                | PUT    |           Yes           |              |                                       | 200     |                 |
| /payment/methods              | POST   |           Yes           |              |  {card\_id: String, user\_id: string} | 201     |     Profile     |
| /payment/methods              | GET    |           Yes           |              |                                       | 200     |      {data}     |
| /payment/account              | POST   |           Yes           |              | {email: String, profile\_id: String}  | 201     |  {accountLink}  |
| /payment/account/validate/:id | GET    |           Yes           | {id: String} |                                       | 200     |    {account}    |
| /request/me                   | GET    |           Yes           |              |                                       | 200     |    [Request]    |
| /request/requests             | GET    |           Yes           |              |                                       | 200     |    [Request]    |
| /request/create               | POST   |           Yes           |              |           Request            | 200     |     Request     |
| /request/update/:id           | PUT    |           Yes           | {id: String} |           Request            | 200/204 |   Request/None  |
| /request/:id/pay              | POST   |           Yes           | {id: String} |               {amount: Float}                | 200     | {paymentIntent} |

### Starting the backend

1. Go to _/server_
2. Create necessary .env with required environment variables (look up for example)
3. Make .env is in /server
4. Install module dependencies with command _npm install_
5. Run the server with the command _npm run debug_
6. Server runs on _http://localhost:3001_

## Frontend

### Folder Structure

```
client
|-----public           # Static files
└-----src
      |-----components # React components
	  |-----contexts   # Custom contexts for application
	  |-----data       # Any necessary config files or API public keys
	  |-----hooks      # Custom made React hooks
	  |-----pages      # Complete renderable views
	  |-----themes     # Configurable Material-UI files for custom styling
	  |-----services   # Anything relative to backend or API calls
	  |-----App.js     # Routes and global contexts applied here
	  └-----index.js   # Entry point of frontend
```

### React-Routes

#### App Routes

| Route            | Private/Protect |
|------------------|-----------------|
| /                |                 |
| /signup          |                 |
| /login           |                 |
| /profiles        |                 |
| /profiles/:id    |                 |
| /me              |       Yes       |
| /become-a-sitter |       Yes       |
| /my-sitters      |       Yes       |
| /my-jobs         |       Yes       |
| /messages        |       Yes       |

### Profile Routes

| Route          | Private/Protected |
|----------------|-------------------|
| /edit-profile  |         Yes       |
| /profile-photo |         Yes       |
| /payment       |         Yes       |
| /security      |         Yes       |
| /settings      |         Yes       |
| /availability  |         Yes       |

### Starting the frontend

1. Go to _/client_
2. Install module dependencies with command _npm install_
3. Run the server with the command _npm start_ for developer server
4. Server runs on _http://localhost:3000_
5. You can run _npm run build_ for production ready application

## Authors

[Dan Proctor](https://github.com/dproc96)
[Michael Braga](https://github.com/Braagaa)

[Back To Top](#lovingsitter)
