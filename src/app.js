
import express from 'express'
import {productsRouter} from './routers/products.Router.js'
import { cartsRouter } from './routers/carts.Router.js'
 

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(productsRouter)
app.use(cartsRouter)




app.listen(8080,()=>{
    console.log('Conectado al puerto 8080');
})



































/*
app.get('/api/frase',(req,res)=>{
    res.send(fraseInicial.frase)

})

app.get('/api/palabras/:post',(req,res)=>{

    const newArray=fraseInicial.frase.split(" ")
    const posicion = parseInt(req.params.post);
    if (posicion >= 1 && posicion <= newArray.length ) {
        res.send(newArray[posicion-1] );
    } else {
        res.status(400).json({ error: 'Posición inválida' });
    }
})

app.post('/api/palabras',(req,res)=>{

    const nuevaPalabra=req.query.palabra;
    fraseInicial.frase =  fraseInicial.frase + ' ' + nuevaPalabra
    const arreglo=fraseInicial.frase.split(" ")
    const objDevolver={
        agregada : nuevaPalabra,
        posicion   : arreglo.length
    }
    
    res.json({ objDevolver})
})

app.put('/api/palabras/:post',(req,res)=>{ 

    const nuevaPalabra=req.query.palabra;
    const pos=parseInt(req.params.post)
    const arreglo=fraseInicial.frase.split(" ")
    const objDevolver={
        palabraNueva : nuevaPalabra
    }
 
  if (pos >= 1 && pos <= arreglo.length ) {
        objDevolver.palabraAnterior=arreglo[pos-1]
        arreglo[pos-1]=nuevaPalabra
    }else{
        res.status(400).json({ error: 'Posición inválida' });
    }

    fraseInicial.frase=arreglo.join(' ');
    console.log(fraseInicial.frase)
    res.send(objDevolver)

})

app.delete('/api/palabras/:post',(req,res)=>{  
    const pos=parseInt(req.params.post)
    const arreglo=fraseInicial.frase.split(" ")
    if (pos >= 1 && pos <= arreglo.length ) {
            arreglo.splice( (pos-1) , 1)
    }else{
        res.status(400).json({ error: 'Posición inválida' });
    }
    fraseInicial.frase = arreglo.join(' ')
    
    res.send(`Se elimino la frase en la posicion ${pos}`)
})

*/