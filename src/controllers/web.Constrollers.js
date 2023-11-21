


 export async function formularioWeb(req,res){
    res.render('formulario.handlebars',
    {
        titulo:' Formulario'
    })
    }


export async function productosWeb(req,res){
  
   res.render('productos.handlebars',
   {
    hayProductos: true,
    productos:
    [
    {title:'a',description:'b'},
    {title:'a',description:'b'}
    ] 
    })
}