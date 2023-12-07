import { cartsManager } from "../dao/services/cartsManager.js";
import { managerProducts } from "../dao/services/productManager.js";

//Constrollers de los Carts que se agregaran al Carts Router

export async function crearNuevoCarts(req, res) {
  try {
    const cartN = await cartsManager.createCarts();
    res.status(201).json(cartN);
  } catch (error) {
    res.status(400).json({
      status: "ERROR",
      mensaje: "Error en la solicitud de creacion de un nuevo carro",
    });
  }
}

export async function agregarProductosArregloCartsByCId(req, res) {
  const cId = req.params.cid;
  const pId = req.params.pid;
  try {
    const validarProducto = await managerProducts.getProductById(pId);
    if (validarProducto) {
      await cartsManager.addProductsCartsByCId(cId, pId);
      res.status(200).json({
        status: "success",
        mensaje: `El Producto ${pId} se agrego al carrito con id ${cId}`,
      });
    } else {
      res.status(400).json({
        status: "error",
        mensaje: "Error al agregar el producto , ID invalido",
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: "ERROR", mensaje: "Error al agregar el producto" });
  }
}

export async function mostrarListaDeProductosByCId(req, res) {
  try {
    const cId = req.params.cid;
    res.status(200).json(await cartsManager.getArraysByCId(cId));
  } catch (error) {
    res
      .status(400)
      .json({ status: "ERROR", mensaje: "Error en mostrar la lista " });
  }
}

export async function mostrarListaDeCarts(req, res) {
  try {
    res.status(200).json(await cartsManager.getArrayCast());
  } catch (error) {
    res.status(400).json({ status: "ERROR", message: "Error en la peticion" });
  }
}
