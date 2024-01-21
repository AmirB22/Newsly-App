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
  } else if (Logged) {
    const getWeather = async function (city) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=40af5230b1b9fa8b6a665dc853b4d7d7`
        );
        const weatherData = await response.json();

        if (!response.ok)
          throw new Error("Could not find the specified location.");
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
          <h1 class="first-container-title">
            Top stories <i class="fa-solid fa-angle-right"></i>
          </h1>
          <div class="first-news small-news-container">
            <div class="small-news">
              <div>
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <h3 class="small-news-title">
                  Ask Ethan: What explains the Fibonacci sequence?
                </h3>
              </div>
              <span class="date-author">10 hours ago · Ethan Siegel</span>
            </div>
            <div class="small-news-image">
              <img
                src="https://wallpapers.com/images/hd/yellow-tape-police-line-3vjcar7rba41lcvc.webp"
                alt=""
              />
            </div>
          </div>
          <div class="second-news big-news">
            <div class="main-news">
              <img
                class="main-news-image"
                src="https://c.wallhere.com/photos/3d/0a/1920x1080_px_digital_art_fantasy_Art_landscape_Long_Hair_ryky_Trees_wind-1314651.jpg!d"
                alt=""
              />
              <div class="logo">
                <img
                  class="image-side"
                  src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                  alt=""
                />
                <p>CNN</p>
              </div>
              <h3 class="main-news-title">
                Forget Ozempic - to get the body you want, just start dancing,
                researchers say
              </h3>
              <span class="date-author">Yesterday · David Landsel</span>
            </div>
            <div class="on-the-side-news">
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://images.squarespace-cdn.com/content/v1/53410bafe4b065254d7107c5/1683946710562-IBCKD4ASI5DEDBN5MWWC/Fox_News_Channel_logo.jpg?format=300w"
                    alt=""
                  />
                  <p>Fox News</p>
                </div>
                <p class="on-the-side-title">
                  Weight loss technique that is as effective as it is enjoyable
                  - and better than Ozempic
                </p>
                <span class="date-author-side">2 hours ago</span>
              </div>
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://images.squarespace-cdn.com/content/v1/53410bafe4b065254d7107c5/1419671737125-3IXTTROQCXWH0R3EBPZT/NBC_News_2013_logo.png?format=300w"
                    alt=""
                  />
                  <p>NBC News</p>
                </div>
                <p class="on-the-side-title">
                  Shake Your Way To Skinny: Dancing Can Lead to Weight Loss
                  Success
                </p>
                <span class="date-author-side">Yesterday</span>
              </div>
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  Dancing an effective way for people with obesity to lose
                  weight, study finds
                </p>
                <span class="date-author-side">Yesterday</span>
              </div>
            </div>
          </div>
          <div class="third-news big-news">
            <div class="main-news">
              <img
                class="main-news-image"
                src="https://mcdn.wallpapersafari.com/medium/28/77/XoaefB.jpg"
                alt=""
              />
              <div class="logo">
                <img
                  class="image-side"
                  src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                  alt=""
                />
                <p>CNN</p>
              </div>
              <h3 class="main-news-title">
                The Davos Consensus: Donald Trump Will Win Re-Election
              </h3>
              <span class="date-author"
                >4hours ago · Michael de la Merced, Bernard W...</span
              >
            </div>
            <div class="on-the-side-news">
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  Trump building his power at home while global leaders dread
                  his return
                </p>
                <span class="date-author-side"
                  >12 hours ago · Stephen Collinson</span
                >
              </div>
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  U.S. executives in Davos see a Trump victory in 2024, and no
                  cause for concern
                </p>
                <span class="date-author-side"
                  >Yesterday · Alex sherman & MacKenzie Sigalos</span
                >
              </div>
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  Alex Soros says a Trump win is a done deal for the Davos elite
                  - but they're always wrong
                </p>
                <span class="date-author-side">4 hours ago · Elliot Smith</span>
              </div>
            </div>
          </div>
          <div class="fourth-news big-news">
            <div class="main-news">
              <img
                class="main-news-image"
                src="https://hips.hearstapps.com/hmg-prod/images/former-u-s-president-donald-trump-speaks-to-reporters-news-photo-1680289458.jpg?crop=0.670xw:1.00xh;0.190xw,0&resize=1200:*"
                alt=""
              />
              <div class="logo">
                <img
                  class="image-side"
                  src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                  alt=""
                />
                <p>CNN</p>
              </div>
              <h3 class="main-news-title">
                Dua Lipa Reacted To Those "Go Girl, Give Us Nothing Memes" And
                It Sounds Like Her...
              </h3>
              <span class="date-author">2 days ago · Chelsea Stewart</span>
            </div>
            <div class="on-the-side-news">
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  Dua Lipa hits back at jokes about her constantly being on
                  holiday
                </p>
                <span class="date-author-side"
                  >20 hours ago · Anagricel Duran</span
                >
              </div>
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  Dua Lipa Reacted To Those "Go Girl, Give Us Nothing Memes" And
                  It Sounds Like Her Feelings Were Hurt
                </p>
                <span class="date-author-side">2 days ago</span>
              </div>
              <div class="on-the-side-new">
                <div class="logo">
                  <img
                    class="image-side"
                    src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                    alt=""
                  />
                  <p>CNN</p>
                </div>
                <p class="on-the-side-title">
                  Dua Lipa has seen all your silly memes
                </p>
                <span class="date-author-side"
                  >3 days ago · Aura Heinrichs</span
                >
              </div>
            </div>
          </div>
        </div>
        <div class="second-container">
          <div class="right-side-title">
            <h1>Picks for you</h1>
            <p>?</p>
          </div>
          <div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">CNN</p>
              <h2 class="right-side-card-title">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aspernatur, aut tenetur asperiores culpa voluptate ab.
              </h2>
              <p class="date-author-side">7 hours ago Jordan Hart</p>
            </div>
            <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                alt=""
              />
            </div>
          </div>
          <div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">WWE</p>
              <h2 class="right-side-card-title">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                consectetur corporis officia, at adipisci dolorem aut soluta
                aperiam maxime doloribus?
              </h2>
              <p class="date-author-side">23 hours ago Chantz Martin</p>
            </div>
            <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                alt=""
              />
            </div>
          </div>
          <div class="right-side-card">
            <div class="right-side-card-left">
              <p class="logo">ABC News</p>
              <h2 class="right-side-card-title">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                ad?
              </h2>
              <p class="date-author-side">15 hours ago</p>
            </div>
            <div class="right-side-card-right">
              <img
                class="right-side-card-image"
                src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                alt=""
              />
            </div>
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
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="for-you-right-side">
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fourth-container">
        <h1 class="page-title">Your topics</h1>
        <p class="page-description">Recommended based on your interests</p>
        <div class="fourth-container-wrapper">
          <div class="second-container">
            <div class="right-side-title">
              <h1>Picks for you</h1>
              <p>?</p>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">WWE</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                  consectetur corporis officia, at adipisci dolorem aut soluta
                  aperiam maxime doloribus?
                </h2>
                <p class="date-author-side">23 hours ago Chantz Martin</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">ABC News</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  ad?
                </h2>
                <p class="date-author-side">15 hours ago</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="second-container">
            <div class="right-side-title">
              <h1>Picks for you</h1>
              <p>?</p>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">WWE</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                  consectetur corporis officia, at adipisci dolorem aut soluta
                  aperiam maxime doloribus?
                </h2>
                <p class="date-author-side">23 hours ago Chantz Martin</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">ABC News</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  ad?
                </h2>
                <p class="date-author-side">15 hours ago</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="second-container">
            <div class="right-side-title">
              <h1>Picks for you</h1>
              <p>?</p>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">WWE</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                  consectetur corporis officia, at adipisci dolorem aut soluta
                  aperiam maxime doloribus?
                </h2>
                <p class="date-author-side">23 hours ago Chantz Martin</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">ABC News</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  ad?
                </h2>
                <p class="date-author-side">15 hours ago</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="second-container">
            <div class="right-side-title">
              <h1>Picks for you</h1>
              <p>?</p>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">WWE</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                  consectetur corporis officia, at adipisci dolorem aut soluta
                  aperiam maxime doloribus?
                </h2>
                <p class="date-author-side">23 hours ago Chantz Martin</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">ABC News</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  ad?
                </h2>
                <p class="date-author-side">15 hours ago</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="second-container">
            <div class="right-side-title">
              <h1>Picks for you</h1>
              <p>?</p>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">WWE</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                  consectetur corporis officia, at adipisci dolorem aut soluta
                  aperiam maxime doloribus?
                </h2>
                <p class="date-author-side">23 hours ago Chantz Martin</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">ABC News</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  ad?
                </h2>
                <p class="date-author-side">15 hours ago</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div class="second-container">
            <div class="right-side-title">
              <h1>Picks for you</h1>
              <p>?</p>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">CNN</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Aspernatur, aut tenetur asperiores culpa voluptate ab.
                </h2>
                <p class="date-author-side">7 hours ago Jordan Hart</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://www.voicesofyouth.org/sites/voy/files/styles/full_width_image/public/images/2019-01/politics3.jpg?itok=aJe8Igdl"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">WWE</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia
                  consectetur corporis officia, at adipisci dolorem aut soluta
                  aperiam maxime doloribus?
                </h2>
                <p class="date-author-side">23 hours ago Chantz Martin</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://static.independent.co.uk/2024/01/18/09/Trump%20Haley%20and%20Desantis%20comp%20copy.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp"
                  alt=""
                />
              </div>
            </div>
            <div class="right-side-card">
              <div class="right-side-card-left">
                <p class="logo">ABC News</p>
                <h2 class="right-side-card-title">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  ad?
                </h2>
                <p class="date-author-side">15 hours ago</p>
              </div>
              <div class="right-side-card-right">
                <img
                  class="right-side-card-image"
                  src="https://sciencetheory.net/wp-content/uploads/2021/01/politics.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="fifth-container">
        <h1 class="page-title">Fact check</h1>
        <p class="page-description">From independent sources</p>
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
    };

    //----
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
        document.querySelector(".fa-chevron-left").style.transform =
          "rotate(0deg)";
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
    getWeather("Novi Pazar");
  }
};
checkIfLoggedIn();

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

const getHTML = function (data) {
  for (let i = 0; i < data.articles.length; i) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    since = new Date().getTime() - +milliseconds;
    if (since < 86_400_000) when = `${since / 24 / 1000000} hours ago`;
    else if (since < 2 * 86_400_000) when = "Yesterday";
    else if (since < 7 * 86_400_000) when = "Last week";
    else when = "While ago...";
    // if (i === 19 || i === 20 || i === 21 || i === 21) break;

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
          <div class="main-news">
            <img
              class="main-news-image"
              src="${data.articles[i].urlToImage}"
              alt=""
            />
            <div class="logo">
              <img
                class="image-side"
                src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                alt=""
              />
              <p>${data.articles[i].source.name}</p>
            </div>
            <h3 class="main-news-title">
             ${data.articles[i].title}
            </h3>
            <span class="date-author">${when} · ${
        data.articles[i]?.author ?? ""
      }</span>
          </div>
          <div class="on-the-side-news" data-side="${i}">
            </div>
        </div>`;
      for (let j = i + 1; j < i + 4; j++) {
        console.log(i, j);

        if (data.articles[j].content === "[Removed]") continue;

        document.querySelector(`[data-side="${i}"]`).innerHTML += `
            <div class="on-the-side-new">
              <div class="logo">
                <img
                  class="image-side"
                  src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                  alt=""
                />
                <p>${data.articles[j]?.source.name}</p>
              </div>
              <p class="on-the-side-title">
                ${data.articles[j].title}
              </p>
              <span class="date-author-side"
                >${when}· ${data.articles[j].author ?? ""}</i
              ></span>
            </div>`;
      }
      i += 4;
    } else {
      document.querySelector(".first-container").innerHTML += `
       <div class="first-news small-news-container">
          <div class="small-news">
            <div>
              <div class="logo">
                <img
                  class="image-side"
                  src="https://www.logodesignlove.com/wp-content/uploads/2010/06/cnn-logo-white-on-red.jpg"
                  alt=""
                />
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
  // document.querySelector(".first-container").innerHTML = "";
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
  <div class='first-container'>  <h1 class="first-container-title">
            Top stories <i class="fa-solid fa-angle-right"></i>
          </h1></div>`;
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${input}&apiKey=3ac5523d43eb420aa810389f8d45a190`
    );

    const data = await response.json();
    if (data.message.startsWith("You have made too many"))
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
    const mainData = data.articles;

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
           ? ` <button class="button-clicked">Latest</button>
          ${array
            .map((el) => `<button class="button-unclicked">${el}</button>`)
            .join("")}`
           : ""
       }
        </div>
      </div>
      <div class="first-container"></div>`;

    document.querySelector(".first-container").style.width = "82rem";

    document.querySelectorAll(".button-unclicked").forEach((el) =>
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
    if (clicked === "Local") differentClicked = "rs";

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${
        differentClicked ? differentClicked : clicked
      }&apiKey=3ac5523d43eb420aa810389f8d45a190`
    );
    const data = await response.json();

    if (data.message.startsWith("You have made too many"))
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
    const mainData = data.articles;

    getHTML(data);
  } catch (err) {
    document.querySelector(".first-container").innerHTML = `${err.message}`;
  }
};
