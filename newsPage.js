let Logged = JSON.parse(localStorage.getItem("logged")) || false;

if (!Logged) document.body.innerHTML = `<p>You are not logged in</p>`;

let date;
let milliseconds;
let when;
const getHTML = function (data) {
  for (let i = 0; i < data.articles.length; i) {
    date = new Date(`${data.articles[i].publishedAt}`);
    milliseconds = date.getTime();
    if (milliseconds - new Date().getMilliseconds() < 86_400_000)
      when = "Today";
    else if (milliseconds - new Date().getTime() < 2 * 86_400_000)
      when = "Yesterday";
    else if (milliseconds - new Date().getTime() < 7 * 86_400_000)
      when = "Last week";
    else when = "While ago...";
    if (i === 19 || i === 20 || i === 21 || i === 21) break;
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
const getNewsFromInput = async function (input) {
  document.querySelector(".first-container").innerHTML = "";

  const response = await fetch(
    `https://newsapi.org/v2/everything?domains=cnn.com&apiKey=3ac5523d43eb420aa810389f8d45a190`
  );
  const data = await response.json();
  console.log(data);
  const mainData = data.articles;

  getHTML(data);
};
const search = document.querySelector(".search-input");
document
  .querySelector(".search-container")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    getNewsFromInput(search.value);
  });
