const cerrarButton = document.querySelector("#inputCerrar");
const buttonLogin = document.querySelector("#buttonLogin");
const inputMail = document.querySelector("#inputEmail");
const inputPassw = document.querySelector("#inputPassword");
const buttonRegist = document.querySelector("#buttonRegister");
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
buttonLogin.addEventListener("click", () => {
  const eMail = inputMail.value;
  const passWord = inputPassw.value;
  inputPassw.value = "";
  inputMail.value = "";

  fetch(
    `http://localhost:8080/logginUsser/?usser=${eMail}&password=${passWord}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((usser) => {
      try {
        usuario = usser[0].usser;
        document.querySelector(".modal").classList.add("hidden");
      } catch (error) {
        alert("Los datos son invalidos");
      }
    });
});

//El boton Registrar envia el Email y la constraseña a la peticion usserRegister y lo guarda en la base de datos
buttonRegist.addEventListener("click", () => {
  const eMail = inputMail.value;
  const passWord = inputPassw.value;
  inputPassw.value = "";
  inputMail.value = "";
  fetch(`http://localhost:8080/usserRegister`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ usser: `${eMail}`, password: `${passWord}` }),
  })
    .then((res) => {
      return res.json();
    })
    .then((usser) => {
      try {
        alert("Registro Exitoso");
      } catch (error) {
        alert("Error al crear la cuenta");
      }
    });
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
