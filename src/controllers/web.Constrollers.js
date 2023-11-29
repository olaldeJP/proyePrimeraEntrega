import { managerProducts } from "../services/productManager.js";

export async function realTimeProductsWeb(req, res) {
  res.status(200).render("realTimeProducts.handlebars", {
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

    res.status(200).render("home.handlebars", {
      titulo: "Home",
      hayProductos,
      arregloProduct,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
}
