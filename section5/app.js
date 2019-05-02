const http = require("http");

const express = require("express");

const app = express();

const server = http.createServer(app);

console.log(routes.someTest);

server.listen(3000);
