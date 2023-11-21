import { managerProducts } from "../services/productManager.js";


//Valida los campos de los productos enviados desde el body para luego enviarlos al controlador y agregarlos
export async function validarCamposMiddleware(req,res,next){
    const productoBody= req.body
  const esValido=await managerProducts.addProduct(productoBody)
    if(!esValido){ 
        throw error('Campos Invalidos')
    }else{
        next()
    }
}
