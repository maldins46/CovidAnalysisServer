# CovidAnalysis Server Component

This is a service used from the CovidAnalysis project, built with Express and Node.js. The main objective of this component is to handle the notification service, giving the possibility for the client to receive notifications when new data are ready, following the specifications from the [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API). The "official" distribution of the server component is accessible from an Heroku instance (synchronized with the `main` branch of this repo), paired with a MongoDB Atlas instance.


## Endpoints

While running, the Express server exposes just two endpoints:
- `POST /subscribe`: intercept request from clients that want to receive notifications when new data are ready. The body of the message must include a well-formed [PushSubscription](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription);
- `GET /trigger/{covid, vaccines}`: starts sending notifications to all available subscribers, using the `web-push` library, either for new vaccines data or new covid situation data.


## Run and test

It is possible to run the server with the script `npm run start`. In order for the service to work, it is necessary to set some enviroment variables. It is possible to specify them directly into an `.env` file, including it in the same directory of the project:
- **PUBLIC_KEY**: the public key of the Vapid key pair, necessary in order to send push notifications to the subscribers;
- **PRIVATE_KEY**: the private key of the Vapid key pair, necessary in order to send push notifications to the subscribers;
- **ENV**: set this value to  ```development``` to use a mock in-memory MongoDB database, instead of a real endpoint; set it to ```production``` in order to use the db accessible from *MONGO_URL*;
- **MONGO_URL**: the URL connection string to a MongoDB instance.

As it is a Node.js project, tests can be run using the command ```npm test```. 

