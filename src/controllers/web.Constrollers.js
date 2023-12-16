import { managerProducts } from "../dao/services/productManager.js";
import { MessagesManagerMongoose } from "../dao/services/messagesMongoose.js";
import { usserSchema } from "../dao/services/UssersManager.js";
import { cartsMongoose, conectar, desconectar } from "../dao/services/index.js";
import { productsMongoose } from "../dao/services/index.js";

export async function realTimeProductsWeb(req, res) {
  return res.status(200).render("realTimeProducts.handlebars", {
    titulo: " realTimeProductsWeb",
  });
}

export async function homeWeb(req, res) {
  try {
    const opcionesDePaginacion = {
      limit: req.query.limit || 10,
      page: req.query.page || 1,
      lean: true,
    };
    const criterioBusqueda = {};

    if (req.query.sort) {
      opcionesDePaginacion.sort = {
        price: req.query.sort === "desc" ? -1 : 1,
      };
    }
    if (req.query) {
    } else {
    }

    await conectar();

    const productos = await productsMongoose.paginate(
      criterioBusqueda,
      opcionesDePaginacion
    );

    await desconectar();

    return res.status(200).render("home.handlebars", {
      titulo: "Home",
      status: "sucess",
      payload: productos.docs,
      totalPages: productos.totalPages,
      prevPage: productos.prevPage,
      nextPage: productos.nextPage,
      page: productos.page,
      hasPrevPage: productos.hasPrevPage,
      hasNextPage: productos.hasNextPage,
      hayDocs: productos.docs > 0,
      prevLink: productos.prevLink,
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
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

export async function mostrarProducto(req, res) {
  try {
    const pid = req.params.pid;
    await conectar();
    const producto = await productsMongoose.findById(pid).lean();
    await desconectar();

    return res.status(200).render("product.handlebars", { producto });
  } catch (error) {
    return res.status(400).json({ status: "ERROR", message: message.error });
  }
}

export async function mostrarProductosCarrito(req, res) {
  try {
    const cid = req.params.cid;
    await conectar();
    const carrito = await cartsMongoose.findById(cid).lean();
    desconectar();
    if (carrito) {
      res
        .status(200)
        .render("carrito.handlebars", { products: carrito.products });
    } else
      res
        .status(400)
        .json({ status: "ERROR", message: "Id del carrito invalido" });
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: error.message });
  }
}
