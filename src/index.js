const express = require('express');
const server = express();
server.use(express.json())

const TaskRoutes = require('./routes/TaskRoutes')
server.use('/task', TaskRoutes)


server.listen(3000, () => {
    console.log('\x1b[33m%s\x1b[0m', 'UP AND RUNNING...');
})