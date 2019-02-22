require('dotenv').config();
const express = require('express');
const notesRouter = require('./routers/notes_router');
const usersRouter = require('./routers/users_router')
const cors = require('cors')

const server = express();
const port = process.env.PORT

server.use(cors());
server.use(express.json());
server.use('/api/notes', notesRouter);
server.use('/api/users', usersRouter);

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
