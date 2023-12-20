const cerrarButton = document.querySelector("#buttonCerrar");
const form = document.querySelector("#formulario");
const buttonLogin = document.querySelector("#buttonSubmit");
const buttonMessage = document.querySelector("#buttonMessage");
const mensajeI = document.querySelector("#inputMensaje");
const windowsChat = document.querySelector(".windowsMessages");
const socket = io();

let usuario;

//el boton cerrar de la ventana(modal) cierra la ventana,
cerrarButton.addEventListener("click", () => {
  document.querySelector(".modal").classList.add("hidden");
});

//Se envia el usuario y la contraseña a validar, si existe , cierra la venta y guarda el Email en la variable usuarios, sino tira una alerta
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const response = await fetch(`http://localhost:8080/api/sessions/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    // @ts-ignore
    body: new URLSearchParams(new FormData(form)),
  });
  const res = await response.json();
  console.log(response);
  console.log(res);

  if (res.status === "success") {
    window.location.href = "/chatHandlebars";
  }
});

//Evento para enviar el mensaje con el usuario a la peticion messagePost en webRouter
buttonMessage.addEventListener("click", () => {
  const message = inputMensaje.value;
  inputMensaje.value = "";
  if (message) {
    fetch(`http://localhost:8080/messagePost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ usser: `${usuario}`, message: `${message}` }),
    });
  }
});

//Socket para enviar los mensajes al windowsChat de chatHandlebars
socket.on("sendMessage", (messages) => {
  if (usuario) {
    if (messages) {
      windowsChat.innerHTML = "";
      for (let index = 0; index < messages.length; index++) {
        const mensaje = document.createElement("p");
        mensaje.innerHTML = `${messages[index].usser} :  ${messages[index].message} `;
        windowsChat.appendChild(mensaje);
      }
    }
  } else {
    alert("INGRESO DE USUARIO REQUERIDO");
  }
});
