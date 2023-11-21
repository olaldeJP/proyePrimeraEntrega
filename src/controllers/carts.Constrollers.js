import { cartsManager } from "../services/cartsManager.js"


//Constrollers de los Carts que se agregaran al Carts Router



export async function crearNuevoCarts(req,res){
       try{ 
       const cartN = await cartsManager.createCarts()
       res.send(cartN)}
        catch(error){
            throw error('Error al crear el nuevo carro')
        }
}

export async  function agregarProductosArregloCartsByCId(req,res){

    const cId= req.params.cid
    const pId=req.params.pid
    try{
       await cartsManager.addProductsCartsByCId(cId,pId)
        res.send(`El Producto ${pId} se agrego al carrito con id ${cId}`)
        }catch(error){
            throw error('Error al agregar el producto al ID')
        }
}

export async function mostrarListaDeProductosByCId(req,res){
    const cId=req.params.cid
    res.send(await cartsManager.getArraysByCId(cId))
}