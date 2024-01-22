let Logged = JSON.parse(localStorage.getItem("logged")) || false;
let loggedInAs = JSON.parse(localStorage.getItem("loggedInAs")) || {};
let userAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

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
const getWeather = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=40af5230b1b9fa8b6a665dc853b4d7d7`
    );
    const weatherData = await response.json();

    if (!response.ok) throw new Error("Could not find the specified location.");
    console.log(weatherData);
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
  const fourthContainerCategories = ["Movie", "Batman", "Flower", "Nature"];
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
    19,
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
  changeContainerHTML(
    fourthContainerCategories[randomNumber(0, 3)],
    1000,
    "fourth-container"
  );
  changeContainerHTML(
    fifthContainerCategoriesLeft[randomNumber(0, 2)],
    1000,
    "fifth-container",
    "left"
  );
  changeContainerHTML(
    fifthContainerCategoriesLeft[randomNumber(0, 2)],
    1000,
    "fifth-container",
    "right"
  );
  changeContainerHTML(
    fifthContainerCategoriesRight[randomNumber(0, 2)],
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
  LoggedIn = false;
  loggedInAs = {};
  localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
  localStorage.setItem("logged", JSON.stringify(LoggedIn));
  Logged = JSON.parse(localStorage.getItem("logged")) || false;
  checkIfLoggedIn();
});
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
    document.querySelector(".fa-chevron-left").style.transform = "rotate(0deg)";
    input.value = "";
  });
document.querySelectorAll("li").forEach((el) => {
  el.classList.add("list-unclicked");
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
        console.log(i, j);

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
          </div>
        </div>`;
      i++;
    }
  }
};
const getNewsFromInput = async function (input) {
  document.querySelector("#main").style.width = "85rem";
  try {
    document.querySelector("#main").innerHTML = `
       <div class="page-top">
        <div class="page-top-left">
          <h2 class="page-title">Searched for: "${input}"</h2>
          <p class="page-description">${days[new Date().getDay()]}, ${
      months[new Date().getMonth()]
    } ${new Date().getDate()}</p>
        </div></div>
  <div class='first-container'> `;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=3ac5523d43eb420aa810389f8d45a190`
    );

    const data = await response.json();
    console.log(data);
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
    document.querySelector("#main").style.width = "85rem";
    document.querySelector("#main").innerHTML = `
        <div class="page-top-submain-news">
        <div class="page-top-submain-news-top">
          <h2 class="page-title">
           ${
             clicked === "Local"
               ? ""
               : `<img class="${clicked} list-icons" src="${clicked}.jpg" />`
           }${clicked === "Local" ? "Your local news" : `${clicked}`}
          </h2>
        </div>
        <div class="page-top-submain-news-bottom">
       ${
         clicked !== "World" && clicked !== "Local" && clicked !== "U.S."
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
      }&apiKey=3ac5523d43eb420aa810389f8d45a190`
    );
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

    console.log(data);

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
      `https://newsapi.org/v2/everything?q=${input}&apiKey=3ac5523d43eb420aa810389f8d45a190`
    );
    const newsData = await response.json();

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
    if (type === "fourth-container") getFourthContainerHTML(newsData);
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
  console.log(data);
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
const getFourthContainerHTML = function (data) {
  const array = [9, 18];
  let number = array[randomNumber(0, 1)];
  console.log(number);

  for (let i = 0; i < number; i) {
    document.querySelector(
      ".fourth-container-wrapper"
    ).innerHTML += `      <div class="second-container" data-secondid="${i}">
          </div>`;
    for (let j = i; j < i + 3; j++) {
      document.querySelector(`[data-secondid="${i}"]`).innerHTML += `
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
    else when = "While ago...";

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
  console.log(data);
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
checkIfLoggedIn();
if (Logged) {
  getHomeHTML();
  getWeather("Novi Pazar");
}

//TODO: FINISH MAIN PAGE FOOTER WITH 1 MORE CONTAINER, ADD A FOOTER TO EVERY PAGE, THEN

//TODO: WORK ON IMPLEMENTING FOLLOWS, IF USER CLICKS ON FOLLOW, THE CATEGORY THAT HE FOLLOWED GETS ADDED TO
//THEIR PROFILE AND WHEN THEY CLICK ON FOLLOWING THE CATEGORY APPEARS THERE.
