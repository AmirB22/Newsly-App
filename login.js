document.querySelector(".right").addEventListener("click", () => {
  document.querySelector(".sliding-container").style.transform =
    "translateX(0%)";
  document.querySelector(".sliding-container").style.borderTopLeftRadius =
    "15rem";
  document.querySelector(".sliding-container").style.borderBottomLeftRadius =
    "15rem";
  document.querySelector(".sliding-container").style.borderTopRightRadius =
    "0rem";
  document.querySelector(".sliding-container").style.borderBottomRightRadius =
    "0rem";
});

document.querySelector(".left").addEventListener("click", () => {
  document.querySelector(".sliding-container").style.transform =
    "translateX(-100%)";
  document.querySelector(".sliding-container").style.borderTopRightRadius =
    "15rem";
  document.querySelector(".sliding-container").style.borderBottomRightRadius =
    "15rem";
  document.querySelector(".sliding-container").style.borderTopLeftRadius =
    "0rem";
  document.querySelector(".sliding-container").style.borderBottomLeftRadius =
    "0rem";
});

document.querySelector(".log-sign-up").addEventListener("click", function () {
  document.querySelector(".sliding-container").style.transform =
    "translateX(-100%)";
  document.querySelector(".sliding-container").style.borderTopRightRadius =
    "15rem";
  document.querySelector(".sliding-container").style.borderBottomRightRadius =
    "15rem";
  document.querySelector(".sliding-container").style.borderTopLeftRadius =
    "0rem";
  document.querySelector(".sliding-container").style.borderBottomLeftRadius =
    "0rem";
});
