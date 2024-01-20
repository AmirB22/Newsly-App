let Logged = JSON.parse(localStorage.getItem("logged")) || false;

if (!Logged) document.body.innerHTML = `<p>You are not logged in</p>`;

document.querySelectorAll("li").forEach((el) => {
  el.classList.add("list-unclicked");
  el.addEventListener("click", function (e) {
    document.querySelectorAll("li").forEach((el) => {
      el.classList.add("list-unclicked");
      el.classList.remove("list-clicked");
    });
    e.target.classList.remove("list-unclicked");
    e.target.classList.add("list-clicked");

    document.querySelector(".page-title").textContent = e.target.textContent;
  });
});
