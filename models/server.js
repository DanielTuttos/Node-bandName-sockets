//servidor de express
const express = require("express");
// servidor se sockets
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    // http server
    this.server = http.createServer(this.app);

    // configuraciones de sockets
    this.io = socketio(this.server, {
      /** configuraciones */
    });
  }
  middlewares() {
    //desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    // cors
    this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    // inicializar middlewares
    this.middlewares();

    //inicializar sockerts
    this.configurarSockets();

    //inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto :", this.port);
    });
  }
}

module.exports = Server;
