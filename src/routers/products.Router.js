import { Router } from "express";
import { getProductsController , getProductsByIdController,eliminarProductoIdController,actualizarProductoIdController,postAgregarProductController} from "../controllers/products.Controllers.js";
import { validarCamposMiddleware } from "../middlewares/products.Middlewares.js";

export const  productsRouter = Router()

// Se envia el arreglo con un limite indicado, en el caso que no venga ningun limite, envia el arreglo completo

 productsRouter.get('/api/products', getProductsController)
 productsRouter.get('/api/products/:pid', getProductsByIdController)
 productsRouter.post('/api/products', validarCamposMiddleware , postAgregarProductController)
 productsRouter.put('/api/:pid',actualizarProductoIdController)
 productsRouter.delete('/api/:pid',eliminarProductoIdController)