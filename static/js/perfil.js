const formLogout = document.querySelector("form");

formLogout?.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const response = await fetch("/api/sessions/", {
      method: "DELETE",
    });
    if (response.status === 204) {
      window.location.href = "/login";
    } else {
      const error = await response.json();
      alert(error.message);
    }
  } catch (error) {
    alert(error.message);
  }
});
