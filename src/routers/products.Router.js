import { Router } from "express";
import { getProductsController , getProductsByIdController,eliminarProductoIdController,actualizarProductoIdController,postAgregarProductController} from "../controllers/products.Controllers.js";
import { validarCamposMiddleware } from "../middlewares/products.Middlewares.js";

export const  productsRouter = Router()

//Se agregan todos los Controllers de productos al router productsRouter

 productsRouter.get('/', getProductsController)
 productsRouter.get('/:pid', getProductsByIdController)
 productsRouter.post('/', validarCamposMiddleware , postAgregarProductController)
 productsRouter.put('/:pid',actualizarProductoIdController)
 productsRouter.delete('/:pid',eliminarProductoIdController)