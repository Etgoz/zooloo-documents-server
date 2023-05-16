# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `data-source.ts` file
3. Run `npm start` command

# zooloo-documents-server

In order to use - save a .env file with the following varibles:
POSTGRES_USERNAME,
POSTGRES_PASSWORD,

SERVER_PORT

# run 'docker compose up'

# connect users to documents using this endpoint:

put('/users/:userId/documents/:documentId')

for example: 'http://localhost:3000/users/1/documents/1'

# get all the documents of a certain user:

get('/users/:id/documents')

for example: 'http://localhost:3000/users/1/documents'
