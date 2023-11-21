
import express from 'express'
import handlebars from 'express-handlebars'
import { webRouter } from './routers/web.Routers.js'
import { apiRouter } from './routers/api.Routers.js'


const app=express()
const PORT= 8080

//Motor de plantillas : Handlebars 
app.engine('handlebars',handlebars.engine())
app.set('views','./views')

//Middlewares necesarias
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('./public')) 
app.use(express.static('./views')) 
app.use('/static',express.static('./static'))


//Carga de Routers Api y Web
app.use('/api',apiRouter)
app.use('/',webRouter)

//Se pone a escuchar en el puerto
app.listen(PORT,()=>{
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