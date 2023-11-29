import express from "express";
import handlebars from "express-handlebars";
import { webRouter } from "./routers/web.Routers.js";
import { apiRouter } from "./routers/api.Routers.js";
import { Server } from "socket.io";
import {
  onConnection,
  inyectarSocketServer,
} from "./socket/socket.Controllers.js";

const app = express();
const PORT = 8080;

//Motor de plantillas : Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./views");

//Middlewares necesarias
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(express.static("./views"));
app.use("/static", express.static("./static"));

//Se pone a escuchar en el puerto
const server = app.listen(PORT, () => {
  console.log("Conectado al puerto 8080");
});

//Se crea el webSocketServer se le hace un new del server que se esta escuchando, ademas se le agrega el onConnection que esta modularizado en el archivo socket.Controller.js en la carpeta socket
export const webSocketServer = new Server(server);
webSocketServer.on("connection", onConnection(webSocketServer));

//Carga de Routers Api,Web y la funcion del socket para devolver los productos
app.use(inyectarSocketServer(webSocketServer));
app.use("/api", apiRouter);
app.use("/", webRouter);
