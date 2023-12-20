const formReg = document.querySelector("#formRegister");
const enviarR = document.querySelector("#enviarRegistro");

formReg?.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/register", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // @ts-ignore
      body: new URLSearchParams(new FormData(formRegister)),
    });

    if (response.status == 201) {
      const usuario = await response.json();
      window.location.href = `/perfil`;
    }
    alert(response.message);
  } catch (error) {
    alert(error.message);
  }
});

function sendBody() {
  return {
    email: document.querySelector("#email").value,
    fist_name: document.querySelector("#first_name").value,
    last_name: document.querySelector("#last_name").value,
    age: parseInt(document.querySelector("#age").value),
    password: document.querySelector("#password").value,
  };
}
