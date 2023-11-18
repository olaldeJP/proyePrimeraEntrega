import { managerProducts } from "../services/productManager.js";

export async function validarCamposMiddleware(req,res,next){
    req.query=producto1
    req.query.status = true
    const esValido=await managerProducts.addProduct(req.query)
    
    if(!esValido){ 
        throw error('Campos Invalidos')
    }else{

        next()
    }
}





const producto1=
{  
   title: "" ,
   description :'descsripcion2',
   price:48,
   code:12 ,
   thumbnail:'rout' ,
   stock:2
}
const producto2=
{  
   title: "segundo" ,
   description :'descsripcion2',
   price:98,
   code:9 ,
   thumbnail:'rout' ,
   stock:2
}
const producto3=
{  
   title: "tercero" ,
   description :'descsripcion3',
   price:4,
   code:129 ,
   thumbnail:'rout' ,
   stock:2
}