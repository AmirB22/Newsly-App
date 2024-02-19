const menuBtns = document.querySelectorAll("#menu ul li");

menuBtns.forEach((el) =>
  el.addEventListener("click", function (e) {
    menuBtns.forEach((el) => el.classList.remove("menu-clicked"));
    e.target.classList.add("menu-clicked");
  })
);
