# Chat server for SNICK SNACK

The main purpose for this project was to explore React Native. 

For the backend I wanted to make use of previous learnings building different projects. I wanted to create a service-oriented architecture, and to try out Server Sent Events.

Deployed at [Heroku](https://heroku.com/)

## Client: 
- [GitHub repo](https://github.com/fermentedcat/rn-chat)
- [Expo preview](exp://exp.host/@fermentedcat/snick-snack)


## Key features
- Live streamed updates with Server Sent Events (SSE)
- Push notifications using [expo-server-sdk](https://github.com/expo/expo-server-sdk-node) for Node.js
- Service-oriented architecture

- Register & login user
- Authentication using JWT
- CRUD messages, chats and users

## Code organisation
- `config:` Functions for handling startup processes
- `routes:` Express routes defining API structure
- `middlewares:` Operations prior to controller utilizing
- `controllers:` Controllers for routes, respond to client requests, call services
- `services:` Handles business logic
- `db:` data access layer to interact with the database, performing queries
- `models:` Database models
- `utils:` Reusable functions, such as hash password
- `__tests__:` Unit tests


## Database

Connected to [MongoDB Atlas](https://www.mongodb.com/atlas/database) database

### Models

- `User:` registered users, may contain push token
- `Chat:` all chats, contains creator (`user` id)
- `Message:` messages, contains ref to `chat`
- `Subscription:` user subscriptions to chats (refs to `user` and `chat`), chat creator and invitees

## Running

#### Clone & install

- `git clone https://github.com/fermentedcat/chat-api.git`
- `cd chat-api`
- `npm install`

#### Environment variables

- create a `.env` file in the project root
- copy the content of `.env-template` into `.env`
- replace template values with real values

#### Run app

- `npm run` or `nodemon server.js`


## Todo (backlog):
- Live update chat rooms with SSE & push notifications
- Live update edited messages with SSE
- Search for public chats (to join)
- Show user profile
- User avatars
- Add nicknames to chat members

