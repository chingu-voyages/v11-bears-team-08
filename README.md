# v11-bears-team-08

> This repo loosely follows project guidelines outlined [here](https://github.com/elsewhencode/project-guidelines).

Search and booking app for finding personal trainers by location | Voyage-11 | https://chingu.io/ | https://twitter.com/ChinguCollabs

## Deployments

- [Staging](https://v11-bears-08-staging.herokuapp.com/) (follows the dev branch)

## Developing

### Built With

- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)

### Prerequisites

- [Node](https://nodejs.org/en/) or a node version manager.
- A local or cloud based [MongoDB](https://www.mongodb.com/) platform like [Atlas](https://www.mongodb.com/cloud/atlas).

### Development setup

Clone the repo, then:

```shell
# install dependencies
npm install && cd client && npm install

# start a mongodb database, for a local db on unix, use
npm run db:unix
# or, for windows
npm run db:win

# start the dev backend on the root folder
npm run dev
# start the dev frontend on /client
cd client && npm start
```

In case you're using a cloud solution as a database, simply add a `MONGO_URI` key to `.env.development.local` in the root folder

## Tests

```shell
# to run backend tests
npm run test
# to run frontend tests
cd client && npm run test
```
