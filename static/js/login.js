const formLogin = document.querySelector("#formulario");

//Se envia la peticion POST con los datos del form para comprobar que exista en la base de datos, si existe, si redirecciona a / con el usuario cargado
formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formLogin)),
    });
    const res = await response.json(); // si el status es Success vuelve a / a ver los productos, sino envia una alert
    if (res.status === "success") {
      window.location.href = `/`;
    }
  } catch (error) {
    alert(error.message);
  }
});
