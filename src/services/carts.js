
let id=1
function generarId(){
    return id++
}

export class Carts{
    
    
    constructor(){
        this.cID=generarId()
        this.productos=[]
        
    }


    sumarProductoAlArreglo(id)
        {       
                const productoCart=this.productos.find(element=>element.id === id)
             
               
                    if(productoCart)
                    {       
                            productoCart.quantity++
                            console.log(`Se Sumo +1 al producto ${id} en el Carro ${this.cID}`)
                    }
                        else
                        {  
                            const nuevoProductCart=
                            {
                             id: id
                            ,quantity:1
                            }
                            this.productos.push(nuevoProductCart)
                            console.log(`Se Agrego el producto ${id} en el Carro ${this.cID}`)
                        }
                        return (this.getArrayProductsCast())
           

    }

    asyncgetArrayProductsCast(){
        return [...this.productos]
    }
}



/*
const carts=new Carts()
const ca=new Carts()/*
carts.sumarProductoAlArreglo(1)
carts.sumarProductoAlArreglo(1)
carts.sumarProductoAlArreglo(1)
carts.sumarProductoAlArreglo(2)
carts.sumarProductoAlArreglo(2)
carts.sumarProductoAlArreglo(1)
ca.sumarProductoAlArreglo(1)
ca.sumarProductoAlArreglo(3)
ca.sumarProductoAlArreglo(2)
ca.sumarProductoAlArreglo(2)
console.log(carts.cID)
console.log(carts.getArrayProductsCast())
console.log(ca.cID)
console.log(ca.getArrayProductsCast())*/
