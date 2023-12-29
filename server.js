"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer);
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
