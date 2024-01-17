/*assigning vrabiles */
const slidingContainer = document.querySelector(".sliding-container");
const signUpContainer = document.querySelector(".sign-up-container");
const logInContainer = document.querySelector(".log-in-container");

const SignUpTransferBtn = document.querySelector(".log-sign-up");
const userAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
let Logged = JSON.parse(localStorage.getItem("logged")) || false;

const checkIfLoggedOn = function () {
  if (Logged) {
    slidingContainer.style.transform = "translateX(-50%)";
    slidingContainer.style.borderRadius = "0px";
    slidingContainer.style.width = "100%";
    document.querySelector(
      ".log-in-ways-container"
    ).innerHTML = `<button class="log-out">Log out</button>`;
    if (document.querySelector(".already-logged-in").innerHTML === "")
      document.querySelector(
        ".already-logged-in"
      ).innerHTML = `<h1>You are already logged in</h1> <p>Go back to the site and enjoy everything its got to offer</p>`;

    document.querySelector(".log-out").addEventListener("click", function () {
      LoggedIn = false;
      localStorage.setItem("logged", JSON.stringify(LoggedIn));
      Logged = JSON.parse(localStorage.getItem("logged")) || false;
      checkIfLoggedOn();
    });
  } else {
    slidingContainer.style.transform = "translateX(0%)";
    slidingContainer.style.borderRadius = "15rem 0rem 0rem 15rem";
    slidingContainer.style.width = "50%";
    document.querySelector(".already-logged-in").innerHTML = ``;
    document.querySelector(
      ".log-in-ways-container"
    ).innerHTML = ` <div class="log-in-ways-container">
          <h1 class="sliding-title">Log in using</h1>
          <div class="log-in-ways">
            <p class="google"><i class="fa-brands fa-google"></i></p>
            <p class="facebook"><i class="fa-brands fa-facebook-f"></i></p>
            <p class="instagram"><i class="fa-brands fa-instagram"></i></p>
            <p class="pinterest"><i class="fa-brands fa-pinterest"></i></p>
          </div>
        </div>`;
  }
};
checkIfLoggedOn();
let LoggedIn;
/**
 *
 * @param {String} translateTo the parameter is later used to determined the further params for the general function.
 * Based on the string, the general function knows where to move the sliding container and which text to show to the user.
 */
const helper = function (translateTo) {
  slidingContainer.style.width = "50%";
  document.querySelector(".already-logged-in").innerHTML = ``;
  let translateValue, opacity, html;
  if (translateTo === "Sign up") {
    translateValue = "-100";
    opacity = 1;
    html = `
     <div class="signup-credentials-container">
          <div class="sign-up-title">
            <h2>Sign up</h2>
            <p>To get full website access</p>
          </div>
          <form class="sign-up-form" action="">
            <div class="signup-username-container">
              <input
                type="text"
                placeholder="Username"
                name="signup-username"
                autocomplete="Username"
                id="signup-username"
              />
              <p class="error-signup-username hidden"></p>
            </div>
            <div class="signup-email-container">
              <input
                type="text"
                autocomplete="Email"
                placeholder="Email"
                name="email"
                id="email"
              />
              <p class="error-email hidden"></p>
            </div>
            <div class="signup-password-container">
              <div class="first-password">
                <input
                  type="password"
                  placeholder="Password"
                  name="first-password"
                  autocomplete="password"
                  id="first-password"
                />
                <p class="error-first-password hidden"></p>
              </div>
              <div class="second-password">
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirm-password"
                  autocomplete="confirm-password"
                  id="confirm-password"
                />
                <p class="error-scnd-password hidden"></p>
              </div>
            </div>
            <div class="signup-button-container">
              <button class="sign-up-button">Sign up</button>
            </div>
          </form>
        </div>
        <div class="bottom-of-sign-up">
          <p class="bottom-text">
            Already have an account <span class="sign-log-in">Log in!</span>
          </p>
        </div>
`;
  } else if (translateTo === "Log in") {
    translateValue = "0";
    opacity = 0;
    html = `
         <div class="credentials-container">
          <div class="log-in-title">
            <h2>Log in</h2>
            <p>And browse the news</p>
          </div>
          <form class="log-in-form" action="">
          <p class="error-credentials"></p>
            <div class="username-container">
              <input
                type="text"
                placeholder="Username"
                name="username"
                autocomplete="Username"
                id="username"
              />
              <p class="error-username"></p>
            </div>
            <div class="password-container">
              <input
                type="password"
                placeholder="Password"
                name="password"
                autocomplete="Password"
                id="password"
              />
              <p class="error-password"></p>
              <p class="forgot-password">Forgot password?</p>
            </div>
            <div class="log-in-button-container">
              <button class="log-in-button">Log in</button>
            </div>
          </form>
        </div>
        <div class="bottom-of-log-in">
          <p class="bottom-text">
            Don't have an account? <span class="log-sign-up">Sign up!</span>
          </p>
        </div>
`;
  }
  general(translateValue, translateTo, opacity, html);
};

/**
 *
 * @param {String | Number} translateValue used in telling the general command where to place the sliding container
 * (left or right side)
 * @param {String} translateTo main param, used in basically creating every other param, and used for a lot of ternary
 * operations inside the function to determine what elemts to modify inside the container
 * @param {Number} opacity used to hide or show texts inside the sliding container and the login & signup containers for
 * smoother effects, not allowing the text to appear out of nowhere but to slowly fade in/out
 * @param {String} html used to put html in an appropriate container after clicking login || signup.
 */
const general = function (translateValue, translateTo, opacity, html) {
  slidingContainer.style.transform = `translateX(${translateValue}%)`;
  translateTo === "Sign up"
    ? (slidingContainer.style.borderRadius = "0rem 15rem 15rem 0rem")
    : (slidingContainer.style.borderRadius = "15rem 0rem 0rem 15rem");
  document.querySelector(".log-in-ways-container").style.opacity = "0";

  setTimeout(() => {
    document.querySelector(
      ".log-in-ways-container"
    ).innerHTML = `<h1 class="sliding-title">${translateTo} using</h1>
          <div class="log-in-ways">
            <p class="google"><i class="fa-brands fa-google"></i></p>
            <p class="facebook"><i class="fa-brands fa-facebook-f"></i></p>
            <p class="instagram"><i class="fa-brands fa-instagram"></i></p>
            <p class="pinterest"><i class="fa-brands fa-pinterest"></i></p>
          </div>`;
    document.querySelector(".log-in-ways-container").style.opacity = "1";
    signUpContainer.style.opacity = opacity;
    logInContainer.style.opacity = `${opacity === 1 ? 0 : 1}`;
  }, 1300);
  setTimeout(() => {
    translateTo === "Sign up"
      ? (logInContainer.innerHTML = "")
      : (signUpContainer.innerHTML = "");

    translateTo === "Sign up"
      ? (signUpContainer.innerHTML = `${html}`)
      : (logInContainer.innerHTML = `${html}`);

    translateTo === "Sign up"
      ? document
          .querySelector(".sign-log-in")
          .addEventListener("click", function () {
            helper("Log in");
          })
      : document
          .querySelector(".log-sign-up")
          .addEventListener("click", function () {
            helper("Sign up");
          });

    translateTo === "Sign up"
      ? document
          .querySelector(".sign-up-form")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            signedUp();
          })
      : document
          .querySelector(".log-in-form")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            loggedIn();
          });
  }, 1000);
};

/*giving sign-up button an event listener to start off the whole process*/
SignUpTransferBtn.addEventListener("click", function () {
  helper("Sign up");
});
document.querySelector(".log-in-form").addEventListener("submit", function (e) {
  e.preventDefault();
  loggedIn();
});

const signedUp = function () {
  let error = 0;
  const emailInput = document.querySelector("#email");
  const firstPswInput = document.querySelector("#first-password");
  const secondPswInput = document.querySelector("#confirm-password");
  const usernameInput = document.querySelector("#signup-username");

  const arrayOfInputs = [
    usernameInput,
    secondPswInput,
    firstPswInput,
    emailInput,
  ];
  arrayOfInputs.forEach((el) => {
    el.nextElementSibling.classList.add("hidden");
    el.style.borderColor = "lime";
  });

  let email = emailInput.value;
  if (!emailInput.value) {
    emailInput.style.borderColor = "red";
    document.querySelector(".error-email").classList.remove("hidden");
    document.querySelector(".error-email").textContent =
      "* Email can not be empty";
    error++;
  } else if (!emailInput.value.endsWith("@gmail.com")) {
    emailInput.style.borderColor = "red";
    document.querySelector(".error-email").classList.remove("hidden");
    document.querySelector(".error-email").textContent =
      "* Email must end in @gmail.com";
    error++;
  } else if (email.slice(0, -10).length < 5) {
    emailInput.style.borderColor = "red";
    document.querySelector(".error-email").classList.remove("hidden");
    document.querySelector(".error-email").textContent =
      "* Email must have more than 5 characters";
    error++;
  }
  if (!firstPswInput.value) {
    firstPswInput.style.borderColor = "red";
    document.querySelector(".error-first-password").classList.remove("hidden");
    document.querySelector(".error-first-password").textContent =
      "* Password can not be empty";
    error++;
  }
  if (!usernameInput.value) {
    usernameInput.style.borderColor = "red";
    document.querySelector(".error-signup-username").classList.remove("hidden");
    document.querySelector(".error-signup-username").textContent =
      "* Username can not be empty";
    error++;
  }
  if (!secondPswInput.value) {
    secondPswInput.style.borderColor = "red";
    document.querySelector(".error-scnd-password").classList.remove("hidden");
    document.querySelector(".error-scnd-password").textContent =
      "* Confirmation can not be empty";
    error++;
  }
  if (firstPswInput.value !== secondPswInput.value) {
    secondPswInput.style.borderColor = "red";
    document.querySelector(".error-scnd-password").classList.remove("hidden");
    document.querySelector(".error-scnd-password").textContent =
      "* Passwords do not match";
    error++;
  }
  if (
    !userAccounts ||
    userAccounts.some((el) => el.email === emailInput.value)
  ) {
    emailInput.style.borderColor = "red";
    document.querySelector(".error-email").classList.remove("hidden");
    document.querySelector(".error-email").textContent = "* Email taken";
    error++;
  }
  if (
    !userAccounts ||
    userAccounts.some((el) => el.username === usernameInput.value)
  ) {
    usernameInput.style.borderColor = "red";
    document.querySelector(".error-signup-username").classList.remove("hidden");
    document.querySelector(".error-signup-username").textContent =
      "* Username taken";
    error++;
  }
  if (error) return;

  let username = usernameInput.value;
  let password = firstPswInput.value;
  accountCreated();

  userAccounts.push({
    email,
    username,
    password,
    img: "https://svet-scandal.rs/wp-content/uploads/2023/01/barbara-bobak.webp",
  });

  localStorage.setItem("accounts", JSON.stringify(userAccounts));
};

const accountCreated = function () {
  slidingContainer.style.transform = "translateX(-50%)";
  slidingContainer.style.borderRadius = "0px";
  slidingContainer.style.width = "100%";
  document.querySelector(
    ".already-logged-in"
  ).innerHTML = `<h1>Successfully created an account</h1> <p>You can go back and log in!</p>`;
  document.querySelector(
    ".log-in-ways-container"
  ).innerHTML = `<button class="created-account-log-in-button">Log in</button>`;
  document
    .querySelector(".created-account-log-in-button")
    .addEventListener("click", function () {
      helper("Log in");
    });
};
const loggedIn = function () {
  let error = 0;
  const usernameInput = document.querySelector("#username");
  const passwordInput = document.querySelector("#password");

  const arrOfLoginInputs = [usernameInput, passwordInput];
  arrOfLoginInputs.forEach((el) => {
    el.style.borderColor = "lime";
    el.nextElementSibling.classList.add("hidden");
  });

  document.querySelector(".error-credentials").classList.add("hidden");

  if (!usernameInput.value) {
    usernameInput.style.borderColor = "red";
    document.querySelector(".error-username").classList.remove("hidden");
    document.querySelector(".error-username").textContent =
      "* Username can not be empty";
    error++;
  }
  if (!passwordInput.value) {
    passwordInput.style.borderColor = "red";
    document.querySelector(".error-login-password").classList.remove("hidden");
    document.querySelector(".error-login-password").textContent =
      "* Password can not be empty";
    error++;
  }
  if (error) return;
  let found = false;
  let name = "";
  userAccounts.forEach((el) => {
    if (
      el.username === usernameInput.value &&
      el.password === passwordInput.value
    ) {
      LoggedIn = true;
      found = true;
      name = el.username;
      localStorage.setItem("logged", JSON.stringify(LoggedIn));
    }
  });
  if (found) console.log(`Logged in as ${name}`);
  else {
    document.querySelector(".error-credentials").classList.remove("hidden");
    document.querySelector(".error-credentials").textContent =
      "* No account found under given credentials";
    passwordInput.style.borderColor = "red";
    usernameInput.style.borderColor = "red";
    error++;
  }
  document.querySelector(
    ".already-logged-in"
  ).innerHTML = `<h1>Successfully logged in as ${name}!</h1> <p>Go back to the site and enjoy everything its got to offer`;
  Logged = JSON.parse(localStorage.getItem("logged")) || false;
  checkIfLoggedOn();
  if (error) return;
};

//TODO: OPTIMIZE CODE AND MAKE FORGOT PASSWORD FUNCTIONAL!