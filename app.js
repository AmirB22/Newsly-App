//Assigning variables
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const mainPage = document.querySelector(".main-page");
const mainPageHeight = mainPage.getBoundingClientRect().height;
const headerHeight = header.getBoundingClientRect().height;
// const emailInput = document.querySelector(".email-input");
const upBtn = document.querySelector(".button-up");

const reviewLeft = document.querySelector(".review-left");
const reviewRight = document.querySelector(".review-right");

const arrOfReviews = document.querySelectorAll(".review");
const arrOfNavLists = document.querySelectorAll(".nav-li");

const animatedBtn = document.querySelectorAll(".animated");

const updateNavOpacity = function (opacity) {
  arrOfNavLists.forEach((el) => {
    el.style.opacity = opacity;
  });
};
const userAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
let Logged = JSON.parse(localStorage.getItem("logged")) || false;
let loggedInAs = JSON.parse(localStorage.getItem("loggedInAs")) || {};
let LoggedIn;

/*Hovering over an element in the navbar modifies every other element's opacity to 0.5. */
arrOfNavLists.forEach((el) => {
  el.addEventListener("mouseover", (e) => {
    updateNavOpacity("0.5");
    if (!Logged && e.target.classList.contains("get-news")) {
      e.target.style.cursor = "not-allowed";
      return;
    }
    e.target.style.opacity = "1";
  });
  el.addEventListener("mouseleave", () => updateNavOpacity("1"));
});

const checkIfLoggedIn = function () {
  if (Logged) {
    document.querySelector(".news-page").classList.remove("disabled");

    document.querySelector(".right-side-nav").innerHTML = `
              <img
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
              </div>
  `;

    document.querySelector(".log-out").addEventListener("click", function () {
      LoggedIn = false;
      loggedInAs = {};
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
      localStorage.setItem("logged", JSON.stringify(LoggedIn));
      Logged = JSON.parse(localStorage.getItem("logged")) || false;
      checkIfLoggedIn();
    });
  } else if (!Logged && userAccounts.length !== 0) {
    const newsContainers = document.querySelectorAll(".news-container");
    newsContainers.forEach(
      (el) =>
        (el.innerHTML = `     
   <h1>You aren't logged in yet!</h1>
                    <p>Log in to see the news.</p>`)
    );
    document
      .querySelectorAll(".news-page")
      .forEach((el) => el.classList.add("disabled"));
    document.querySelectorAll(".news-page").forEach((el) =>
      el.addEventListener("click", function (e) {
        e.preventDefault();
      })
    );
    document.querySelectorAll(".news-page").forEach((el) =>
      el.addEventListener("mouseover", function () {
        newsContainers.forEach((el) => (el.style.bottom = "-7.73rem"));
        newsContainers.forEach((el) => (el.style.height = "4.6rem"));
        newsContainers.forEach((el) => (el.style.padding = "1rem"));
        newsContainers.forEach(
          (el) => (el.style.boxShadow = "0px 10px 10px rgba(0, 0, 0, 0.3)")
        );
      })
    );
    document.querySelectorAll(".news-page").forEach((el) =>
      el.addEventListener("mouseleave", function () {
        newsContainers.forEach((el) => (el.style.bottom = "-1rem"));
        newsContainers.forEach((el) => (el.style.height = "0rem"));
        newsContainers.forEach((el) => (el.style.padding = "0rem 1rem"));
        newsContainers.forEach((el) => (el.style.boxShadow = "none"));
      })
    );
    document.querySelector(
      ".right-side-nav"
    ).innerHTML = `<a class="nav-button" href="./login-page.html#login"><button>Log in</button></a>`;
  } else if (!Logged && userAccounts.length === 0) {
    newsContainers.forEach(
      (el) =>
        (el.innerHTML = `      <h1>You don't have an account!</h1>
                    <p>Create one to see the news.</p>`)
    );
    document
      .querySelectorAll(".news-page")
      .forEach((el) => el.classList.add("disabled"));
    document.querySelectorAll(".news-page").forEach((el) =>
      el.addEventListener("click", function (e) {
        e.preventDefault();
      })
    );

    document.querySelectorAll(".news-page").forEach((el) =>
      el.addEventListener("mouseover", function () {
        newsContainers.forEach((el) => (el.style.bottom = "-7.73rem"));
        newsContainers.forEach((el) => (el.style.height = "4.6rem"));
        newsContainers.forEach((el) => (el.style.padding = "1rem"));
        newsContainers.forEach(
          (el) => (el.style.boxShadow = "0px 10px 10px rgba(0, 0, 0, 0.3)")
        );
      })
    );
    document.querySelectorAll(".news-page").forEach((el) =>
      el.addEventListener("mouseleave", function () {
        newsContainers.forEach((el) => (el.style.bottom = "-1rem"));
        newsContainers.forEach((el) => (el.style.height = "0rem"));
        newsContainers.forEach((el) => (el.style.padding = "0rem 1rem"));
        newsContainers.forEach((el) => (el.style.boxShadow = "none"));
      })
    );
    document.querySelector(
      ".right-side-nav"
    ).innerHTML = `<a class="nav-button" href="./login-page.html#signup"><button>Create an account</button></a>`;
  }
};
checkIfLoggedIn();

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

/*Second page-> Every button gets an event listener, when the button is clicked, the paragraph that's originally hidden
gets modified in a way to create a smooth animation of it appearing on screen. */
animatedBtn.forEach((el) =>
  el.addEventListener("click", function (e) {
    const textContainer = e.target.parentElement.nextElementSibling;

    /*If the button we clicked on already was active (paragraph already showing) 
    then we want to hide the paragraph and reset the icons rotation so that it points downwards. */
    if (textContainer.classList.contains("active")) {
      textContainer.classList.remove("menu-container-active");
      e.target.style.transform = "rotate(0deg)";
      textContainer.classList.remove("active");
      return;
    }
    /*If the button we clicked on wasn't active, we remove the active class from every other
    element so that if any other element is already showing their paragraph, we hide it, then
    we show the paragraph thats the child element of the button that we pressed, again modifying it
    in a way to create a smooth effect of the paragraph appearing and the icon rotating upwards. */
    animatedBtn.forEach((el) => {
      el.parentElement.nextElementSibling.classList.remove("active");
      el.parentElement.nextElementSibling.classList.remove(
        "menu-container-active"
      );
      el.style.transform = "rotate(0deg)";

      textContainer.classList.add("active");
      textContainer.classList.add("menu-container-active");
      e.target.style.transform = "rotate(180deg)";
    });
  })
);

/*Observer function, waits for us to leave the main page to show the navbar, navbar shows a little before
we leave the main page, exactly when the navbar would fit perfectly on the screen before the second page starts. */
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    upBtn.style.height = "5.5rem";
    upBtn.style.fontSize = "3rem";
  } else {
    nav.classList.remove("sticky");
    upBtn.style.height = "0rem";
    upBtn.style.fontSize = "0rem";
  }
};
/*Observator declaration and option object */
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${mainPageHeight - 2.2 * headerHeight}px`,
});
headerObserver.observe(header);

/*Used in showNextReview and showPrevReview, used to update the Translate transformations of every element with the "review"
 class based on their review dataset */
const updateTransform = function () {
  arrOfReviews.forEach((el) => {
    el.style.transform = `translateX(${
      +el.dataset.review * 100
    }%) translate(-50%, -50%)`;
  });
};
/*Used in the same two functions, used to update the dataset only when we reach the maximum or minimum amount of reviews. If
we click to go to a review that doesn't exist (before/after our first/last review), we send the last/first review
to the center of the page. */
const updateDataset = function (number) {
  arrOfReviews.forEach((el) => {
    el.dataset.review = +el.dataset.review + number;
  });
};

/*Clicking right button shows us the next review with the use of the 2 previous functions */
const showNextReview = function () {
  arrOfReviews.forEach((el) => {
    +el.dataset.review--;
    arrOfReviews.forEach((el) => {
      if (el.dataset.review == -4) {
        updateDataset(4);
        updateTransform();
      }
    });
    updateTransform();
  });
};

/*Clicking left button shows us the previous review with the use of the 2 previous functions */
const showPrevReview = function () {
  arrOfReviews.forEach((el) => {
    +el.dataset.review++;

    arrOfReviews.forEach((el) => {
      if (el.dataset.review == 4) {
        {
          updateDataset(-4);
          updateTransform();
        }
      }
    });
    updateTransform();
  });
};

/*When page loads, we want every review to be in their place. */
arrOfReviews.forEach((el) => updateTransform());

reviewRight.addEventListener("click", showNextReview);
reviewLeft.addEventListener("click", showPrevReview);

const showProfilePreview = function () {
  if (
    document
      .querySelector(".account-preview")
      .classList.contains("account-active")
  ) {
    hideProfilePreview();
    return;
  }
  document.querySelector(".account-preview").classList.add("account-active");
};
const hideProfilePreview = function () {
  document.querySelector(".account-preview").classList.remove("account-active");
};
const profilePicture = document.querySelector(".profile-picture");

if (Logged) {
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
}
const hamburgerMenu = document.querySelector(".phone-hamburger");

hamburgerMenu.addEventListener("click", (e) => {
  if (hamburgerMenu.firstElementChild.classList.contains("fa-bars")) {
    hamburgerMenu.firstElementChild.classList.replace("fa-bars", "fa-x");
    document
      .querySelector(".phone-container")
      .classList.toggle("phone-container-active");
  } else {
    if (
      !e.target.classList.contains("get-news") &&
      !e.target.classList.contains("phone-container")
    ) {
      hamburgerMenu.firstElementChild.classList.replace("fa-x", "fa-bars");
      document
        .querySelector(".phone-container")
        .classList.toggle("phone-container-active");
    }
  }
});
