const formLogin = document.querySelector("#formulario");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/login/conect", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formLogin)),
    });
    console.log(response);
    formLogin.reset();
  } catch (error) {
    alert(error.message);
  }
});
