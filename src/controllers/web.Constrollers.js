import { managerProducts } from "../dao/services/productManager.js";
import { MessagesManagerMongoose } from "../dao/services/messagesMongoose.js";
import { usserSchema } from "../dao/services/UssersManager.js";
import { conectar, desconectar } from "../dao/services/index.js";

export async function realTimeProductsWeb(req, res) {
  return res.status(200).render("realTimeProducts.handlebars", {
    titulo: " realTimeProductsWeb",
  });
}

export async function homeWeb(req, res) {
  try {
    let hayProductos;
    const arregloProduct = await managerProducts.getProducts();

    if (arregloProduct.length > 0) {
      hayProductos = true;
    } else {
      hayProductos = false;
    }

    return res.status(200).render("home.handlebars", {
      titulo: "Home",
      hayProductos,
      arregloProduct,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error,
    });
  }
}
export async function chatHandlebars(req, res) {
  try {
    await conectar();
    const mensajes = await MessagesManagerMongoose.find().lean();
    await desconectar();
    if (mensajes) {
      res["sendMessage"]();
      return res.status(200).render("chat.handlebars", { title: "CHAT" });
    } else {
      return res
        .status(400)
        .json({ status: "error", message: "Sin Mensajes para mostrar" });
    }
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function logginUsser(req, res) {
  try {
    await conectar();
    const usser = req.query.usser;
    const pass = req.query.password;

    const isValid = await usserSchema
      .find({ usser: usser, password: pass })
      .lean();
    await desconectar();
    if (!isValid) {
      return res
        .status(400)
        .json({ status: "error", message: "Usuario No Encontrado" });
    }
    return res.status(200).json(isValid);
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function usserRegister(req, res) {
  try {
    await conectar();
    const newUsser = await usserSchema.create(req.body);
    await desconectar();
    return res.status(200).json(newUsser);
  } catch (error) {
    await desconectar();
    return res.status(400).json({ status: "error", message: error.message });
  }
}

export async function saveAndSend(req, res) {
  try {
    await conectar();
    const mensaje = await MessagesManagerMongoose.create(req.body);
    await desconectar();
    res["sendMessage"]();
    res.status(200);
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
}
