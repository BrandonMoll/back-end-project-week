require('dotenv').config();
const express = require('express');
const notesRouter = require('./routers/notes_router');

const server = express();
const port = process.env.port

server.use(express.json());
server.use('/api/notes', notesRouter);

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})
