const buttonProducts = document.querySelector("#buttonFormProducts");
const buttonCarts = document.querySelector("#buttonFormCarts");
const selectForm = document.querySelector("#optionSelect");
const formProduct = document.querySelector("#formularioProducts");
const formCarts = document.querySelector("#formularioCarts");
const divFormP = document.querySelector(".divFormProducts");
const divFormC = document.querySelector(".divFormCarts");
const divELements = document.querySelector(".boxElement");

const socket = io();

/* Evento donde , si hay cambios en el select de enviar peticiones (products o carts), mostrara su respectivo formulario */
selectForm.addEventListener("change", () => {
  if (selectForm.value === "carts") {
    divFormC.classList.remove("hidden");
    divFormP.classList.add("hidden");
  } else {
    divFormC.classList.add("hidden");
    divFormP.classList.remove("hidden");
  }
});

/* Evento donde se envian una peticion al servidor , este lo recibe y lo actualiza con el socket a todos  */

buttonProducts?.addEventListener("click", (event) => {
  event.preventDefault();

  socket.emit("peticionEnviada", () => {
    console.log("Peticion Enviada");
  });
  const idProduct = formProduct.idProduct.value;
  switch (formProduct.selectFormProducts.value) {
    case "POST":
      fetch("http://localhost:8080/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSONProductForm()),
      });
      break;
    case "GET":
      if (idProduct) {
        fetch(`http://localhost:8080/api/products/${idProduct}`)
          .then((res) => {
            return res.json();
          })
          .then((products) => {
            mostrarProductsEnPantalla(products);
          });
      } else {
        fetch(`http://localhost:8080/api/products`)
          .then((res) => {
            return res.json();
          })
          .then((products) => {
            mostrarProductsEnPantalla(products);
          });
      }
      break;

    case "DELETE":
      fetch(`http://localhost:8080/api/products/${idProduct}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      break;

    case "PUT":
      fetch(`http://localhost:8080/api/products/${idProduct}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(JSONProductForm()),
      });
      break;
    default:
      divELements.innerHTML = `ERROR EN LA PETICION`;
      break;
  }
  socket.emit("resetProduct", () => {});
  socket.on("sendProducts", (products) => {
    mostrarProductsEnPantalla(products);
  });
});

function mostrarProductsEnPantalla(products) {
  divELements.innerHTML = "";
  if (products) {
    if (Array.isArray(products)) {
      for (let index = 0; index < products.length; index++) {
        const nuevoElement = document.createElement("div");
        nuevoElement.classList.add("box");
        nuevoElement.innerHTML = `
        <p>ID: ${products[index].id}</p> 
        <p>TITULO: ${products[index].title}</p>
        <p>DESCRIPCION: ${products[index].description}</p>
        <p>PRECIO: ${products[index].price}</p>
        <p>STOCK: ${products[index].stock}</p> 
        <p>CODIGO: ${products[index].code}</p>`;
        divELements.appendChild(nuevoElement);
      }
    } else {
      const nuevoElement = document.createElement("div");
      nuevoElement.classList.add("box");
      nuevoElement.innerHTML = `
        <p>ID: ${products.id}</p> 
        <p>TITULO: ${products.title}</p>
        <p>DESCRIPCION: ${products.description}</p>
        <p>PRECIO: ${products.price}</p>
        <p>STOCK: ${products.stock}</p> 
        <p>CODIGO: ${products.code}</p>`;
      divELements.appendChild(nuevoElement);
    }
  } else {
    divELements.innerHTML = `INFORMACION NO VALIDA`;
  }
}

function JSONProductForm() {
  let productForm = {};
  if (formProduct.titulo.value) {
    productForm.title = formProduct.titulo.value;
  }
  if (formProduct.description.value) {
    productForm.description = formProduct.description.value;
  }
  if (formProduct.precio.value) {
    productForm.price = formProduct.precio.value;
  }
  if (formProduct.codigo.value) {
    productForm.code = formProduct.codigo.value;
  }
  if (formProduct.thumbnail.value) {
    productForm.thumbnail = formProduct.thumbnail.value;
  }
  if (formProduct.stock.value) {
    productForm.stock = formProduct.stock.value;
  }
  return productForm;
}
