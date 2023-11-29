import { managerProducts } from "../services/productManager.js"





 export async function realTimeProductsWeb (req,res){
    res.render('realTimeProducts.handlebars',
    {
        titulo:' realTimeProductsWeb'
    })
    }

export async function homeWeb(req,res){
    let hayProductos
    const arregloProduct = await managerProducts.getProducts()

   if(arregloProduct.length > 0) 
        {
             hayProductos=true
        }else 
            {
             hayProductos=false
            }

   res.render('home.handlebars',
   { titulo:'Home',
    hayProductos,
    arregloProduct
    })
}