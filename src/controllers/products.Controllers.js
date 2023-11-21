import { managerProducts } from "../services/productManager.js"

// funciones GET constrollers de los productos



//getProductsController Devuelve la lista de los productos almacenados en la base de datos, si existe un limite en req.query.limit, devolvera solo los promeros limits del arreglo
 export async function getProductsController (req,res){
    const cantidad=parseInt(req.query.limit)
    const array= await managerProducts.getProducts()
    if(!cantidad){
        res.send(array)
    }else{
         array.slice(0 , cantidad)
         res.send( array.slice(0 , cantidad))
    }
    }

// Devuelve el producto con el ID especifico, en caso de no existir deuelve False
 export async function getProductsByIdController(req,res){
    const id=req.params.pid
    const productID=await managerProducts.getProductById(id)
    res.send(productID)
   }


export async function postAgregarProductController(req,res){
   res.send(`Producto Agregado Exitosamente`)

}

export async function actualizarProductoIdController(req,res){
  
   const objects=req.body
   const campos = Object.keys(objects)
   const valores= Object.values(objects);
   const id=req.params.pid
   
   for (let index = 0; index < campos.length; index++) {
         await managerProducts.updateProduct(id,campos[index],valores[index])
      }

   res.send(`El producto con ID ${id} fue actualizado`)
}

export async function eliminarProductoIdController(req,res){
   const id=req.params.pid
   await managerProducts.deleteProductByID(id)
   res.send(`${id} ya no esta en la lista`)
}








