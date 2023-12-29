import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

let userCount = 0;

io.on('connection', (socket) => {
    userCount++;
    io.emit('user count', userCount);
    socket.on('disconnect', () => {
        userCount--;
        io.emit('user count', userCount);
    });
});

app.get('/', (req, res) => {
    res.send(`<h1>User Count: <span id="count"></span></h1>
            <script src="/socket.io/socket.io.js"></script>
            <script>
              const socket = io();
              socket.on('user count', count => {
                document.getElementById('count').textContent = count;
              });
            </script>`);
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
