import { arrayOfCities, arrayOfTopics, arrayOfSources } from "./data.js";

let Logged = JSON.parse(localStorage.getItem("logged")) || false;
let loggedInAs = JSON.parse(localStorage.getItem("loggedInAs")) || {};
let userAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
const CategoriesOriginal = [
  "Business",
  "Science",
  "Technology",
  "World",
  "Health",
  "Sports",
];
const images = {
  World:
    "https://lh3.ggpht.com/MMoPETUaDbUB1bO3KAi3cKQ_lzssju3VEp9ZPauGIamgSniMr4nV2SVkVvG-rKUJSLQJP84q7EA=s56-rw-p",
  Health:
    "https://lh3.ggpht.com/r4EKXwEo49BFQUa3OVZ8FC3j6teq_hUrmGcO4fI8BqoBgWSVJyu6D-vvXs9wGO7e_BKMbeqo4dk=s56-rw-p",
  Science:
    "https://lh3.ggpht.com/fJKuBX6iUFA_nPU2_2bIXcrTf3osSPhgBCL0sGqR2pZo-P6uZpiSmHW098W4I-CQHmsxZBd4=s56-rw-p",
  Sports:
    "https://lh3.ggpht.com/fJKuBX6iUFA_nPU2_2bIXcrTf3osSPhgBCL0sGqR2pZo-P6uZpiSmHW098W4I-CQHmsxZBd4=s56-rw-p",
  Entertainment:
    "https://lh3.ggpht.com/M-7V3aFj1BEw9EYBVHdLFmjCerci3j2MvsB43zu6-9iu-znG_WuOYrz5urJlStV5n59mW0WY5Q=s56-rw-p",
  Technology:
    "https://lh3.ggpht.com/0JsT7seg_L1MnpCuWZvJ6CJCHpkCawqEMdOr8Iw_NWjNUyTqWZJZNDbfa6kUGg-q1KN4FiUPaw=s56-rw-p",
  Business:
    "https://lh3.ggpht.com/A0UiqrMFOJnh5R_g7xhIrslGxotNEcyK5V15p5yJkUlrXMBGqGw3TkU0x06Yb0Q-72QXK9N9=s56-rw-p",
  "U.S.":
    "https://lh3.googleusercontent.com/proxy/4bKny4MdGPqmBQJQCme5SXcs3Idk0T26DpoDaDToXQmJpHssPJYZK-nnUigTPdUyxHjkh_zd22dsimWdR4wpWHj2fUTTzMMtHow650KJwvKo7Bq1lfLb8EICSOcPOFnnEGY9wbJXyhQXtK8oPIREwNYe3Ya3DbHkJhpoZMoxnKo8UHw=s56-rw-p",
};
const checkIfLoggedIn = function () {
  if (!Logged && userAccounts.length !== 0) {
    document.body.innerHTML = `<div class="not-logged-in-container"><img class="not-logged-image" src="inverted-logo.png"/><h1>You are not logged in</h1>
<a href="./login-page.html#login">  <button class="not-logged-log-in">Log in </button></a></div>`;
    document
      .querySelector(".not-logged-log-in")
      .addEventListener("mouseover", function (e) {
        e.target.classList.add("not-logged-log-in-hovered");
      });
    document
      .querySelector(".not-logged-log-in")
      .addEventListener("mouseleave", function (e) {
        e.target.classList.remove("not-logged-log-in-hovered");
      });
  } else if (!Logged && userAccounts.length === 0) {
    document.body.innerHTML = `<div class="not-logged-in-container"><img class="not-logged-image" src="inverted-logo.png"/><h1>You don't have an account yet</h1>
<a href="./login-page.html#signup">  <button class="not-logged-log-in">Create an account</button></a></div>`;
    document
      .querySelector(".not-logged-log-in")
      .addEventListener("mouseover", function (e) {
        e.target.classList.add("not-logged-log-in-hovered");
      });
    document
      .querySelector(".not-logged-log-in")
      .addEventListener("mouseleave", function (e) {
        e.target.classList.remove("not-logged-log-in-hovered");
      });
  }
};
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const getWeather = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=40af5230b1b9fa8b6a665dc853b4d7d7`
    );
    const weatherData = await response.json();
    if (!response.ok) throw new Error("Could not find the specified location.");
    document.querySelector(
      ".weather-link"
    ).href = `https://weather.com/weather/today/l/${weatherData.coord.lat},${weatherData.coord.lon}?par=google`;
    document.querySelector(
      ".weather-location"
    ).textContent = `${weatherData.name}`;
    document.querySelector(".weather-temperature").textContent = `${(
      weatherData.main.temp - 275.15
    ).toFixed(1)} C°`;
  } catch (err) {
    console.error(err);
  }
};
const getHomeHTML = function () {
  const firstContainerCategories = [
    "America",
    "Space",
    "World",
    "Iphone",
    "Gaming",
  ];
  const secondContainerCategories = [
    "Gym",
    "Biceps",
    "Crypto",
    "Money",
    "Virgin",
  ];
  const thirdContainerCategoriesLeft = ["Palestine", "Israel"];
  const thirdContainerCategoriesRight = ["War", "Ukraine"];
  const fifthContainerCategoriesLeft = ["Fact", "Fact check"];
  const fifthContainerCategoriesRight = ["Corrected", "Mistake"];
  const sixthContainerCategoriesLeft = ["Story", "Rizz", "Joke"];
  const sixthContainerCategoriesRight = ["Hookup", "Tinder", "Africa"];

  document.querySelector("#main").style.width = "120rem";
  document.querySelector("#main").innerHTML = `  <div class="page-top">
        <div class="page-top-left">
          <h2 class="page-title">Your briefing</h2>
          <p class="page-description">${days[new Date().getDay()]}, ${
    months[new Date().getMonth()]
  } ${new Date().getDate()}</p>
        </div>
        <div class="page-top-right">
          <div class="weather-search">
            <p class="weather-search-title">Look up weather somewhere else</p>
            <form class="weather-search-input-container">
              <button class="weather-search-button">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
              <input
                class="weather-search-input"
                type="text"
                placeholder="City / Country / Location"
                name=""
                id=""
              />
            </form>
          </div>
          <button class="weather-left-button">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <div>
            <img
              class="weather-image"
              src="https://static.vecteezy.com/system/resources/previews/012/494/174/original/sun-icon-in-bright-yellow-color-with-transparent-background-png.png"
              alt=""
            />
          </div>
          <div>
            <p class="weather-location">Novi Pazar</p>
            <h2 class="weather-temperature">-5C</h2>
            <a
              href="https://news.url.google.com/url?sa=j&url=https%3A%2F%2Fwww.weather.com%2Fwx%2Ftoday%2F%3Flat%3D43.14%26lon%3D20.52%26locale%3Den_US%26par%3Dgoogle&uct=1705710948&usg=qrKFzyNByx7NGcC-M30hdgVyZ8Q.&opi=116942117"
              class="weather-link"
              >More on weather.com</a
            >
          </div>
        </div>
      </div>
      <div class="first-second-container-wrapper">
        <div class="first-container">
        <div>
            <h1>Top stories <i class="fa-solid fa-angle-right"></i></h1>
           </div>  
        </div>
        <div class="second-container">
            <div class="right-side-title">
            <h1>Picks for you</h1>
            <p>?</p>
           
          </div>
          </div>
      </div>
      <div class="third-container">
        <h1 class="page-title">
          For you <i class="fa-solid fa-angle-right"></i>
        </h1>
        <p class="page-description">Recommended based on your interests</p>
        <div class="for-you-container">
            <div class="for-you-left-side">
            </div>
            <div class="for-you-right-side">
          </div>
        </div>
      </div>
      <div class="fourth-container">
        <h1 class="page-title">Your topics</h1>
        <p class="page-description">Recommended based on your interests</p>
        <div class="fourth-container-wrapper">
        </div>
      </div>
      <div class="fifth-container">
        <h1 class="page-title">Fact check</h1>
        <p class="page-description">From independent sources</p>
          <div class="for-you-container">
            <div class="for-you-left-side" data-foryouleft="2">
            </div>
            <div class="for-you-right-side" data-foryouright="2">
          </div>
        </div>
        <div class="sixth-container">
        <h1 class="page-title">Beyond the front page</h1>
        <p class="page-description">Notable stories and conversation starters</p>
          <div class="for-you-container">
            <div class="for-you-left-side" data-foryouleft="3">
            </div>
            <div class="for-you-right-side" data-foryouright="3">
          </div>
        </div>
      </div>`;
  getWeather("Novi Pazar");

  document
    .querySelector(".weather-left-button")
    .addEventListener("click", function () {
      document
        .querySelector(".weather-search")
        .classList.toggle("weather-search-active");
      if (
        document
          .querySelector(".weather-search")
          .classList.contains("weather-search-active")
      )
        document.querySelector(".fa-chevron-left").style.transform =
          "rotate(180deg)";
      else
        document.querySelector(".fa-chevron-left").style.transform =
          "rotate(0deg)";
    });
  document
    .querySelector(".weather-search-input-container")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const input = document.querySelector(".weather-search-input");
      if (!input.value) return;
      getWeather(input.value);
      document
        .querySelector(".weather-search")
        .classList.remove("weather-search-active");
      document.querySelector(".fa-chevron-left").style.transform =
        "rotate(0deg)";
      input.value = "";
    });

  changeContainerHTML(
    firstContainerCategories[randomNumber(0, 4)],
    15,
    "first-container"
  );
  changeContainerHTML(
    secondContainerCategories[randomNumber(0, 4)],
    3,
    "second-container"
  );
  changeContainerHTML(
    thirdContainerCategoriesLeft[randomNumber(0, 1)],
    1000,
    "third-container",
    "left"
  );
  changeContainerHTML(
    thirdContainerCategoriesRight[randomNumber(0, 1)],
    1000,
    "third-container",
    "right"
  );
  getFourthContainerHTML();
  changeContainerHTML(
    fifthContainerCategoriesLeft[randomNumber(0, 2)],
    1000,
    "fifth-container",
    "left"
  );
  changeContainerHTML(
    fifthContainerCategoriesRight[randomNumber(0, 2)],
    1000,
    "fifth-container",
    "right"
  );
  changeContainerHTML(
    sixthContainerCategoriesLeft[randomNumber(0, 2)],
    1000,
    "sixth-container",
    "left"
  );
  changeContainerHTML(
    sixthContainerCategoriesRight[randomNumber(0, 2)],
    1000,
    "sixth-container",
    "right"
  );
};
let date;
let milliseconds;
let when;
let since;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
document.querySelector(".profile-picture-container").innerHTML = `  <img
                class="profile-picture"
                src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                alt="User's profile picture"
              />
              <div class="account-preview">
                <div class="top-account-section">
                  <img
                    class="profile-picture"
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"
                    alt="User's profile picture"
                  />
                  <h2>${loggedInAs.username}</h2>
                </div>
                <div class="mid-account-section">
                  <p>Email: <span>${loggedInAs.email}</span></p>
                  <p>Level: <span>0</span></p>
                  <p>Joined: <span>${loggedInAs.joined}</span></p>
                </div>
                <div class="settings">
                  <p>User settings</p>
                  <p>Preferences</p>
                  <p>Bookmarks</p>
                </div>
                <button class="log-out">Log out</button>
              </div>`;

document.querySelector(".log-out").addEventListener("click", function () {
  let LoggedIn = false;
  loggedInAs = {};
  localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
  localStorage.setItem("logged", JSON.stringify(LoggedIn));
  Logged = JSON.parse(localStorage.getItem("logged")) || false;
  checkIfLoggedIn();
});
// document
//   .querySelector(".weather-left-button")
//   .addEventListener("click", function () {
//     document
//       .querySelector(".weather-search")
//       .classList.toggle("weather-search-active");
//     if (
//       document
//         .querySelector(".weather-search")
//         .classList.contains("weather-search-active")
//     )
//       document.querySelector(".fa-chevron-left").style.transform =
//         "rotate(180deg)";
//     else
//       document.querySelector(".fa-chevron-left").style.transform =
//         "rotate(0deg)";
//   });

// document
//   .querySelector(".weather-search-input-container")
//   .addEventListener("submit", function (e) {
//     e.preventDefault();
//     const input = document.querySelector(".weather-search-input");
//     if (!input.value) return;
//     getWeather(input.value);
//     document
//       .querySelector(".weather-search")
//       .classList.remove("weather-search-active");
//     document.querySelector(".fa-chevron-left").style.transform = "rotate(0deg)";
//     input.value = "";
//   });
document.querySelectorAll("li").forEach((el) => {
  el.classList.add("list-unclicked");
  el.classList.add("list-button-list");
  el.addEventListener("click", function (e) {
    document.querySelectorAll("li").forEach((el) => {
      el.classList.add("list-unclicked");
      el.classList.remove("list-clicked");
    });
    e.target.classList.remove("list-unclicked");
    e.target.classList.add("list-clicked");

    // document.querySelector(".page-title").textContent = e.target.textContent;
    if (e.target.textContent === "Home") {
      getHomeHTML();
      return;
    }
    if (e.target.textContent === "Following") {
      firstPageOfFollowing();
      return;
    }

    if (e.target.textContent === "For you") {
      getForYouContainerHTML();
      return;
    }
    getNewsFromList(`${e.target.textContent}`);
  });
});
const search = document.querySelector(".search-input");
document
  .querySelector(".search-container")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    getNewsFromInput(search.value);
  });
const showProfilePreview = function () {
  document.querySelector(".account-preview").style.height = "30rem";
  document.querySelector(".account-preview").style.padding = "3rem 1rem";
  document.querySelector(".account-preview").style.bottom = "-36rem";
  document.querySelector(".account-preview").style.boxShadow =
    "0px 10px 10px rgba(0, 0, 0, 0.3)";
};
const hideProfilePreview = function () {
  document.querySelector(".account-preview").style.height = "0rem";
  document.querySelector(".account-preview").style.padding = "0rem 1rem";
  document.querySelector(".account-preview").style.bottom = "-0rem";
  document.querySelector(".account-preview").style.boxShadow = "none";
};
const profilePicture = document.querySelector(".profile-picture");
profilePicture.addEventListener("click", showProfilePreview);

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("log-out")) return;
  if (
    e.target.closest(".account-preview") ||
    e.target.closest(".profile-picture")
  )
    return;
  else hideProfilePreview();
});
document
  .querySelector(".logo-container-title")
  .addEventListener("click", (e) => {
    document.querySelectorAll("li").forEach((el) => {
      el.classList.replace("list-clicked", "list-unclicked");
      if (el.textContent === "Home") el.classList.add("list-clicked");
    });
    getHomeHTML();
  });
const randomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const getHTML = function (data, limit = 1000) {
  document.querySelector(
    ".first-container"
  ).innerHTML = ` <i class="fa-solid fa-rotate-right"></i>`;
  document.querySelectorAll(".fa-rotate-right").forEach((el) => el.remove());
  for (let i = 0; i < data.articles.length; i) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    since = new Date().getTime() - +milliseconds;
    if (since < 86_400_000) when = `${since / 24 / 1000000} hours ago`;
    else if (since < 2 * 86_400_000) when = "Yesterday";
    else if (since < 7 * 86_400_000) when = "Last week";
    else when = "While ago...";
    if (i === limit || i === limit + 1 || i === limit + 2 || i === limit + 3)
      break;

    if (i + 4 > data.articles.length) break;
    if (data.articles[i].content === "[Removed]") {
      i++;
      continue;
    }

    // if (i === 20 || i === 21 || i === 22 || i === 23) break;
    if (data.articles[i].urlToImage) {
      document.querySelector(
        ".first-container"
      ).innerHTML += `  <div class="second-news big-news">
      <a class="main-news-link" href="${
        data.articles[i].url
      }"> <div class="main-news">
            <img
              class="main-news-image"
              src="${data.articles[i].urlToImage}"
              alt=""
            />
            <div class="logo">
           
              <p>${data.articles[i].source.name}</p>
            </div>
            <h3 class="main-news-title">
             ${data.articles[i].title}
            </h3>
            <span class="date-author">${when} · ${
        data.articles[i]?.author ?? ""
      }</span>
          </div> </a>
          <div class="on-the-side-news" data-side="${i}">
            </div>
        </div>`;
      for (let j = i + 1; j < i + 4; j++) {
        if (data.articles[j].content === "[Removed]") continue;

        document.querySelector(`[data-side="${i}"]`).innerHTML += `
            <a class="on-the-side-news-link" href="${
              data.articles[j].url
            }"><div class="on-the-side-new">
              <div class="logo">
              
                <p>${data.articles[j]?.source.name}</p>
              </div>
              <p class="on-the-side-title">
                ${data.articles[j].title}
              </p>
              <span class="date-author-side"
                >${when}· ${data.articles[j].author ?? ""}</i
              ></span>
            </div></a>`;
      }
      i += 4;
    } else {
      document.querySelector(".first-container").innerHTML += `
       <div class="first-news small-news-container">
       <a href="${data.articles[i].url}">
          <div class="small-news">
            <div>
              <div class="logo">
             
                <p>${data.articles[i]?.source.name}</p>
              </div>
              <h3 class="small-news-title">
               ${data.articles[i].title}
              </h3>
            </div>
            <span class="date-author">${when} · ${
        data.articles[i].author ?? ""
      }</span>
          </div>
          <div class="small-news-image">
          </div></a>
        </div>`;
      i++;
    }
  }
};
const getNewsFromInput = async function (input) {
  document.querySelector("#main").style.width = "110rem";
  document
    .querySelectorAll(".list-button-list")
    .forEach((el) => el.classList.replace("list-clicked", "list-unclicked"));
  try {
    console.log(input);
    if (
      input.toLowerCase() === "business" ||
      input.toLowerCase() === "world" ||
      input.toLowerCase() === "entertainment" ||
      input.toLowerCase() === "science" ||
      input.toLowerCase() === "health" ||
      input.toLowerCase() === "sports" ||
      input.toLowerCase() === "technology" ||
      input.toLowerCase() === "u.s."
    ) {
      getNewsFromList(`${input[0].toUpperCase() + input.slice(1)}`);
      return;
    }
    let city, topic, source;
    if (
      input.length >= 3 &&
      arrayOfCities.some((el) =>
        el.toLowerCase().startsWith(`${input.toLowerCase()}`)
      )
    ) {
      arrayOfCities.forEach((el) => {
        if (el.toLowerCase().startsWith(`${input.toLowerCase()}`)) {
          city = el;
          return;
        }
      });
      document.querySelector("#main").innerHTML = `
          <div class="first-second-container-wrapper lts-wrapper-container">
        <div class="first-container lts-container-first"></div>
        <div class="second-container lts-container-second">
          <div class="lts-container">
            <i class="fa-solid fa-location-dot lts-icon"></i>
            <div class="lts-info-container">
              <h2>${city}</h2>
              <p>Location</p>
            </div>
          </div>
          <button class="list-follow not-following">
            <i class="fa-regular fa-star"></i> Follow
          </button>
        </div>
      </div> `;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${city}&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
      );
      console.log("input", response);

      const data = await response.json();

      if (
        loggedInAs.followedLocation &&
        loggedInAs.followedLocation.includes(`${city}`)
      ) {
        document.querySelector(
          ".list-follow"
        ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
        document
          .querySelector(".list-follow")
          .classList.replace("not-following", "following");
      }
      document
        .querySelector(".list-follow")
        .addEventListener("click", function (e) {
          if (
            document.querySelector(".fa-star").classList.contains("fa-regular")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
            document
              .querySelector(".list-follow")
              .classList.replace("not-following", "following");
            loggedInAs.followedLocation
              ? loggedInAs.followedLocation.push(`${city}`)
              : (loggedInAs.followedLocation = [`${city}`]);
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 255, 0.5)";

            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.followedLocation = loggedInAs.followedLocation;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          } else if (
            document.querySelector(".fa-star").classList.contains("fa-solid")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-regular fa-star"></i> Follow`;
            document
              .querySelector(".list-follow")
              .classList.replace("following", "not-following");
            loggedInAs.followedLocation.splice(
              loggedInAs.followedLocation.indexOf(`${city}`),
              1
            );
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 0, 0.5)";
            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.followedLocation = loggedInAs.followedLocation;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          }
        });

      if (data.message && data?.message.startsWith("You have made too many"))
        throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>You have reached the request limit!</h1> 
      <p>Try searching up something a little later!</p></div></div>`);
      if (!response.ok)
        throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>Oops! We were unable to find any news</h1> 
      <p>Try searching up something else!</p></div>
      </div>`);

      getHTML(data);
      return;
    }
    if (
      input.length >= 1 &&
      arrayOfSources.some((el) =>
        el.toLowerCase().startsWith(`${input.toLowerCase()}`)
      )
    ) {
      arrayOfSources.forEach((el) => {
        if (el.toLowerCase().startsWith(`${input.toLowerCase()}`)) {
          source = el;
          return;
        }
      });
      document.querySelector("#main").innerHTML = `
        <div class="first-second-container-wrapper lts-wrapper-container">
        <div class="first-container lts-container-first"></div>
        <div class="second-container lts-container-second">
          <div class="lts-container">
            <i class="fa-solid fa-hashtag lts-icon"></i>
            <div class="lts-info-container">
              <h2>${source}</h2>
              <p>Source</p>
            </div>
          </div>
          <button class="list-follow not-following">
            <i class="fa-regular fa-star"></i> Follow
          </button>
        </div>
      </div> `;
      const response = await fetch(
        `
https://newsapi.org/v2/everything?domains=${source}&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
      );
      console.log("input", response);

      const data = await response.json();

      if (
        loggedInAs.followedSources &&
        loggedInAs.followedSources.includes(`${source}`)
      ) {
        document.querySelector(
          ".list-follow"
        ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
        document
          .querySelector(".list-follow")
          .classList.replace("not-following", "following");
      }
      document
        .querySelector(".list-follow")
        .addEventListener("click", function (e) {
          if (
            document.querySelector(".fa-star").classList.contains("fa-regular")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
            document
              .querySelector(".list-follow")
              .classList.replace("not-following", "following");
            loggedInAs.followedSources
              ? loggedInAs.followedSources.push(`${source}`)
              : (loggedInAs.followedSources = [`${source}`]);
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 255, 0.5)";

            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.followedSources = loggedInAs.followedSources;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          } else if (
            document.querySelector(".fa-star").classList.contains("fa-solid")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-regular fa-star"></i> Follow`;
            document
              .querySelector(".list-follow")
              .classList.replace("following", "not-following");
            loggedInAs.followedSources.splice(
              loggedInAs.followedSources.indexOf(`${source}`),
              1
            );
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 0, 0.5)";
            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.followedSources = loggedInAs.followedSources;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          }
        });

      if (data.message && data?.message.startsWith("You have made too many"))
        throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>You have reached the request limit!</h1> 
      <p>Try searching up something a little later!</p></div></div>`);
      if (!response.ok)
        throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>Oops! We were unable to find any news</h1> 
      <p>Try searching up something else!</p></div>
      </div>`);

      getHTML(data);
      return;
    }
    if (
      input.length >= 1 &&
      arrayOfTopics.some((el) =>
        el.toLowerCase().startsWith(`${input.toLowerCase()}`)
      )
    ) {
      arrayOfTopics.forEach((el) => {
        if (el.toLowerCase().startsWith(`${input.toLowerCase()}`)) {
          topic = el;
          return;
        }
      });
      document.querySelector("#main").innerHTML = `
        <div class="first-second-container-wrapper lts-wrapper-container">
        <div class="first-container lts-container-first"></div>
        <div class="second-container lts-container-second">
          <div class="lts-container">
            <i class="fa-solid fa-comments lts-icon"></i>
            <div class="lts-info-container">
              <h2>${topic}</h2>
              <p>Topic</p>
            </div>
          </div>
          <button class="list-follow not-following">
            <i class="fa-regular fa-star"></i> Follow
          </button>
        </div>
      </div> `;
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
      );
      console.log("input", response);

      const data = await response.json();

      if (loggedInAs.following && loggedInAs.following.includes(`${topic}`)) {
        document.querySelector(
          ".list-follow"
        ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
        document
          .querySelector(".list-follow")
          .classList.replace("not-following", "following");
      }
      document
        .querySelector(".list-follow")
        .addEventListener("click", function (e) {
          if (
            document.querySelector(".fa-star").classList.contains("fa-regular")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
            document
              .querySelector(".list-follow")
              .classList.replace("not-following", "following");
            loggedInAs.following
              ? loggedInAs.following.push(`${topic}`)
              : (loggedInAs.following = [`${topic}`]);
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 255, 0.5)";

            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.following = loggedInAs.following;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          } else if (
            document.querySelector(".fa-star").classList.contains("fa-solid")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-regular fa-star"></i> Follow`;
            document
              .querySelector(".list-follow")
              .classList.replace("following", "not-following");
            loggedInAs.following.splice(
              loggedInAs.following.indexOf(`${topic}`),
              1
            );
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 0, 0.5)";
            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.following = loggedInAs.following;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          }
        });

      if (data.message && data?.message.startsWith("You have made too many"))
        throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>You have reached the request limit!</h1> 
      <p>Try searching up something a little later!</p></div></div>`);
      if (!response.ok)
        throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>Oops! We were unable to find any news</h1> 
      <p>Try searching up something else!</p></div>
      </div>`);

      getHTML(data);
      return;
    }

    document.querySelector("#main").innerHTML = `
      <div class="first-second-container-wrapper lts-wrapper-container">
        <div class="first-container lts-container-first"></div>
        <div class="second-container lts-container-second">
          <div class="lts-container">
            <i class="fa-solid fa-magnifying-glass lts-icon"></i>
            <div class="lts-info-container">
              <h2>${input}</h2>
              <p>Search</p>
            </div>
          </div>
          <button class="list-follow not-following">
            <i class="fa-regular fa-star"></i> Follow
          </button>
        </div>
      </div> `;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
    );
    console.log("input", response);

    const data = await response.json();

    if (
      loggedInAs.followedSearches &&
      loggedInAs.followedSearches.includes(`${input}`)
    ) {
      document.querySelector(
        ".list-follow"
      ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
      document
        .querySelector(".list-follow")
        .classList.replace("not-following", "following");
    }
    document
      .querySelector(".list-follow")
      .addEventListener("click", function (e) {
        if (
          document.querySelector(".fa-star").classList.contains("fa-regular")
        ) {
          document.querySelector(
            ".list-follow"
          ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
          document
            .querySelector(".list-follow")
            .classList.replace("not-following", "following");
          loggedInAs.followedSearches
            ? loggedInAs.followedSearches.push(`${input}`)
            : (loggedInAs.followedSearches = [`${input}`]);
          document.querySelector(".list-follow").style.backgroundColor =
            "rgba(0, 0, 255, 0.5)";

          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSearches = loggedInAs.followedSearches;
            }
          });

          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        } else if (
          document.querySelector(".fa-star").classList.contains("fa-solid")
        ) {
          document.querySelector(
            ".list-follow"
          ).innerHTML = ` <i class="fa-regular fa-star"></i> Follow`;
          document
            .querySelector(".list-follow")
            .classList.replace("following", "not-following");
          loggedInAs.followedSearches.splice(
            loggedInAs.followedSearches.indexOf(`${input}`),
            1
          );
          document.querySelector(".list-follow").style.backgroundColor =
            "rgba(0, 0, 0, 0.5)";
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSearches = loggedInAs.followedSearches;
            }
          });

          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        }
      });

    if (data.message && data?.message.startsWith("You have made too many"))
      throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>You have reached the request limit!</h1> 
      <p>Try searching up something a little later!</p></div></div>`);
    if (!response.ok)
      throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>Oops! We were unable to find any news</h1> 
      <p>Try searching up something else!</p></div>
      </div>`);

    getHTML(data);
  } catch (err) {
    document.querySelector(".first-container").innerHTML = `${err.message}`;
  }
};
const getNewsFromList = async function (clicked) {
  try {
    const Technology = [
      "Mobile",
      "Gadgets",
      "Internet",
      "Virtual Reality",
      "Artificial Intelligence",
      "Computing",
    ];
    const Entertainment = [
      "Movies",
      "Music",
      "TV",
      "Books",
      "Arts & design",
      "Celebrities",
    ];
    const Sports = [
      "NFL",
      "NBA",
      "MLB",
      "NHL",
      "NCAA Football",
      "NCAA Basketball",
      "Soccer",
      "NASCAR",
      "Golf",
      "Tennis",
      "WNBA",
    ];
    const Science = ["Environment", "Space", "Physics", "Genetics", "Wildfire"];
    const Health = [
      "Medication",
      "Health care",
      "Mental health",
      "Nutrition",
      "Fitness",
    ];
    const Business = [
      "Economy",
      "Markets",
      "Jobs",
      "Personal influence",
      "Entrepreneurship",
    ];
    let array;
    if (clicked === "Business") array = Business;
    if (clicked === "Health") array = Health;
    if (clicked === "Technology") array = Technology;
    if (clicked === "Sports") array = Sports;
    if (clicked === "Science") array = Science;
    if (clicked === "Entertainment") array = Entertainment;

    document.querySelectorAll(".list-button-list").forEach((el) => {
      el.classList.remove("list-clicked");
      if (el.textContent.trim() === clicked) el.classList.add("list-clicked");
    });

    document.querySelector("#main").style.width = "85rem";
    document.querySelector("#main").innerHTML = `
        <div class="page-top-submain-news">
       <div class="page-top-submain-news-top">
          <h2 class="page-title">
           ${
             clicked === "Local"
               ? ""
               : `<img class="${clicked} list-icons" src="${images[clicked]}" />`
           }${clicked === "Local" ? "Your local news" : `${clicked}`}
          </h2>
          ${
            clicked === "Local"
              ? ""
              : `<button class="list-follow not-following">
            <i class="fa-regular fa-star"></i> Follow
          </button>`
          }
        </div>
        <div class="page-top-submain-news-bottom">
       ${
         clicked !== "World" &&
         clicked !== "Local" &&
         clicked !== "U.S." &&
         clicked !== "U.s."
           ? ` <button class="button-clicked button-list">Latest</button>
          ${array
            .map(
              (el) =>
                `<button class="button-unclicked button-list">${el}</button>`
            )
            .join("")}`
           : ""
       }
        </div>
      </div>
      <div class="first-container"></div>`;
    if (
      clicked !== "Local" &&
      loggedInAs.following &&
      loggedInAs.following.includes(`${clicked}`)
    ) {
      document.querySelector(
        ".list-follow"
      ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
      document
        .querySelector(".list-follow")
        .classList.replace("not-following", "following");
    }
    if (clicked !== "Local") {
      document
        .querySelector(".list-follow")
        .addEventListener("click", function (e) {
          if (
            document.querySelector(".fa-star").classList.contains("fa-regular")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-solid fa-star"></i> Following`;
            document
              .querySelector(".list-follow")
              .classList.replace("not-following", "following");
            loggedInAs.following
              ? loggedInAs.following.push(`${clicked}`)
              : (loggedInAs.following = [`${clicked}`]);
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 255, 0.5)";

            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.following = loggedInAs.following;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          } else if (
            document.querySelector(".fa-star").classList.contains("fa-solid")
          ) {
            document.querySelector(
              ".list-follow"
            ).innerHTML = ` <i class="fa-regular fa-star"></i> Follow`;
            document
              .querySelector(".list-follow")
              .classList.replace("following", "not-following");
            loggedInAs.following.splice(
              loggedInAs.following.indexOf(`${clicked}`),
              1
            );
            document.querySelector(".list-follow").style.backgroundColor =
              "rgba(0, 0, 0, 0.5)";
            localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
            loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
            userAccounts.forEach((el) => {
              if (loggedInAs.username === el.username) {
                el.following = loggedInAs.following;
              }
            });

            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          }
        });
    }
    if (clicked !== "Local") {
      document.querySelector(
        ".first-container"
      ).innerHTML = ` <i class="fa-solid fa-rotate-right"></i>`;
      document.querySelectorAll(".button-list").forEach((el) =>
        el.addEventListener("click", function (e) {
          let clicked;
          if (e.target.textContent === "Latest")
            clicked = document.querySelector(".page-title").textContent;
          else clicked = e.target.textContent;
          changeContainerHTML(`${clicked}`, 1000, "first-container");
        })
      );
    }
    document.querySelector(".first-container").style.width = "82rem";

    document.querySelectorAll(".button-list").forEach((el) =>
      el.addEventListener("click", function (e) {
        document.querySelectorAll(".button-clicked").forEach((el) => {
          el.classList.remove("button-clicked");
          el.classList.add("button-unclicked");
        });
        e.target.classList.add("button-clicked");
        e.target.classList.remove("button-unclicked");
      })
    );
    let differentClicked = undefined;
    if (clicked === "U.S.") differentClicked = "us";
    if (clicked === "Local") differentClicked = "serbia";

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${
        differentClicked ? differentClicked : clicked
      }&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
    );
    console.log("list", response);

    const data = await response.json();

    if (data.message && data?.message.startsWith("You have made too many"))
      throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>You have reached the request limit!</h1> 
      <p>Try searching up something a little later!</p></div></div>`);

    if (!response.ok)
      throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>Oops! We were unable to find any news</h1> 
      <p>Try searching up something else!</p></div>
      </div>`);

    getHTML(data);
  } catch (err) {
    document.querySelector(".first-container").innerHTML = `${err.message}`;
  }
};
const changeContainerHTML = async function (input, limit, type, side = "") {
  try {
    document.querySelector(
      ".first-container"
    ).innerHTML += ` <i class="fa-solid fa-rotate-right"></i>`;
    if (document.querySelector(".second-container")) {
      document.querySelector(
        ".second-container"
      ).innerHTML += ` <i class="fa-solid fa-rotate-right"></i>`;
    }
    if (document.querySelector(".for-you-container")) {
      document
        .querySelectorAll(".for-you-left-side")
        .forEach(
          (el) => (el.innerHTML = ` <i class="fa-solid fa-rotate-right"></i>`)
        );
      document
        .querySelectorAll(".for-you-right-side")
        .forEach(
          (el) => (el.innerHTML = ` <i class="fa-solid fa-rotate-right"></i>`)
        );
    }

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
    );
    const newsData = await response.json();

    console.log("container", response);

    if (
      newsData.message &&
      newsData?.message.startsWith("You have made too many")
    )
      throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>You have reached the request limit!</h1> 
      <p>Try searching up something a little later!</p></div></div>`);

    if (!response.ok)
      throw new Error(`<div class="no-search-results"><div> <img src="final-logo.png"/></div>
    <div>
    <h1>Oops! We were unable to find any news</h1> 
      <p>Try searching up something else!</p></div>
      </div>`);

    if (type === "first-container") getHTML(newsData, limit);
    if (type === "second-container") getSecondContainerHTML(newsData);
    if (type === "third-container") getThirdContainerHTML(newsData, side);
    if (type === "fifth-container") getFifthContainerHTML(newsData, side);
    if (type === "sixth-container") getSixthContainerHTML(newsData, side);
  } catch (err) {
    document.querySelector(".first-container").innerHTML = `${err.message}`;
  }
};
const getSecondContainerHTML = function (data) {
  const array = [2, 3, 4];

  for (let i = 0; i < array[Math.floor(Math.random() * 2)]; i++) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    since = new Date().getTime() - +milliseconds;
    if (since < 86_400_000) when = `${since / 24} hours ago`;
    else if (since < 2 * 86_400_000) when = "Yesterday";
    else if (since < 7 * 86_400_000) when = "Last week";
    else when = "While ago...";
    document.querySelector(".second-container").innerHTML += `   <a href="${
      data.articles[i].url
    }">  <div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">${data.articles[i].source.name}</p>
              <h2 class="right-side-card-title">
               ${data.articles[i].title}
              </h2>
              <p class="date-author-side">${when} · ${
      data.articles[i].author ?? ""
    }</p>
            </div>
            <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="${data.articles[i].urlToImage}"
                alt=""
              />
            </div>
          </div></a>`;
  }
};
const getThirdContainerHTML = function (data, side) {
  for (let i = 0; i < 3; i++) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    since = new Date().getTime() - +milliseconds;
    if (since < 86_400_000) when = `${since / 24} hours ago`;
    else if (since < 2 * 86_400_000) when = "Yesterday";
    else if (since < 7 * 86_400_000) when = "Last week";
    else when = "While ago...";

    document.querySelector(`.for-you-${side}-side`).innerHTML += `<a href="${
      data.articles[i].url
    }"><div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">${data.articles[i].source.name}</p>
              <h2 class="right-side-card-title">
               ${data.articles[i].title}
              </h2>
              <p class="date-author-side">${when} · ${
      data.articles[i].author ?? ""
    }</p>
            </div>
            <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="${data.articles[i].urlToImage}"
                alt=""
              />
            </div>
          </div></a>`;
  }
};
const getFourthContainerHTML = async function () {
  try {
    const array = [9, 18];
    let number = array[randomNumber(0, 1)];
    let Categories = shuffle(CategoriesOriginal);
    let k = 0;
    for (let i = 0; i < number; i) {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${Categories[k]}&apiKey=c8e87f0ac96d4e349f62b3d71fe2d90a`
      );
      const data = await response.json();

      console.log("fourth", response);

      if (!response.ok) throw new Error();

      document.querySelector(
        ".fourth-container-wrapper"
      ).innerHTML += `      <div class="second-container fourth" data-secondid="${Categories[k]}">
  <div>
            <h1 class="button-fourth-container">${Categories[k]} <i class="fa-solid fa-angle-right"></i></h1>
           </div>  
          </div>`;
      for (let j = i; j < i + 3; j++) {
        document.querySelector(
          `[data-secondid="${Categories[k]}"]`
        ).innerHTML += `
             <a class="fourth-container-link" href="${
               data.articles[i].url
             }"> <div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">${data.articles[j].source.name}</p>
              <h2 class="right-side-card-title">
               ${data.articles[j].title}
              </h2>
              <p class="date-author-side">${when} · ${
          data.articles[j].author ?? ""
        }</p>
            </div>
            <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="${data.articles[j].urlToImage}"
                alt=""
              />
            </div>
          </div></a>`;
      }
      i += 3;
      k++;
    }

    document.querySelectorAll(".button-fourth-container").forEach((el) =>
      el.addEventListener("click", function (e) {
        getNewsFromList(`${e.target.textContent.trim()}`);
      })
    );
  } catch (err) {
    console.error(err);
  }
};
const getFifthContainerHTML = function (data, side) {
  let i;
  side === "right" ? (i = 2) : (i = 0);
  let k = i + 2;
  for (i; i < k; i++) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    since = new Date().getTime() - +milliseconds;
    if (since < 86_400_000) when = `${since / 24} hours ago`;
    else if (since < 2 * 86_400_000) when = "Yesterday";
    else if (since < 7 * 86_400_000) when = "Last week";
    else when = "A week ago";

    document.querySelector(
      `[data-foryou${side}="2"]`
    ).innerHTML += `<a class="for-you-${side}-link" href="${
      data.articles[i].url
    }"><div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">${data.articles[i].source.name}</p>
              <h2 class="right-side-card-title">
               ${data.articles[i].title}
              </h2>
              <p class="date-author">${when} · ${
      data.articles[i].author ?? ""
    }</p>
            </div>
          ${
            data.articles[i].urlToImage
              ? `  <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="${data.articles[i].urlToImage}"
                alt=""
              />
            </div>`
              : ""
          }
          </div></a>`;
  }
};
const getSixthContainerHTML = function (data, side) {
  let i;
  side === "right" ? (i = 2) : (i = 0);
  let k = i + 2;
  for (i; i < k; i++) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    since = new Date().getTime() - +milliseconds;
    if (since < 86_400_000) when = `${since / 24} hours ago`;
    else if (since < 2 * 86_400_000) when = "Yesterday";
    else if (since < 7 * 86_400_000) when = "Last week";
    else when = "While ago...";

    document.querySelector(
      `[data-foryou${side}="3"]`
    ).innerHTML += `<a class="for-you-${side}-link" href="${
      data.articles[i].url
    }"><div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">${data.articles[i].source.name}</p>
              <h2 class="right-side-card-title">
               ${data.articles[i].title}
              </h2>
              <p class="date-author">${when} · ${
      data.articles[i].author ?? ""
    }</p>
            </div>
          ${
            data.articles[i].urlToImage
              ? `  <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="${data.articles[i].urlToImage}"
                alt=""
              />
            </div>`
              : ""
          }
          </div></a>`;
  }
};
const hideManageFollowing = function (e) {
  if (e.target.closest(".fa-ellipsis-vertical")) {
    return;
  }

  document.querySelectorAll(".manage-followed-container").forEach((el) => {
    el.style.height = "0rem";
    el.style.bottom = "0rem";
    el.style.padding = "0rem 0rem";
    el.style.boxShadow = "none";
    el.style.zIndex = "1";
  });
  document.removeEventListener("click", hideManageFollowing);
};
const getFollowingCart = function (el) {
  let image;
  if (
    el !== "Business" &&
    el !== "World" &&
    el !== "Entertainment" &&
    el !== "Science" &&
    el !== "Health" &&
    el !== "Sports" &&
    el !== "Technology" &&
    el !== "U.S."
  )
    image = `<i class="fa-solid fa-comments lts-icon"></i>`;
  else image = `<img class="${el} following-icon" src="${el}.jpg" alt="" />`;
  if (loggedInAs.following.length === 1) {
    return `<div class="followed-category">
${image}
    <p class="followed-category-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical topic-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-bottom">
            <p class="remove-following-category"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>`;
  } else if (el === loggedInAs.following[0])
    return ` <div class="followed-category">
${image}

      <p class="followed-category-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical topic-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-top">
            <p class="move-toward-bottom-following-category"><i class="fa-solid fa-chevron-down"></i> Move toward bottom</p>
            <p class="move-bottom-following-category"><i class="fa-solid fa-arrow-down"></i> Move to bottom</p>
          </div>
          <div class="manage-followed-container-bottom">
            <p class="remove-following-category"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>`;
  else if (el === loggedInAs.following[loggedInAs.following.length - 1])
    return `<div class="followed-category">
  ${image}

      <p class="followed-category-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical topic-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-top">
            <p class="move-top-following-category"><i class="fa-solid fa-arrow-up"></i> Move to top</p>
            <p class="move-toward-top-following-category"><i class="fa-solid fa-chevron-up"></i> Move toward top</p>
          </div>
          <div class="manage-followed-container-bottom">
            <p class="remove-following-category"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>
  `;
  else if (
    el !== loggedInAs.following[loggedInAs.following.length - 1] &&
    el !== loggedInAs.following[0]
  )
    return ` <div class="followed-category">
   ${image}
      <p class="followed-category-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical topic-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-top">
            <p class="move-top-following-category"><i class="fa-solid fa-arrow-up"></i> Move to top</p>
            <p class="move-toward-top-following-category"><i class="fa-solid fa-chevron-up"></i> Move toward top</p>
            <p class="move-toward-bottom-following-category"><i class="fa-solid fa-chevron-down"></i> Move toward bottom</p>
            <p class="move-bottom-following-category"><i class="fa-solid fa-arrow-down"></i> Move to bottom</p>
          </div>
          <div class="manage-followed-container-bottom">
            <p class="remove-following-category"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>`;
};
const getSearchesCart = function (el, type, element) {
  let icon;
  if (type === "search")
    icon = `<i class="fa-solid fa-magnifying-glass lts-icon"></i>`;
  if (type === "location")
    icon = `<i class="fa-solid fa-location-dot lts-icon"></i>`;
  if (type === "source") icon = `<i class="fa-solid fa-hashtag lts-icon"></i>`;

  if (element.length === 1) {
    return `<div class="followed-${type} favorite-${type}">
${icon}
      <p class=" favorite-${type}-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical ${type}-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-bottom">
            <p class="remove-following-${type}"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>`;
  } else if (el === element[0])
    return ` <div class="followed-${type} favorite-${type}">
${icon}
      <p class=" favorite-${type}-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical ${type}-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-top">
            <p class="move-toward-bottom-following-${type}"><i class="fa-solid fa-chevron-down"></i> Move toward bottom</p>
            <p class="move-bottom-following-${type}"><i class="fa-solid fa-arrow-down"></i> Move to bottom</p>
          </div>
          <div class="manage-followed-container-bottom">
            <p class="remove-following-${type}"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>`;
  else if (el === element[element.length - 1])
    return `
    <div class="followed-${type} favorite-${type}">
${icon}
      <p class=" favorite-${type}-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical ${type}-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-top">
            <p class="move-top-following-${type}"><i class="fa-solid fa-arrow-up"></i> Move to top</p>
            <p class="move-toward-top-following-${type}"><i class="fa-solid fa-chevron-up"></i> Move toward top</p>
          </div>
          <div class="manage-followed-container-bottom">
            <p class="remove-following-${type}"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>
  `;
  else if (el !== element[element.length - 1] && el !== element[0])
    return ` <div class="followed-${type} favorite-${type}">
  ${icon}
      <p class=" favorite-${type}-title">${el}</p>
      <i class="fa-solid fa-ellipsis-vertical ${type}-vertical-dots">
        <div class="manage-followed-container">
          <div class="manage-followed-container-top">
            <p class="move-top-following-${type}"><i class="fa-solid fa-arrow-up"></i> Move to top</p>
            <p class="move-toward-top-following-${type}"><i class="fa-solid fa-chevron-up"></i> Move toward top</p>
            <p class="move-toward-bottom-following-${type}"><i class="fa-solid fa-chevron-down"></i> Move toward bottom</p>
            <p class="move-bottom-following-${type}"><i class="fa-solid fa-arrow-down"></i> Move to bottom</p>
          </div>
          <div class="manage-followed-container-bottom">
            <p class="remove-following-${type}"><i class="fa-solid fa-trash"></i> Remove from library</p>
          </div>
        </div>
      </i>
    </div>`;
};
const getHeightForManageContainers = function (el, type) {
  if (
    !el.querySelector(`.move-top-following-${type}`) &&
    !el.querySelector(`.move-bottom-following-${type}`)
  ) {
    return 4.4;
  } else if (
    !el.querySelector(`.move-top-following-${type}`) ||
    !el.querySelector(`.move-bottom-following-${type}`)
  ) {
    return 15.4;
  } else return 21.4;
};
const lastToFirst = function (el, array) {
  let index;

  array.forEach((elem, i) => {
    if (el === elem) index = i;
  });
  array.unshift(array[index]);
  array.splice(index + 1, 1);
};
const firstToLast = function (el, array) {
  let index;

  array.forEach((elem, i) => {
    if (el === elem) index = i;
  });

  array.push(array[index]);
  array.splice(index, 1);
};
const moveDownByOne = function (el, array) {
  let index;

  array.forEach((elem, i) => {
    if (el === elem) index = i;
  });
  let temp = array[index];
  array[index] = array[index + 1];
  array[index + 1] = temp;
};
const moveUpByOne = function (el, array) {
  let index;

  array.forEach((elem, i) => {
    if (el === elem) index = i;
  });
  let temp = array[index];
  array[index] = array[index - 1];
  array[index - 1] = temp;
};
const firstPageOfFollowing = function () {
  document.querySelector("#main").innerHTML = ` <div class="following-buttons">
        <button class="following-main-buttons">Topics & sources</button>
        <button class="following-main-buttons">Saved searches</button>
        <button class="following-main-buttons">Saved stories</button>
      </div>
      <div class="following-container">
        <div class="following-page">
          <div class="followings category-following-page">
            <h1>Topics</h1>
            <div class="following-categories-container">
              <img src="https://lh3.googleusercontent.com/nuos3uRehQ6gjGOJeBVvbTBnKGRpFBNScAyr9f3Z9CEpd_Loi1zB39poSX9QbdIjTNevSt2o=rw" alt="" />
              <p>
                When you follow a topic it will appear here. You'll also see
                more related stories in the For You feed.
              </p>
            </div>
          </div>
        </div>
        <div class="following-page">
          <div class="followings local-following-page">
            <h1>Local</h1>
            <div class="following-local-container">
              <img src="https://lh3.googleusercontent.com/SOCn77ylz-ppK_80GxYfcNeHebloX7Vx9IvKbGzL6Aken01llMjZYjKoPTsvSTkGkBc1rwL2=rw" alt="" />
              <p>When you follow a location it will appear here.</p>
            </div>
          </div>
        </div>
        <div class="following-page">
          <div class="followings sources-following-page">
            <h1>Sources</h1>
            <div class="following-sources-container">
              <img src="https://lh3.googleusercontent.com/tFGfZ19wiRAvJsi5LeFL42_k_gV7bXV6dj3aKnatkcPRWKpu2fHUp367Awcdd7JceiE_bzBc=rw" alt="" />
              <p>
                When you follow a source it will appear here. You'll also see
                more stories from that source in the For You feed.
              </p>
            </div>
          </div>
        </div>
      </div>`;
  if (loggedInAs.following && loggedInAs.following.length !== 0) {
    document.querySelector(
      ".category-following-page"
    ).innerHTML = `<h1>Topics</h1>    <div class="followed-categories">
            </div>`;
    document.querySelector(".followed-categories").innerHTML +=
      loggedInAs.following.map((el) => `${getFollowingCart(el)}`).join("");

    document.querySelectorAll(".followed-category").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".topic-vertical-dots")) return;
        if (
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "World" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Science" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Entertainment" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Sports" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Technology" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !== "U.S." &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Local" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Health" &&
          e.target
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent !==
            "Business"
        )
          getNewsFromInput(
            `${
              e.target
                .closest(".followed-category")
                .querySelector(".followed-category-title").textContent
            }`
          );
        else
          getNewsFromList(
            `${
              e.target
                .closest(".followed-category")
                .querySelector(".followed-category-title").textContent
            }`
          );
      });
    });
    document.querySelectorAll(".topic-vertical-dots").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".manage-followed-container")) return;

        if (
          el
            .closest(".followed-category")
            .querySelector(".manage-followed-container").style.height ===
          "18rem"
        ) {
          el.firstElementChild.style.height = "0rem";
          el.firstElementChild.style.bottom = "0rem";
          el.firstElementChild.style.padding = "0rem 0rem";
          el.firstElementChild.style.boxShadow = "none";
          el.firstElementChild.style.zIndex = "1";
          document.removeEventListener("click", hideManageFollowing);
          return;
        }
        document
          .querySelectorAll(".manage-followed-container")
          .forEach((el) => {
            el.style.height = "0rem";
            el.style.bottom = "0rem";
            el.style.padding = "0rem 0rem";
            el.style.boxShadow = "none";
            el.style.zIndex = "1";
          });

        el.firstElementChild.style.height = `${getHeightForManageContainers(
          el,
          "category"
        )}rem`;
        el.firstElementChild.style.bottom = `-${
          getHeightForManageContainers(el, "category") + 2
        }rem`;
        el.firstElementChild.style.padding = "1rem 0rem";
        el.firstElementChild.style.boxShadow =
          "0px 0px 10px 5px rgba(0, 0, 0, 0.2)";
        el.firstElementChild.style.zIndex = "2";

        document.addEventListener("click", hideManageFollowing);
      });
    });
    document
      .querySelectorAll(".move-bottom-following-category")
      .forEach((el) => {
        el.addEventListener("click", function () {
          firstToLast(
            el
              .closest(".followed-category")
              .querySelector(".followed-category-title").textContent,
            loggedInAs.following
          );
          firstPageOfFollowing();

          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.following = loggedInAs.following;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".move-top-following-category").forEach((el) => {
      el.addEventListener("click", function () {
        lastToFirst(
          el
            .closest(".followed-category")
            .querySelector(".followed-category-title").textContent,
          loggedInAs.following
        );
        firstPageOfFollowing();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.following = loggedInAs.following;
          }
          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        });
      });
    });
    document
      .querySelectorAll(".move-toward-top-following-category")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveUpByOne(
            el
              .closest(".followed-category")
              .querySelector(".followed-category-title").textContent,
            loggedInAs.following
          );
          firstPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.following = loggedInAs.following;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document
      .querySelectorAll(".move-toward-bottom-following-category")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveDownByOne(
            el
              .closest(".followed-category")
              .querySelector(".followed-category-title").textContent,
            loggedInAs.following
          );
          firstPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.following = loggedInAs.following;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".remove-following-category").forEach((el) => {
      el.addEventListener("click", function (e) {
        let category = e.target
          .closest(".followed-category")
          .querySelector(".followed-category-title").textContent;

        loggedInAs.following.splice(
          loggedInAs.following.indexOf(`${category}`),
          1
        );

        e.target.closest(".followed-category").remove();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.following = loggedInAs.following;
          }
        });

        localStorage.setItem("accounts", JSON.stringify(userAccounts));
        firstPageOfFollowing();
      });
    });
  } else if (!loggedInAs.following || loggedInAs.following.length === 0) {
    document.querySelector(
      ".category-following-page"
    ).innerHTML = `<h1>Topics</h1>    <div class="following-categories-container">
              <img src="https://lh3.googleusercontent.com/nuos3uRehQ6gjGOJeBVvbTBnKGRpFBNScAyr9f3Z9CEpd_Loi1zB39poSX9QbdIjTNevSt2o=rw" alt="" />
              <p>
                When you follow a topic it will appear here. You'll also see
                more related stories in the For You feed.
              </p>
            </div>`;
  }
  //----------------------------
  if (loggedInAs.followedLocation && loggedInAs.followedLocation.length !== 0) {
    document.querySelector(
      ".local-following-page"
    ).innerHTML = `<h1>Local</h1>    <div class="followed-locations">
            </div>`;
    document.querySelector(".followed-locations").innerHTML +=
      loggedInAs.followedLocation
        .map(
          (el) =>
            `${getSearchesCart(el, "location", loggedInAs.followedLocation)}`
        )
        .join("");

    document.querySelectorAll(".followed-location").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".location-vertical-dots")) return;
        getNewsFromInput(
          `${
            e.target
              .closest(".followed-location")
              .querySelector(".favorite-location-title").textContent
          }`
        );
      });
    });
    document.querySelectorAll(".location-vertical-dots").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".manage-followed-container")) return;

        if (
          el
            .closest(".followed-location")
            .querySelector(".manage-followed-container").style.height ===
          "18rem"
        ) {
          el.firstElementChild.style.height = "0rem";
          el.firstElementChild.style.bottom = "0rem";
          el.firstElementChild.style.padding = "0rem 0rem";
          el.firstElementChild.style.boxShadow = "none";
          el.firstElementChild.style.zIndex = "1";
          document.removeEventListener("click", hideManageFollowing);
          return;
        }
        document
          .querySelectorAll(".manage-followed-container")
          .forEach((el) => {
            el.style.height = "0rem";
            el.style.bottom = "0rem";
            el.style.padding = "0rem 0rem";
            el.style.boxShadow = "none";
            el.style.zIndex = "1";
          });

        el.firstElementChild.style.height = `${getHeightForManageContainers(
          el,
          "location"
        )}rem`;
        el.firstElementChild.style.bottom = `-${
          getHeightForManageContainers(el, "location") + 2
        }rem`;
        el.firstElementChild.style.padding = "1rem 0rem";
        el.firstElementChild.style.boxShadow =
          "0px 0px 10px 5px rgba(0, 0, 0, 0.2)";
        el.firstElementChild.style.zIndex = "2";

        document.addEventListener("click", hideManageFollowing);
      });
    });
    document
      .querySelectorAll(".move-bottom-following-location")
      .forEach((el) => {
        el.addEventListener("click", function () {
          firstToLast(
            el
              .closest(".followed-location")
              .querySelector(".favorite-location-title").textContent,
            loggedInAs.followedLocation
          );
          firstPageOfFollowing();

          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedLocation = loggedInAs.followedLocation;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".move-top-following-location").forEach((el) => {
      el.addEventListener("click", function () {
        lastToFirst(
          el
            .closest(".followed-location")
            .querySelector(".favorite-location-title").textContent,
          loggedInAs.followedLocation
        );
        firstPageOfFollowing();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedLocation = loggedInAs.followedLocation;
          }
          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        });
      });
    });
    document
      .querySelectorAll(".move-toward-top-following-location")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveUpByOne(
            el
              .closest(".followed-location")
              .querySelector(".favorite-location-title").textContent,
            loggedInAs.followedLocation
          );
          firstPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedLocation = loggedInAs.followedLocation;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document
      .querySelectorAll(".move-toward-bottom-following-location")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveDownByOne(
            el
              .closest(".followed-location")
              .querySelector(".favorite-location-title").textContent,
            loggedInAs.followedLocation
          );
          firstPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedLocation = loggedInAs.followedLocation;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".remove-following-location").forEach((el) => {
      el.addEventListener("click", function (e) {
        let location = e.target
          .closest(".followed-location")
          .querySelector(".favorite-location-title").textContent;

        loggedInAs.followedLocation.splice(
          loggedInAs.followedLocation.indexOf(`${location}`),
          1
        );

        e.target.closest(".followed-location").remove();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedLocation = loggedInAs.followedLocation;
          }
        });

        localStorage.setItem("accounts", JSON.stringify(userAccounts));
        firstPageOfFollowing();
      });
    });
  } else if (
    !loggedInAs.followedLocation ||
    loggedInAs.followedLocation.length === 0
  ) {
    document.querySelector(".local-following-page").innerHTML = `  
            <h1>Local</h1>
            <div class="following-local-container">
              <img src="https://lh3.googleusercontent.com/SOCn77ylz-ppK_80GxYfcNeHebloX7Vx9IvKbGzL6Aken01llMjZYjKoPTsvSTkGkBc1rwL2=rw" alt="" />
              <p>When you follow a location it will appear here.</p>
            </div>`;
  }
  //-----------------------------
  if (loggedInAs.followedSources && loggedInAs.followedSources.length !== 0) {
    document.querySelector(
      ".sources-following-page"
    ).innerHTML = `<h1>Sources</h1>    <div class="followed-sources">
            </div>`;
    document.querySelector(".followed-sources").innerHTML +=
      loggedInAs.followedSources
        .map(
          (el) => `${getSearchesCart(el, "source", loggedInAs.followedSources)}`
        )
        .join("");

    document.querySelectorAll(".followed-source").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".source-vertical-dots")) return;
        getNewsFromInput(
          `${
            e.target
              .closest(".followed-source")
              .querySelector(".favorite-source-title").textContent
          }`
        );
      });
    });
    document.querySelectorAll(".source-vertical-dots").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".manage-followed-container")) return;

        if (
          el
            .closest(".followed-source")
            .querySelector(".manage-followed-container").style.height ===
          "18rem"
        ) {
          el.firstElementChild.style.height = "0rem";
          el.firstElementChild.style.bottom = "0rem";
          el.firstElementChild.style.padding = "0rem 0rem";
          el.firstElementChild.style.boxShadow = "none";
          el.firstElementChild.style.zIndex = "1";
          document.removeEventListener("click", hideManageFollowing);
          return;
        }
        document
          .querySelectorAll(".manage-followed-container")
          .forEach((el) => {
            el.style.height = "0rem";
            el.style.bottom = "0rem";
            el.style.padding = "0rem 0rem";
            el.style.boxShadow = "none";
            el.style.zIndex = "1";
          });

        el.firstElementChild.style.height = `${getHeightForManageContainers(
          el,
          "source"
        )}rem`;
        el.firstElementChild.style.bottom = `-${
          getHeightForManageContainers(el, "source") + 2
        }rem`;
        el.firstElementChild.style.padding = "1rem 0rem";
        el.firstElementChild.style.boxShadow =
          "0px 0px 10px 5px rgba(0, 0, 0, 0.2)";
        el.firstElementChild.style.zIndex = "2";

        document.addEventListener("click", hideManageFollowing);
      });
    });
    document.querySelectorAll(".move-bottom-following-source").forEach((el) => {
      el.addEventListener("click", function () {
        firstToLast(
          el.closest(".followed-source").querySelector(".favorite-source-title")
            .textContent,
          loggedInAs.followedSources
        );
        firstPageOfFollowing();

        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedSources = loggedInAs.followedSources;
          }
          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        });
      });
    });
    document.querySelectorAll(".move-top-following-source").forEach((el) => {
      el.addEventListener("click", function () {
        lastToFirst(
          el.closest(".followed-source").querySelector(".favorite-source-title")
            .textContent,
          loggedInAs.followedSources
        );
        firstPageOfFollowing();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedSources = loggedInAs.followedSources;
          }
          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        });
      });
    });
    document
      .querySelectorAll(".move-toward-top-following-source")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveUpByOne(
            el
              .closest(".followed-source")
              .querySelector(".favorite-source-title").textContent,
            loggedInAs.followedSources
          );
          firstPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSources = loggedInAs.followedSources;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document
      .querySelectorAll(".move-toward-bottom-following-source")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveDownByOne(
            el
              .closest(".followed-source")
              .querySelector(".favorite-source-title").textContent,
            loggedInAs.followedSources
          );
          firstPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSources = loggedInAs.followedSources;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".remove-following-source").forEach((el) => {
      el.addEventListener("click", function (e) {
        let sources = e.target
          .closest(".followed-source")
          .querySelector(".favorite-source-title").textContent;

        loggedInAs.followedSources.splice(
          loggedInAs.followedSources.indexOf(`${sources}`),
          1
        );

        e.target.closest(".followed-source").remove();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedSources = loggedInAs.followedSources;
          }
        });

        localStorage.setItem("accounts", JSON.stringify(userAccounts));
        firstPageOfFollowing();
      });
    });
  } else if (
    !loggedInAs.followedSources ||
    loggedInAs.followedSources.length === 0
  ) {
    document.querySelector(
      ".sources-following-page"
    ).innerHTML = ` <h1>Sources</h1>
            <div class="following-sources-container">
              <img src="https://lh3.googleusercontent.com/tFGfZ19wiRAvJsi5LeFL42_k_gV7bXV6dj3aKnatkcPRWKpu2fHUp367Awcdd7JceiE_bzBc=rw" alt="" />
              <p>
                When you follow a source it will appear here. You'll also see
                more stories from that source in the For You feed.
              </p>
            </div>`;
  }

  getFollowingContainerHTML();
};
const secondPageOfFollowing = function () {
  document.querySelector("#main").innerHTML = `<div class="following-buttons">
        <button class="following-main-buttons">Topics & sources</button>
        <button class="following-main-buttons">Saved searches</button>
        <button class="following-main-buttons">Saved stories</button>
      </div>
      <div class="following-container">
        <div class="following-page">
          <div class="followings category-following-page">
            <div class="following-categories-container">
              <img src="https://lh3.googleusercontent.com/o_tai07eFNo8w2jfrZY_vh2Mv3DnrgXM1Ven6HBYn4vFxe949KwJgvAhYdq2Hmr4C_5jUbkkn84=rw" alt="" />
              <p>
               Your saved searches will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>`;

  if (loggedInAs.followedSearches && loggedInAs.followedSearches.length !== 0) {
    document.querySelector(
      ".category-following-page"
    ).innerHTML = `<div class="followed-searches">
            </div>`;
    document.querySelector(".followed-searches").innerHTML +=
      loggedInAs.followedSearches
        .map(
          (el) =>
            `${getSearchesCart(el, "search", loggedInAs.followedSearches)}`
        )
        .join("");

    document.querySelectorAll(".followed-search").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".search-vertical-dots")) return;
        getNewsFromInput(
          `${
            e.target
              .closest(".followed-search")
              .querySelector(".favorite-search-title").textContent
          }`
        );
      });
    });
    document.querySelectorAll(".search-vertical-dots").forEach((el) => {
      el.addEventListener("click", function (e) {
        if (e.target.closest(".manage-followed-container")) return;

        if (
          el
            .closest(".followed-search")
            .querySelector(".manage-followed-container").style.height ===
          "18rem"
        ) {
          el.firstElementChild.style.height = "0rem";
          el.firstElementChild.style.bottom = "0rem";
          el.firstElementChild.style.padding = "0rem 0rem";
          el.firstElementChild.style.boxShadow = "none";
          el.firstElementChild.style.zIndex = "1";
          document.removeEventListener("click", hideManageFollowing);
          return;
        }
        document
          .querySelectorAll(".manage-followed-container")
          .forEach((el) => {
            el.style.height = "0rem";
            el.style.bottom = "0rem";
            el.style.padding = "0rem 0rem";
            el.style.boxShadow = "none";
            el.style.zIndex = "1";
          });

        el.firstElementChild.style.height = `${getHeightForManageContainers(
          el,
          "search"
        )}rem`;
        el.firstElementChild.style.bottom = `-${
          getHeightForManageContainers(el, "search") + 2
        }rem`;
        el.firstElementChild.style.padding = "1rem 0rem";
        el.firstElementChild.style.boxShadow =
          "0px 0px 10px 5px rgba(0, 0, 0, 0.2)";
        el.firstElementChild.style.zIndex = "2";

        document.addEventListener("click", hideManageFollowing);
      });
    });
    document
      .querySelectorAll(".move-bottom-following-category")
      .forEach((el) => {
        el.addEventListener("click", function () {
          firstToLast(
            el
              .closest(".followed-search")
              .querySelector(".favorite-search-title").textContent,
            loggedInAs.followedSearches
          );
          secondPageOfFollowing();

          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSearches = loggedInAs.followedSearches;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".move-top-following-search").forEach((el) => {
      el.addEventListener("click", function () {
        lastToFirst(
          el.closest(".followed-search").querySelector(".favorite-search-title")
            .textContent,
          loggedInAs.followedSearches
        );
        secondPageOfFollowing();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedSearches = loggedInAs.followedSearches;
          }
          localStorage.setItem("accounts", JSON.stringify(userAccounts));
        });
      });
    });
    document
      .querySelectorAll(".move-toward-top-following-search")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveUpByOne(
            el
              .closest(".followed-search")
              .querySelector(".favorite-search-title").textContent,
            loggedInAs.followedSearches
          );
          secondPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSearches = loggedInAs.followedSearches;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document
      .querySelectorAll(".move-toward-bottom-following-search")
      .forEach((el) => {
        el.addEventListener("click", function () {
          moveDownByOne(
            el
              .closest(".followed-search")
              .querySelector(".favorite-search-title").textContent,
            loggedInAs.followedSearches
          );
          secondPageOfFollowing();
          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
          loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
          userAccounts.forEach((el) => {
            if (loggedInAs.username === el.username) {
              el.followedSearches = loggedInAs.followedSearches;
            }
            localStorage.setItem("accounts", JSON.stringify(userAccounts));
          });
        });
      });
    document.querySelectorAll(".remove-following-search").forEach((el) => {
      el.addEventListener("click", function (e) {
        let category = e.target
          .closest(".followed-search")
          .querySelector(".favorite-search-title").textContent;

        loggedInAs.followedSearches.splice(
          loggedInAs.followedSearches.indexOf(`${category}`),
          1
        );

        e.target.closest(".followed-search").remove();
        localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
        loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
        userAccounts.forEach((el) => {
          if (loggedInAs.username === el.username) {
            el.followedSearches = loggedInAs.followedSearches;
          }
        });

        localStorage.setItem("accounts", JSON.stringify(userAccounts));
        secondPageOfFollowing();
      });
    });
  } else if (
    !loggedInAs.followedSearches ||
    loggedInAs.followedSearches.length === 0
  ) {
    document.querySelector(
      ".category-following-page"
    ).innerHTML = `<div class="following-categories-container">
              <img src="https://lh3.googleusercontent.com/o_tai07eFNo8w2jfrZY_vh2Mv3DnrgXM1Ven6HBYn4vFxe949KwJgvAhYdq2Hmr4C_5jUbkkn84=rw" alt="" />
              <p>
               Your saved searches will appear here.
              </p>
            </div>`;
  }
  getFollowingContainerHTML();
};
const thirdPageOfFollowing = function () {
  document.querySelector("#main").innerHTML = `<div class="following-buttons">
        <button class="following-main-buttons">Topics & sources</button>
        <button class="following-main-buttons">Saved searches</button>
        <button class="following-main-buttons">Saved stories</button>
      </div>
      <div class="following-container">
        <div class="following-page">
          <div class="followings category-following-page">
            <div class="following-categories-container">
              <img src="https://lh3.googleusercontent.com/7Iv4pkYA_hqsvlyo6XNy3UU0tUYgBR9rGrDHekm8-6cHO14jbUrOu8dCU86to2kzYoRVHJn0Ow=rw" alt="" />
              <p>
               Your saved stories will appear here.
              </p>
            </div>
          </div>
        </div>
      </div>`;
  getFollowingContainerHTML();
};
const getFollowingContainerHTML = function () {
  document.querySelectorAll(".following-main-buttons").forEach((el) =>
    el.addEventListener("click", function (e) {
      if (e.target.textContent.trim() === "Topics & sources") {
        firstPageOfFollowing();
      }
      if (e.target.textContent.trim() === "Saved searches") {
        secondPageOfFollowing();
      }
      if (e.target.textContent.trim() === "Saved stories") {
        thirdPageOfFollowing();
      }
    })
  );
};
const getForYouContainerHTML = function () {
  document.querySelector("#main").style.width = "85rem";
  document.querySelector(
    "#main"
  ).innerHTML = `        <div class="for-you-title">
        <h2 class="page-title">For you</h2>
        <p class="page-description">Recommended based on your interests</p>
      </div>
      <div class="first-container"></div>`;
};

checkIfLoggedIn();
// if (Logged) {
//   getHomeHTML();
//   getWeather("Novi Pazar");
// }

//TODO: FINISH MAIN PAGE FOOTER WITH 1 MORE CONTAINER, ADD A FOOTER TO EVERY PAGE, THEN

//TODO: WORK ON IMPLEMENTING FOLLOWS, IF USER CLICKS ON FOLLOW, THE CATEGORY THAT HE FOLLOWED GETS ADDED TO
//THEIR PROFILE AND WHEN THEY CLICK ON FOLLOWING THE CATEGORY APPEARS THERE.
