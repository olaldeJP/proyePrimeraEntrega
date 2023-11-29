import { managerProducts } from "../services/productManager.js";

// funciones GET constrollers de los productos

//getProductsController Devuelve la lista de los productos almacenados en la base de datos, si existe un limite en req.query.limit, devolvera solo los promeros limits del arreglo
export async function getProductsController(req, res) {
  try {
    const cantidad = parseInt(req.query.limit);
    const array = await managerProducts.getProducts();
    if (!cantidad) {
      res.status(200).json(array);
    } else {
      array.slice(0, cantidad);
      res.status(200).json(array.slice(0, cantidad));
    }
  } catch (error) {
    res.status(400).json({
      status: "error en mostrar los productos",
      message: error.message,
    });
  }
}

// Devuelve el producto con el ID especifico, en caso de no existir deuelve False
export async function getProductsByIdController(req, res) {
  try {
    const id = req.params.pid;
    const productID = await managerProducts.getProductById(id);
    res.status(200).json(productID);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "error en mostrar el producto por ID ",
    });
  }
}

export async function postAgregarProductController(req, res) {
  try {
    res["sendProducts"]();
    res.status(201).json(res["productBody"]);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
}

export async function actualizarProductoIdController(req, res) {
  const objects = req.body;
  const campos = Object.keys(objects);
  const valores = Object.values(objects);
  const id = req.params.pid;
  try {
    for (let index = 0; index < campos.length; index++) {
      await managerProducts.updateProduct(id, campos[index], valores[index]);
    }

    res["sendProducts"]();
    res.status(201).json(await managerProducts.getProductById(id));
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: " Error al Actualizando producto",
    });
  }
}

export async function eliminarProductoIdController(req, res) {
  const id = req.params.pid;

  try {
    await managerProducts.deleteProductByID(id);
    res["sendProducts"]();
    res
      .status(201)
      .json({ status: "success", messagge: `${id} ya no esta en la lista` });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "error Eliminando producto",
    });
  }
}
