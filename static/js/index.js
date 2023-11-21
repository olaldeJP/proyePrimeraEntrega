const formulario=document.querySelector("#formulario")

document.querySelector('#buttonFormulario').addEventListener("click",()=>{

fetch('/api/products/2',{
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // Puedes agregar otras cabeceras según sea necesario
    },
    body: JSON.stringify({
        title:'TFetch', 
        stock:2
    })
  }
)
})

