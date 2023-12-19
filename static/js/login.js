const formLogin = document.querySelector("#formulario");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formLogin)),
    });
    const r = await response.json();
    if (r.status === "success") {
      console.log("aaaaaaa");
      window.location = "/";
    }
    formLogin.reset();
  } catch (error) {
    alert(error.message);
  }
});
