document.querySelector("login").addEventListener("click", async () => {
  const data = {
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  const opts = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  let response = await fetch("/api/session/login", opts);
  response = response.json();
  if (response.statusCode === 200) {
    location.replace('/')
  }
});
