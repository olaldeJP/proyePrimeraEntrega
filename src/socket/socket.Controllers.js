import { managerProducts } from "../services/productManager.js";

export function onConnection(socketServer) {
  return async function (socket) {
    console.log("se conectó " + socket.id);
    socket.broadcast.emit("nuevoUsuario", socket.id);

    socket.emit("sendProducts", await managerProducts.getProducts());

    socket.on("disconnecting", () => {
      socket.broadcast.emit("usuarioDesconectado", socket.id);
    });
  };
}

export function inyectarSocketServer(socketServer) {
  return function (req, res, next) {
    res["sendProducts"] = async () => {
      socketServer.emit("sendProducts", await managerProducts.getProducts());
    };
    next();
  };
}
