import { error } from "console"
import { Carts } from "./carts.js"
import fs from 'fs'

 class CartsManager{

        #ruta
        #arrayCarts


        constructor(){

            this.#ruta=`../../dataBase/DataBaseCarts.json`
            this.#arrayCarts = []
            if(fs.existsSync(this.#ruta)){
                this.#arrayCarts=JSON.parse(fs.readFileSync(this.#ruta))
            }else{
                this.#arrayCarts=[]
                fs.writeFileSync(this.#ruta,JSON.stringify(this.#arrayCarts))
            
        }
    }


       async addProductsCartsByCId(cID,idProduct){
      
            for (let index = 0; index < this.#arrayCarts.length; index++) 
            {
              
                        if(this.#arrayCarts[index].cID==cID){
                            console.log('entro al If')
                            var cartPorID=this.#arrayCarts[index]
                            
                        console.log(cartPorID)
                            break
                        }
            }console.log(cartPorID)   
                if(cartPorID)
                {  
                    await this.sumarProductoAlArreglo(idProduct,cartPorID)
                    try{ 
                        await fs.promises.writeFile(this.#ruta,JSON.stringify(this.#arrayCarts))
                         }
                         catch(error)
                         {
                        console.log(error)
                        }   
                  
                }else
                {    
                     throw error ('ID INVALIDO')
                }
        
         }

    async sumarProductoAlArreglo(idProduct,cartPorID)
         {       
                 const productoCart=cartPorID.productos.find(element=>element.id === idProduct)
              
                
                     if(productoCart)
                     {       
                             productoCart.quantity++
                             console.log(`Se Sumo +1 al producto ${idProduct} en el Carro ${idProduct}`)
                     }
                         else
                         {  
                             const nuevoProductCart=
                             {
                              id: idProduct
                             ,quantity:1
                             }
                             cartPorID.productos.push(nuevoProductCart)
                             console.log(`Se Agrego el producto ${idProduct} en el Carro ${idProduct}`)
                         }
                        // return (this.getArrayProductsCast())
            
 
     }
        
        async createCarts()
        {
            const newCarts=new Carts()
            this.#arrayCarts.push(newCarts)
            await fs.promises.writeFile(this.#ruta,JSON.stringify(this.#arrayCarts))
            return `Nuevo Carts creado`
        }

            

       async getArrayCast()
        {
            return [...this.#arrayCarts]
        }



        async getArraysByCId(cID)
            {
            let cartPorID=this.#arrayCarts.find(element => element.cID === cID)
            if(cartPorID){
                    return [...cartPorID.productos]
            }
            else{
                throw error(' Carts ID INVALIDO')
            }
        }




    }
            
        
 
    
export const cartsManager=new CartsManager()



/*
 const cartM = new CartsManager()
await cartM.createCarts()
await cartM.createCarts()

await cartM.addProductsCartsByCId(1,1)
await cartM.addProductsCartsByCId(1,1)
await cartM.addProductsCartsByCId(2,2)

console.log(cartM.getArraysByCId(1))
*/