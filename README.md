# EXPRESS-STARTER

## Running the Database Locally

Running this application locally requires you to have MongoDB installed on your computer, for more information on installing MongoDB see [here](https://docs.mongodb.com/manual/installation/).

Once installed, you must start the Mongo Daemon by running

```
mongod
```

in the terminal. Once the Daemon has started, navigate in the terminal to this project repository if you are not already in it, and run:

```
cd server
npm run dev
```

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
```
