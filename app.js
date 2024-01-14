const getNews = async function () {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=3ac5523d43eb420aa810389f8d45a190"
  );
  const data = await response.json();
  console.log(data);

  // document.querySelector(".images").innerHTML = data.articles
  // .map((el) => {
  //   if (!el.urlToImage) return;
  //   return ` <div class="card">
  //   <img class="card-img" src="${el.urlToImage}" alt="" />
  //   <div class="card-info">
  //     <p class="card-date">${el.publishedAt.slice(0, 10)}</p>
  //     <h1 class="card-title">${el.title}</h1>
  //     <p class="card-description">
  //     ${el?.content}
  //     </p>
  //     <p class="card-source">${el.source.name}</p>
  //     <button class="card-button">Check it out</button>
  //   </div>
  // </div>`;
  // })
  // .join("");
};

getNews();

const emailInput = document.querySelector(".email-input");

document.querySelectorAll("li").forEach((el) =>
  el.addEventListener("mouseover", function (e) {
    document.querySelectorAll("li").forEach((el) => (el.style.opacity = "0.5"));
    e.target.style.opacity = "1";
  })
);

document.querySelectorAll("li").forEach((el) =>
  el.addEventListener("mouseleave", function (e) {
    document.querySelectorAll("li").forEach((el) => (el.style.opacity = "1"));
  })
);

// const blurBackground = () => {
//   const elementsToBlur = document.querySelectorAll("body > *:not(.modal)");
//   elementsToBlur.forEach((element) => {
//     element.style.filter = "blur(5px)";
//   });
// };
// const unblurBackground = () => {
//   const elementsToUnblur = document.querySelectorAll("body > *:not(.modal)");
//   elementsToUnblur.forEach((element) => {
//     element.style.filter = "none";
//   });
// };

// document
//   .querySelector(".email-container")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     if (!emailInput.value) {
//       renderError("Input can't be empty.");

//       return;
//     }
//     if (!emailInput.value.endsWith("@gmail.com")) {
//       renderError("Input must end in @gmail.com.");

//       return;
//     }

//     if (emailInput.value.slice(0, -10).length < 5) {
//       renderError("Input must have more than 5 characters.");

//       return;
//     }
//     document.querySelector(".modal").style.height = "80svh";
//     document.querySelector(".modal").style.width = "40vw";
//     emailInput.value = "";
//     blurBackground();

//     document.addEventListener("click", function (e) {
//       if (e.target.closest(".modal")) return;
//       document.querySelector(".modal").style.height = "0svh";
//       document.querySelector(".modal").style.width = "0vw";
//       unblurBackground();
//     });
//   });

// let timeoutID;
// const renderError = function (text) {
//   clearTimeout(timeoutID);

//   document.querySelector(".invalid-container").classList.remove("hidden");
//   emailInput.style.border = "1px solid red";
//   document.querySelector(".invalid-input").innerHTML = `<p>${text}</p>`;

//   timeoutID = setTimeout(function () {
//     document.querySelector(".invalid-container").classList.add("hidden");
//     emailInput.style.border = "1px solid lime";
//   }, 1500);
// };
document.querySelectorAll(".animated").forEach((el) =>
  el.addEventListener("click", function (e) {
    if (
      e.target.parentElement.nextElementSibling.classList.contains("active")
    ) {
      e.target.parentElement.nextElementSibling.style.height = "0px";
      e.target.parentElement.nextElementSibling.style.color = "transparent";
      e.target.style.transform = "rotate(0deg)";

      e.target.parentElement.nextElementSibling.classList.remove("active");
      return;
    }
    document.querySelectorAll(".animated").forEach((el) => {
      console.log("thru");
      el.parentElement.nextElementSibling.classList.remove("active");
      el.parentElement.nextElementSibling.style.height = "0px";
      el.parentElement.nextElementSibling.style.color = "transparent";
      el.style.transform = "rotate(0deg)";

      e.target.parentElement.nextElementSibling.classList.add("active");

      e.target.parentElement.nextElementSibling.style.height = "30rem";
      e.target.parentElement.nextElementSibling.style.color = "black";
      e.target.style.transform = "rotate(180deg)";
    });
  })
);
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const mainPage = document.querySelector(".main-page");
const mainPageHeight = mainPage.getBoundingClientRect().height;
const headerHeight = header.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    console.log(5);
  } else {
    console.log(1);
    nav.classList.remove("sticky");
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${mainPageHeight - 2.2 * headerHeight}px`,
});
headerObserver.observe(header);
