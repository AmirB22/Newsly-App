/*assigning vrabiles */
const slidingContainer = document.querySelector(".sliding-container");
const signUpContainer = document.querySelector(".sign-up-container");
const logInContainer = document.querySelector(".log-in-container");
const forgotPasswordContainer = document.querySelector(
  ".forgot-password-container"
);

const SignUpTransferBtn = document.querySelector(".log-sign-up");

//prettier-ignore
const bttmSlidingContainerText = document.querySelector(".log-in-ways-container");
const alreadyLoggedText = document.querySelector(".already-logged-in");

/*getting localstorage */
const userAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
let Logged = JSON.parse(localStorage.getItem("logged")) || false;
let loggedInAs = JSON.parse(localStorage.getItem("loggedInAs")) || {};
let LoggedIn;

/**
 * When page loads, we chech if the user is already logged in, if they are, we hide the log in form and tell them that
 * they are already logged in.
 */
const checkIfLoggedIn = function () {
  if (Logged) {
    logInContainer.style.opacity = "0";
    setTimeout(() => {
      logInContainer.innerHTML = "";
    }, 650);
    slidingContainer.style.transform = "translateX(-50%)";
    slidingContainer.style.borderRadius = "0px";
    slidingContainer.style.width = "100%";
    bttmSlidingContainerText.style.opacity = "1";
    //prettier-ignore
    bttmSlidingContainerText.innerHTML = `
    <a class="back-to-site-href" href="./index.html">
    <button class="back-to-site-button">
    <i class="fa-solid fa-arrow-left"></i>
     Back to site </button>
    </a>
      <button class="log-out logout">
      <i class="fa-solid fa-arrow-right-from-bracket"></i>
       Log out</button>`;

    if (!alreadyLoggedText.innerHTML)
      //prettier-ignore
      alreadyLoggedText.innerHTML = `
      <h1>You are already logged in as ${loggedInAs.username}</h1>
       <p>Go back to the site and enjoy everything its got to offer</p>`;

    /*Allowing user to Log out if they want to change accounts */
    document.querySelector(".logout").addEventListener("click", function () {
      helper("Log in");
      LoggedIn = false;
      loggedInAs = {};
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
      localStorage.setItem("logged", JSON.stringify(LoggedIn));
      Logged = JSON.parse(localStorage.getItem("logged")) || false;
    });
  } else {
    slidingContainer.style.transform = "translateX(0%)";
    slidingContainer.style.borderRadius = "15rem 0rem 0rem 15rem";
    slidingContainer.style.width = "50%";
    alreadyLoggedText.innerHTML = ``;
    bttmSlidingContainerText.innerHTML = `
    <div class="log-in-ways-container">
          <h1 class="sliding-title">Log in using</h1>
          <div class="log-in-ways">
            <p class="google"><i class="fa-brands fa-google"></i></p>
            <p class="facebook"><i class="fa-brands fa-facebook-f"></i></p>
            <p class="instagram"><i class="fa-brands fa-instagram"></i></p>
            <p class="pinterest"><i class="fa-brands fa-pinterest"></i></p>
          </div>
        </div>
`;
  }
};
checkIfLoggedIn();

/**
 * Global error rendering function for signup and login forms, used to render errors.
 * @param {String} inputName used to see where the error occured, and where the error message needs to be displayed, along with
 * changing the appropriate border color.
 * @param {String} message used to tell the function what to put inside the error.
 */
const renderInputErrors = function (inputName, message) {
  const signupEmailInput = document.querySelector("#email");
  const signupFirstPswInput = document.querySelector("#first-password");
  const signupScndPswInput = document.querySelector("#confirm-password");
  const sigupUsernameInput = document.querySelector("#signup-username");

  const loginUsernameInput = document.querySelector("#username");
  const loginPasswordInput = document.querySelector("#password");

  //prettier-ignore
  const forgotPasswordUsernameInput = document.querySelector("#forgot-password-username");
  //prettier-ignore
  const forgotPasswordEmailInput = document.querySelector("#forgot-password-email");
  const forgotPasswordPinInput = document.querySelector("#forgot-password-pin");

  //prettier-ignore
  const changePasswordFirstPasswordInput = document.querySelector("#change-password-first");
  //prettier-ignore
  const changePasswordConfirmPasswordInput = document.querySelector("#change-password-confirm")

  //prettier-ignore
  let element;
  if (inputName === "signup-email") {
    signupEmailInput.style.borderColor = "red";
    element = ".error-email";
  }
  if (inputName === "signup-first-password") {
    signupFirstPswInput.style.borderColor = "red";
    element = ".error-first-password";
  }
  if (inputName === "signup-second-password") {
    signupScndPswInput.style.borderColor = "red";
    element = ".error-scnd-password";
  }
  if (inputName === "signup-username") {
    sigupUsernameInput.style.borderColor = "red";
    element = ".error-signup-username";
  }

  if (inputName === "login-username") {
    loginUsernameInput.style.borderColor = "red";
    element = ".error-username";
  }
  if (inputName === "login-password") {
    loginPasswordInput.style.borderColor = "red";
    element = ".error-password";
  }
  if (inputName === "login-credentials") {
    loginUsernameInput.style.borderColor = "red";
    loginPasswordInput.style.borderColor = "red";
    element = ".error-credentials";
  }

  if (inputName === "forgot-password-email") {
    forgotPasswordEmailInput.style.borderColor = "red";
    element = ".forgot-password-error-email";
  }
  if (inputName === "forgot-password-username") {
    forgotPasswordUsernameInput.style.borderColor = "red";
    element = ".forgot-password-error-username";
  }
  if (inputName === "forgot-password-pin") {
    forgotPasswordPinInput.style.borderColor = "red";
    element = ".forgot-password-error-pin";
  }
  if (inputName === "forgot-password-credentials") {
    forgotPasswordUsernameInput.style.borderColor = "red";
    forgotPasswordEmailInput.style.borderColor = "red";
    forgotPasswordPinInput.style.borderColor = "red";
    element = ".forgot-password-error-credentials";
  }

  if (inputName === "change-password-first-password") {
    changePasswordFirstPasswordInput.style.borderColor = "red";
    element = ".change-password-error-first";
  }
  if (inputName === "change-password-confirm-password") {
    changePasswordConfirmPasswordInput.style.borderColor = "red";
    element = ".change-password-error-confirm";
  }

  document.querySelector(`${element}`).classList.remove("hidden");
  document.querySelector(`${element}`).textContent = `* ${message}`;
};
/**
 * Helper function, as the name suggests, used to help the general function in gathering parameters.
 * @param {String} translateTo the parameter is later used to determined the further params for the general function.
 * Based on the string, the general function knows where to move the sliding container and which text to show to the user.
 */
const helper = function (translateTo) {
  document.querySelector(".go-back-container").innerHTML = "";
  document.querySelector(".sliding-image").style.top = "0rem";
  /*If user clicks Log out, width of sliding container is 100% so we need to change width and position */
  slidingContainer.style.width = "50%";
  alreadyLoggedText.innerHTML = ``;
  document.querySelector(".change-password-container")
    ? (document.querySelector(".change-password-container").innerHTML = "")
    : "";
  document.querySelector(".forgot-password-container")
    ? (document.querySelector(".forgot-password-container").innerHTML = "")
    : " ";

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
 * General function is used to show the Sign-up or Log-in forms based on where the user clicks.
 * @param {String | Number} translateValue used in telling the general command where to place the sliding container
 * (left or right side)
 * @param {String} translateTo main param, used in basically creating every other param, and used for a lot of ternary
 * operations inside the function to determine what elemts to modify inside the container
 * @param {Number} opacity used to hide or show texts inside the sliding container and the login & signup containers for
 * smoother effects, not allowing the text to appear out of nowhere but to slowly fade in/out
 * @param {String} html used to put html in an appropriate container after clicking login || signup.
 */
const general = function (translateValue, translateTo, opacity, html) {
  window.location.hash = translateTo === "Sign up" ? "#signup" : "#login";

  slidingContainer.style.transform = `translateX(${translateValue}%)`;
  translateTo === "Sign up"
    ? (slidingContainer.style.borderRadius = "0rem 15rem 15rem 0rem")
    : (slidingContainer.style.borderRadius = "15rem 0rem 0rem 15rem");
  bttmSlidingContainerText.style.opacity = "0";

  setTimeout(() => {
    bttmSlidingContainerText.innerHTML = `<h1 class="sliding-title">${translateTo} using</h1>
          <div class="log-in-ways">
            <p class="google"><i class="fa-brands fa-google"></i></p>
            <p class="facebook"><i class="fa-brands fa-facebook-f"></i></p>
            <p class="instagram"><i class="fa-brands fa-instagram"></i></p>
            <p class="pinterest"><i class="fa-brands fa-pinterest"></i></p>
          </div>`;
    bttmSlidingContainerText.style.opacity = "1";
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

    if (translateTo === "Sign up")
      document
        .querySelector(".sign-log-in")
        .addEventListener("click", function () {
          helper("Log in");
        });
    else {
      document
        .querySelector(".log-sign-up")
        .addEventListener("click", function () {
          helper("Sign up");
        });
      document
        .querySelector(".forgot-password")
        .addEventListener("click", forgotPassword);
    }
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
/*Checking hash and showing signup or login form based on the hash. */

let pin;
const generatePIN = function () {
  pin = `${Math.floor(Math.random() * 10)}${Math.floor(
    Math.random() * 10
  )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
  userAccounts.forEach((el) => {
    if (el.pin === pin) generatePIN();
  });
  return pin;
};
let getPin = "";

const forgotPassword = function () {
  window.location.hash = "#reset-password";

  setTimeout(() => {
    document.querySelector(
      ".go-back-container"
    ).innerHTML = `   <button class="go-back"><i class="fa-solid fa-arrow-left"></i> Go back </button>`;
    document.querySelector(".go-back").addEventListener("click", function () {
      document.querySelector(".forgot-password-container").style.opacity = "0";
      document.querySelector(".change-password-container").style.opacity = "0";
      window.history.back();
    });
  }, 1300);
  document.querySelector(
    ".forgot-password-container"
  ).innerHTML = `  <p class="forgot-password-error-credentials"></p>
   <div class="forgot-password-username-container">
            <p>Enter your account's username</p>
            <input
              class="forgot-password-username"
              type="text"
              placeholder="Username"
              name=""
              id="forgot-password-username"
            />
            <p class="forgot-password-error-username hidden">
            </p>
          </div>
          <div class="forgot-password-email-container">
            <p>Enter your account's email</p>
            <input
              class="forgot-password-email"
              type="text"
              placeholder="Email"
              name=""
              id="forgot-password-email"
            />
            <p class="forgot-password-error-email hidden"></p>
          </div>
          <div class="forgot-password-pin-container">
            <p>Enter your account's PIN</p>
            <input
              class="forgot-password-pin"
              autocomplete="pin"
              type="password"
              maxlength="4"
              placeholder="PIN"
              name=""
              id="forgot-password-pin"
            />
            <p class="forgot-password-error-pin hidden"></p>
          </div>
   <button class="forgot-password-confirm">Confirm</button>`;

  logInContainer.style.opacity = "0";
  signUpContainer.style.opacity = "0";
  bttmSlidingContainerText.style.opacity = "0";
  setTimeout(() => {
    logInContainer.innerHTML = "";
    signUpContainer.innerHTML = "";
    bttmSlidingContainerText.innerHTML = "";
    forgotPasswordContainer.style.opacity = "1";
    document.querySelector(".go-back").style.opacity = "1";
  }, 1300);

  slidingContainer.style.transform = "translateX(-50%)";
  slidingContainer.style.borderRadius = "15rem";
  document.querySelector(".sliding-image").style.top = "75%";

  document
    .querySelector(".forgot-password-container")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      let error = 0;
      let found = false;
      let foundAccount = {};
      const username = document.querySelector(".forgot-password-username");
      const email = document.querySelector(".forgot-password-email");
      const pin = document.querySelector(".forgot-password-pin");

      const arrOfInputs = [username, email, pin];

      arrOfInputs.forEach((el) => {
        el.nextElementSibling.classList.add("hidden");
        el.style.borderColor = "white";
      });
      document
        .querySelector(".forgot-password-error-credentials")
        .classList.add("hidden");

      if (!email.value) {
        renderInputErrors("forgot-password-email", "Email can not be empty");
        error++;
      }
      if (!username.value) {
        //prettier-ignore
        renderInputErrors("forgot-password-username","Username can not be empty");
        error++;
      }
      if (!pin.value) {
        renderInputErrors("forgot-password-pin", "Pin can not be empty");
        error++;
      }

      if (error) return;

      userAccounts.forEach((el) => {
        if (
          el.username === username.value &&
          el.email === email.value &&
          el.pin === pin.value
        ) {
          found = true;
          foundAccount = el;
          getPin = el.pin;
        }
      });
      if (found) {
        document.querySelector(".forgot-password-container").style.opacity =
          "0";
        document.querySelector(
          ".change-password-container"
        ).innerHTML = `  <form class="change-password-container"> <div class="forgot-password-first-password">
            <p>Enter a new password</p>
            <input class="change-password-first-password" type="password" autocomplete="first-password" name="" id="change-password-first" />
            <p class="change-password-error-first"></p> 
          </div>
          <div class="forgot-password-confirm-password">
            <p>Confirm password</p>
            <input class="change-password-confirm-password" type="password" autocomplete="confirm-password" name="" id="change-password-confirm" />
            <p class="change-password-error-confirm"></p>
          </div>
          <button class="forgot-password-reset">Reset password</button></form>`;

        setTimeout(() => {
          document.querySelector(".forgot-password-container").innerHTML = "";
        }, 600);
        setTimeout(() => {
          document.querySelector(".change-password-container").style.opacity =
            "1";
        }, 1000);
        document
          .querySelector(".change-password-container")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            let error = 0;
            //prettier-ignore
            const firstPassword = document.querySelector(".change-password-first-password");
            //prettier-ignore
            const confirmPassword = document.querySelector(".change-password-confirm-password")

            const arrOfInputs = [confirmPassword, firstPassword];

            arrOfInputs.forEach((el) => {
              el.nextElementSibling.classList.add("hidden");
              el.style.borderColor = "white";
            });
            if (!firstPassword.value) {
              //prettier-ignore
              renderInputErrors("change-password-first-password","Password can not be empty");
              error++;
            }
            if (!confirmPassword.value) {
              //prettier-ignore
              renderInputErrors("change-password-confirm-password","Confirmation can not be empty")
              error++;
            }
            if (firstPassword.value === foundAccount.password) {
              //prettier-ignore
              renderInputErrors("change-password-first-password","Password can not be the same as your previous password")
              error++;
            } else if (confirmPassword.value !== firstPassword.value) {
              //prettier-ignore
              renderInputErrors("change-password-confirm-password","Passwords do not match")
              error++;
            }
            if (error) return;

            userAccounts.forEach((el) => {
              if (el.pin === getPin) {
                el.password = firstPassword.value;
              }
            });
            localStorage.setItem("accounts", JSON.stringify(userAccounts));

            document.querySelector(".change-password-container").style.opacity =
              "0";
            document.querySelector(".sliding-image").style.top = "0rem";
            setTimeout(() => {
              document.querySelector(
                ".change-password-container"
              ).innerHTML = `<div class="change-password-changed">
              <h1 class="change-password-message">Password successfully changed</h1>
              <p class="change-password-new-password">New password is <span>${firstPassword.value}</span></p></div>`;
              document.querySelector(
                ".change-password-container"
              ).style.opacity = "1";
              bttmSlidingContainerText.innerHTML = `<button class="changed-password-log-in-button"><i class="fa-solid fa-right-to-bracket"></i>Log in</button>`;
              setTimeout(() => {
                bttmSlidingContainerText.style.opacity = "1";
                document
                  .querySelector(".changed-password-log-in-button")
                  .addEventListener("click", function () {
                    document.querySelector(
                      ".change-password-container"
                    ).style.opacity = 0;
                    setTimeout(() => {
                      document.querySelector(
                        ".change-password-container"
                      ).innerHTML = "";
                    }, 500);
                    helper("Log in");
                  });
              }, 500);
            }, 500);
          });
      } else {
        renderInputErrors(
          "forgot-password-credentials",
          "No account found under given credentials"
        );
        error++;
      }
      if (error) return;
    });
};

const checkHash = function () {
  if (!window.location.hash) {
    Logged ? checkIfLoggedIn() : (window.location.hash = "#login");
  } else if (window.location.hash === "#signup") {
    Logged ? checkIfLoggedIn() : helper("Sign up");
  } else if (window.location.hash === "#login") {
    Logged ? checkIfLoggedIn() : helper("Log in");
  } else if (window.location.hash === "#reset-password")
    Logged ? checkIfLoggedIn() : forgotPassword();
};
checkHash();
const signedUp = function () {
  let error = 0;

  const email = document.querySelector("#email");
  const firstPassword = document.querySelector("#first-password");
  const secondPassword = document.querySelector("#confirm-password");
  const username = document.querySelector("#signup-username");

  const arrayOfInputs = [username, secondPassword, firstPassword, email];
  const date = `${new Date().getDate()}/${
    new Date().getMonth() + 1
  }/${new Date().getFullYear()}`;

  const PIN = generatePIN();
  /*Removing any errors after clicking the signup button and rendering new ones */
  arrayOfInputs.forEach((el) => {
    el.nextElementSibling.classList.add("hidden");
    el.style.borderColor = "lime";
  });

  /*Rendering errors */
  if (!email.value) {
    renderInputErrors("signup-email", "Email can not be empty");
    error++;
  } else if (!email.value.endsWith("@gmail.com")) {
    renderInputErrors("signup-email", "Email must end in @gmail.com");
    error++;
  } else if (email.value.slice(0, -10).length < 5) {
    //prettier-ignore
    renderInputErrors("signup-email", "Must be at least 5 characters");
    error++;
  }
  if (!firstPassword.value) {
    renderInputErrors("signup-first-password", "Password can not be empty");
    error++;
  }
  if (!username.value) {
    renderInputErrors("signup-username", "Username can not be empty");
    error++;
  }
  if (!secondPassword.value) {
    //prettier-ignore
    renderInputErrors("signup-second-password","Confirmation can not be empty");
    error++;
  }
  if (firstPassword.value !== secondPassword.value) {
    renderInputErrors("signup-second-password", "Passwords do not match");
    error++;
  }
  //prettier-ignore
  if (!userAccounts ||userAccounts.some((el) => el.email === email.value)) {
    //prettier-ignore
    renderInputErrors("signup-email", "Email already taken");
    error++;
  }
  //prettier-ignore
  if (!userAccounts || userAccounts.some((el) => el.username === username.value)) {
    renderInputErrors("signup-username", "Username already taken");
    error++
}
  if (error) return;

  /*Showing message that the account was created*/
  accountCreated(PIN);
  signUpContainer.innerHTML = "";

  /*Actually adding the account to localStorage */
  userAccounts.push({
    email: email.value,
    username: username.value,
    password: firstPassword.value,
    joined: date,
    pin: PIN,
    img: "https://svet-scandal.rs/wp-content/uploads/2023/01/barbara-bobak.webp",
  });
  localStorage.setItem("accounts", JSON.stringify(userAccounts));
};
const accountCreated = function (pin) {
  /*Centering sliding container and making it 100% width, adding text,and a Log in button*/
  slidingContainer.style.transform = "translateX(-50%)";
  slidingContainer.style.borderRadius = "0px";
  slidingContainer.style.width = "100%";
  alreadyLoggedText.innerHTML = `<p class="pin">Your PIN is ${pin}</p><h1>Successfully created an account</h1> <p>You can go back and log in!</p> `;
  bttmSlidingContainerText.innerHTML = `<button class="created-account-log-in-button"><i class="fa-solid fa-right-to-bracket"></i>Log in</button>`;
  const newLogInBtn = document.querySelector(".created-account-log-in-button");

  newLogInBtn.addEventListener("click", () => {
    helper("Log in");
  });
};
const loggedIn = function () {
  let error = 0;
  const username = document.querySelector("#username");
  const password = document.querySelector("#password");

  const arrOfLoginInputs = [username, password];

  /*Removing visible errors and rendering new ones */
  arrOfLoginInputs.forEach((el) => {
    el.style.borderColor = "lime";
    el.nextElementSibling.classList.add("hidden");
  });
  document.querySelector(".error-credentials").classList.add("hidden");

  /*Rendering new errors */
  if (!username.value) {
    renderInputErrors("login-username", "Username can not be empty");
    error++;
  }
  if (!password.value) {
    renderInputErrors("login-password", "Password can not be empty");
    error++;
  }

  if (error) return;

  /*Creating a variable thats gonna help us see if the username and password exist as a pair in the userAccounts array */
  let found = false;
  let name = "";
  //prettier-ignore
  userAccounts.forEach((el) => {
    if (el.username === username.value && el.password === password.value) {
      LoggedIn = true;
      found = true;
      name = el.username;

      /*Getting current account info */
      let loggedInAs = {
        username: el.username,
        password: el.password,
        email: el.email,
        joined: el.joined
      };

      /*Changing localStorage data, changing loggedIn to True and LoggedInAs to the currently logged in account */
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
      localStorage.setItem("logged", JSON.stringify(LoggedIn));
    }
  });

  /*If account wasn't found we render an error */
  if (!found) {
    //prettier-ignore
    renderInputErrors("login-credentials","No account found under the given credentials")
    error++;
  }
  if (error) return;

  alreadyLoggedText.innerHTML = `
  <h1>Successfully logged in as ${name}!</h1>
   <p>Go back to the site and enjoy everything its got to offer</p>`;
  logInContainer.style.opacity = "0";
  setTimeout(() => {
    logInContainer.innerHTML = "";
  }, 650);

  /*Changing value of Logged, then calling a function to change sliding container text and width/position */
  Logged = JSON.parse(localStorage.getItem("logged")) || false;
  checkIfLoggedIn();
};
/*giving sign-up button an event listener to start off the whole process*/
SignUpTransferBtn.addEventListener("click", function () {
  helper("Sign up");
});
document.querySelector(".log-in-form").addEventListener("submit", function (e) {
  e.preventDefault();
  loggedIn();
});
window.addEventListener("hashchange", checkHash);

//TODO: OPTIMIZE CODE AND MAKE IT NICER
