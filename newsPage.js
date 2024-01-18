let Logged = JSON.parse(localStorage.getItem("logged")) || false;

if (!Logged) document.body.innerHTML = `<p>You are not logged in</p>`;
