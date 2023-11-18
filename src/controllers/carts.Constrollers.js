import { cartsManager } from "../services/cartsManager.js"




export async function crearNuevoCarts(req,res){
       try{ 
        const mensaje=cartsManager.createCarts()
        res.send(mensaje)}
        catch(error){
            throw error('Error al crear el nuevo carro')
        }
}

export async  function agregarProductosArregloCartsByCId(req,res){
    console.log(req.params.cid)
    console.log(req.params.pid)
    const cId= parseInt(req.params.cid)
    const pId=parseInt(req.params.pid)
    try{
       await cartsManager.addProductsCartsByCId(cId,pId)
        res.send(`El Producto ${pId} se agrego al carrito con id ${cId}`)
        }catch(error){
            throw error('Error al agregar el producto al ID')
        }
}

export async function mostrarListaDeProductosByCId(req,res){
    const cId=parseInt(req.params.cid)
    res.send(await cartsManager.getArraysByCId(cId))
}