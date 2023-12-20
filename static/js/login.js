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
    const res = await response.json();
    if (res.status === "success") {
      window.location.href = `/`;
    }
  } catch (error) {
    console.log(error.message);
  }
});
