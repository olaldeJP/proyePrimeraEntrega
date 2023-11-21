import fs from 'fs'
import {Product} from './product.js'
import { error } from 'console'
import {v4 as uuidv4} from 'uuid';


  
class ProductManager {
    #ruta
    #arrayProcutos
 


    constructor()
    {   
        this.#ruta=`../../dataBase/DataBaseProducts.json`
        if(fs.existsSync(this.#ruta)){
            this.#arrayProcutos=JSON.parse(fs.readFileSync(this.#ruta))
        }else{
            this.#arrayProcutos=[]
            fs.writeFileSync(this.#ruta,JSON.stringify(this.#arrayProcutos))
        }
    }
    
    #validarCampos(product)
        {
            if(!product.title || !product.description || !product.price || !product.code  || !product.thumbnail || !product.stock || !(product.price>0)) {
                throw error('CAMPOS INVALIDOS')

            }else{
                return product
                    }
        } 
    #validarCodigo(codigo){
            
            const product=this.#arrayProcutos.find(product=> product.code === codigo)
        
            if ( product) { return false    }
           
            return true
    }
    
    async addProduct(newProduct)
        {     
                if(this.#validarCampos(newProduct)){
                    if(this.#validarCodigo(newProduct.code)){
                        newProduct.id=uuidv4();
                        this.#arrayProcutos.push(newProduct)
                
                         await fs.promises.writeFile(this.#ruta,JSON.stringify(this.#arrayProcutos,null,2))
                        console.log('Producto agregado exitosamennte')
                        return newProduct
                        
                    }else{
                        console.log('Ya existe un producto con el mismo codigo')
                        return false
                    }
                }
            
               
        }
          
    
            
    

    async getProducts(){

            return [...this.#arrayProcutos]

    }
    
    
    async getProductById(id){
        try{ 
            this.#arrayProcutos=JSON.parse(await fs.promises.readFile(this.#ruta,'utf-8'))}
        catch{
            throw new Error('OPERACION INVALIDA')
        }
        let producto=this.#arrayProcutos.find((product) => product.id === id);
        if(!producto){
            console.log('No se encontro el producto con el ID')
            return false
        }
        else{
            
            return producto
        }
    }
 
    async deleteProductByID(id) {
       
        
        const newArray=this.#arrayProcutos.filter(product => product.id !== id)
        this.#arrayProcutos=newArray
        await fs.promises.writeFile(this.#ruta,JSON.stringify(this.#arrayProcutos),null,2)
    }
    
    
    async updateProduct(id,campo,nuevoValor){

        
        if(this.#arrayProcutos && (campo==='title'|| campo==='description' ||  campo==='price' || campo==='code'  || campo==='thumbnail' || campo==='stock'))
        {  
            for (let i = 0 ; i < this.#arrayProcutos.length ; i++){
                 if(this.#arrayProcutos[i].id===id){
                this.#arrayProcutos[i][campo]=nuevoValor
                break
            }
        }
         try{
            await fs.promises.writeFile(this.#ruta, JSON.stringify(this.#arrayProcutos),null,2)
         }catch(error){
           
            throw new Error('OPERACION INVALIDA')
         }
     
    }
    


        }
}

export const managerProducts = new ProductManager() 


