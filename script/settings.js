"use strict";

const menuBtns = document.querySelectorAll("#menu ul li");
const display = document.querySelector("#display");

const loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
const userAccounts = JSON.parse(localStorage.getItem("accounts"));

console.log(loggedInAs);
console.log(userAccounts);

menuBtns.forEach((el) =>
  el.addEventListener("click", function (e) {
    menuBtns.forEach((el) => el.classList.remove("menu-clicked"));
    e.target.classList.add("menu-clicked");

    if (el.textContent === "Account") {
      display.innerHTML = `
       <div id="display-left">
          <h1>Account Settings</h1>
          <div id="account-basics">
            <h2>Basic Info</h2>
            <div id="account-basics-info">
              <div id="account-pfp" class="flex">
                <span class="wd40">Profile Picture</span>
                <div class="flex wd60">
                  <img
                    src="${loggedInAs.img}"
                    alt=""
                  />
                  <div id="account-pfp-text" class="flex">
                    <p>Upload new picture</p>
                    <p class="red">Remove</p>
                  </div>
                </div>
              </div>
              <div class="basic-info flex basic-name">
                <p class="basic-info-key flex wd40">Name</p>
                <p class="basic-info-value flex wd60">
                 ${
                   loggedInAs._firstName
                     ? `${loggedInAs._firstName}, ${loggedInAs._lastName}`
                     : "Add a name..."
                 }<i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex basic-date-of-birth">
                <p class="basic-info-key flex wd40">Date of Birth</p>
                <p class="basic-info-value flex wd60">
                 ${
                   loggedInAs._dateOfBirth
                     ? `${loggedInAs._dateOfBirth}`
                     : "Add your date of birth..."
                 }
                  <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex basic-gender">
                <p class="basic-info-key flex wd40">Gender</p>
                <p class="basic-info-value flex wd60">
                 ${
                   loggedInAs._gender
                     ? `${loggedInAs._gender}`
                     : "Add a gender..."
                 }<i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex basic-email">
                <p class="basic-info-key flex wd40">Email</p>
                <p class="basic-info-value flex wd60">
                  ${loggedInAs.email} <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
            <div id="account-info">
              <h2>Account info</h2>
              <div class="account-info flex basic-username">
                <p class="wd40">Username</p>
                <p class="account-info-value flex wd60">
                  ${loggedInAs.username} <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="account-info flex basic-password">
                <p class="wd40">Password</p>
                <p class="account-info-value flex wd60">
                  ********** <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
         <div class="control-window flex">
            <i class="fa-solid fa-arrow-left-long"></i>
            <p class="nowrap">Show workbench</p>
          </div>
        <div id="display-right" class="flex display-right-hidden">
            
          <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>
        </div>`;

      const changeNameElement = document.querySelector(".basic-name");
      const changeDateElement = document.querySelector(".basic-date-of-birth");
      const changeGenderElement = document.querySelector(".basic-gender");
      const changeEmailElement = document.querySelector(".basic-email");
      const changePasswordElement = document.querySelector(".basic-password");
      const changeUsernameElement = document.querySelector(".basic-username");

      const controlWindow = document.querySelector(".control-window");

      changeNameElement.addEventListener("click", changeName);
      changeDateElement.addEventListener("click", changeDate);
      changeGenderElement.addEventListener("click", changeGender);
      changeEmailElement.addEventListener("click", changeEmail);
      changePasswordElement.addEventListener("click", changePassword);
      changeUsernameElement.addEventListener("click", changeUsername);

      controlWindow.addEventListener("click", controlWindowHTML);
    } else display.innerHTML = "nigger";
  })
);
const changeName = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeNameElement = document
    .querySelector(".basic-name")
    .querySelector(".basic-info-value");

  changeNameHTML(changeContainer);

  handleIconRotation();

  console.log(changeNameElement);

  const childArrow = changeNameElement.firstElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.add("display-change-name");
  changeContainer.classList.add("display-right-hidden");

  controlWindowHTML();

  const inputInnerText = document.querySelectorAll(".input-text");
  const inputs = document.querySelectorAll("#change-name-bottom input");

  const cancelBtn = document.querySelector("#change-name-cancel-button");

  const form = document.querySelector("#change-name form");
  const firstName = document.querySelector("#first-name");
  const lastName = document.querySelector("#last-name");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const errorMessages = document.querySelectorAll(".input-error-text");

    firstName.classList.remove("input-error");
    lastName.classList.remove("input-error");

    errorMessages.forEach((el) => el.classList.add("hidden"));

    let error;

    if (!firstName.value) {
      firstName.classList.add("input-error");
      firstName.parentElement.lastElementChild.classList.remove("hidden");
      error = 1;
    }
    if (!lastName.value) {
      lastName.classList.add("input-error");
      lastName.parentElement.lastElementChild.classList.remove("hidden");
      error = 1;
    }
    if (error) return;

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

    setTimeout(() => {
      loggedInAs._firstName = firstName.value;
      loggedInAs._lastName = lastName.value;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) => {
        if ((loggedInAs.pin = el.pin)) {
          el._firstName = loggedInAs._firstName;
          el._lastName = loggedInAs._lastName;
        }
      });

      localStorage.setItem("accounts", JSON.stringify(userAccounts));

      changeName();
      const successMessage = document.querySelector(".name-changed");

      successMessage.classList.remove("hidden");
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
      changeNameElement.innerHTML = `${loggedInAs._firstName}, ${loggedInAs._lastName} <i class="fa-solid fa-angle-right" aria-hidden="true"></i>`;
    }, 3000);
  });

  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });
  inputInnerText.forEach((el) =>
    el.addEventListener("click", function () {
      this.previousElementSibling.focus();
    })
  );
  inputs.forEach((el) =>
    el.addEventListener("focus", function () {
      this.nextElementSibling.classList.add("input-text-focused");
      this.classList.remove("input-error");
      this.parentElement
        .querySelector(".input-error-text")
        .classList.add("hidden");

      el.addEventListener("focusout", function () {
        if (!this.value)
          this.nextElementSibling.classList.remove("input-text-focused");
      });
    })
  );
};
const handleIconRotation = function () {
  const icons = document.querySelectorAll(".fa-angle-right");

  icons.forEach((el) => (el.style.transform = "rotate(0deg)"));
};

const changeNameHTML = function (container) {
  return (container.innerHTML = ` <div id="change-name">
            <div id="change-name-top" class="flex">
              <h2>Change name</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-name-bottom" class="flex">
              <h2>Credentials</h2>

              <form action="submit" class="flex">
                <p>Please enter your first and last name.</p>
                <div id="change-name-input-container" class="flex">
                  <div class="flex">
                    <input type="text" name="" id="first-name"/>
                    <p id="first-name" class="input-text">First Name</p>
                      <p class="input-error-text hidden">
                      * Field can not be empty
                    </p>
                  </div>
                  <div class="flex">
                    <input type="text" name="" id="last-name" />
                    <p id="last-name" class="input-text">Last Name</p>
                      <p class="input-error-text hidden">
                      * Field can not be empty
                    </p>
                  </div>
                </div>
                <p>
                  By default, your name will be displayed in your profile
                  preview meaning other people will be able to see it, you can
                  choose to disable this.
                </p>
        
              <div id="change-name-buttons-container">
               <p class="name-changed hidden">
                    First and last name succesfully changed!
                  </p>
                <button id="change-name-save-button" class="change-name-button">
                  Save
                </button>
                <button
                  id="change-name-cancel-button"
                  class="change-name-button"
                >
                  Cancel
                </button>
              </div>
            </form>
              <p id="change-name-bottom-text">
                By choosing to share your name with Us you agree with our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-name-added-container" class="flex">
                <div id="change-name-added-left" class="flex">
                  <p>Username</p>
                  <span>Click here to edit your username</span>
                </div>
                <div id="change-name-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};
const controlWindowHTML = function () {
  const controlWindow = document.querySelector(".control-window");
  const container = document.querySelector("#display-right");

  if (container.classList.contains("display-right-hidden"))
    controlWindow.innerHTML = `
   <i class="fa-solid fa-arrow-right-long"></i>
            <p class="nowrap">Hide workbench</p>`;
  else
    controlWindow.innerHTML = `
  <i class="fa-solid fa-arrow-left-long"></i>
            <p class="nowrap">Show workbench</p>`;

  container.classList.toggle("display-right-hidden");
};

const changeDate = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeDateElement = document
    .querySelector(".basic-date-of-birth")
    .querySelector(".basic-info-value");
  dateOfBirthHTML(changeContainer);

  handleIconRotation();

  const childArrow = changeDateElement.firstElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.add("display-right-hidden");
  changeContainer.classList.remove("display-change-name");

  controlWindowHTML();

  const cancelBtn = document.querySelector("#change-date-cancel-button");

  const year = document.querySelector("#change-date-year");
  const month = document.querySelector("#change-date-month");
  const day = document.querySelector("#change-date-day");

  const form = document.querySelector("#change-date form");

  cancelBtn.addEventListener("click", function () {
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });

  [year, month, day].forEach((el) => {
    el.addEventListener("change", handleDays.bind(null, day, month, year));
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const errorMessage = document.querySelector(".birth-error");
    const inputs = document.querySelectorAll(".change-date-input");

    /*
    I have no idea what i did here, main thing is, it works, it looks through every input and checks if any of them have the "input-error" class, if none of them have it, it removes the error message... somehow...??
    */
    inputs.forEach((el) => {
      el.addEventListener("focus", () => {
        el.classList.remove("input-error");
        let noErrors = 1;
        inputs.forEach((el) => {
          if (el.classList.contains("input-error")) noErrors = 0;
        });
        if (noErrors) errorMessage.classList.add("hidden");
      });
    });
    year.classList.remove("input-error");
    month.classList.remove("input-error");
    day.classList.remove("input-error");

    errorMessage.classList.add("hidden");

    let error;

    if (!year.value) {
      year.classList.add("input-error");
      errorMessage.classList.remove("hidden");
      error = 1;
    }
    if (!month.value) {
      month.classList.add("input-error");
      errorMessage.classList.remove("hidden");
      error = 1;
    }
    if (!day.value) {
      day.classList.add("input-error");
      errorMessage.classList.remove("hidden");
      error = 1;
    }
    if (error) return;

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

    setTimeout(() => {
      loggedInAs._dateOfBirth = `${day.value}/${month.value}/${year.value}`;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) =>
        loggedInAs.pin === el.pin
          ? (el._dateOfBirth = loggedInAs._dateOfBirth)
          : 0
      );

      localStorage.setItem("accounts", JSON.stringify(userAccounts));

      changeDate();
      const successMessage = document.querySelector(".name-changed");

      successMessage.classList.remove("hidden");
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
      changeDateElement.innerHTML = `${day.value}/${month.value}/${year.value} <i class="fa-solid fa-angle-right" aria-hidden="true"></i>`;
    }, 3000);
  });
};
const dateOfBirthHTML = function (container) {
  return (container.innerHTML = `  <div id="change-date">
            <div id="change-date-top" class="flex">
              <h2>Share date of birth</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-date-bottom" class="flex">
              <h2>Date</h2>

              <form action="submit" class="flex">
                <p>Please enter your date of birth.</p>
                <div id="change-date-input-container" class="flex">
               <div class="flex">   <input
                    placeholder="DD"
                    type="number"
                    name=""
                    min="1"
                    max="31"
                    id="change-date-day"
                    class="change-date-input"
                  />
                   </div>
                 <div class="flex"> <input
                    placeholder="MM"
                    type="number"
                    name=""
                    min="1"
                    max="12"
                    id="change-date-month"
                    class="change-date-input"
                  />
                    <p class="input-error-text hidden birth-error">
                      * All fields must be filled
                    </p></div>
               <div class="flex">   <input
                    placeholder="YYYY"
                    type="number"
                    name=""
                    min="1900"
                    max="2024"
                    id="change-date-year"
                    class="change-date-input"
                  />
                    </div>
                  </div>
                <p>
                  We use your age to show or hide news appropriate to the age
                  you provide.
                </p>
                <div id="change-date-buttons-container">
                  <p class="name-changed hidden">Date of birth added!</p>
                  <button
                    id="change-date-save-button"
                    class="change-name-button"
                  >
                    Save
                  </button>
                  <button
                    id="change-date-cancel-button"
                    class="change-name-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <p id="change-date-bottom-text">
                By choosing to share your date of birth with Us you agree to our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-date-added-container" class="flex">
                <div id="change-date-added-left" class="flex">
                  <p>Email</p>
                  <span>Click here to edit your email</span>
                </div>
                <div id="change-date-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};

const handleDays = function (day, month, year) {
  if (
    (month.value == 2 && +year.value % 4 === 0 && +year.value % 100 !== 0) ||
    (month.value == 2 && +year.value % 400 === 0)
  ) {
    day.setAttribute("max", "29");
  } else if (month.value == 2) day.setAttribute("max", "28");
  else if (month.value > 0 && month.value < 8 && +month.value % 2 === 0)
    day.setAttribute("max", "30");
  else if (month.value > 0 && month.value < 8 && +month.value % 2 !== 0)
    day.setAttribute("max", "31");
  else if (month.value > 7 && month.value < 13 && +month.value % 2 === 0)
    day.setAttribute("max", "31");
  else if (month.value > 7 && month.value < 13 && +month.value % 2 !== 0)
    day.setAttribute("max", "30");
};

const changeGender = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeGenderElement = document
    .querySelector(".basic-gender")
    .querySelector(".basic-info-value");
  changeGenderHTML(changeContainer);

  handleIconRotation();
  const childArrow = changeGenderElement.firstElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.remove("display-change-name");
  changeContainer.classList.add("display-right-hidden");

  controlWindowHTML();

  const form = document.querySelector("#change-gender form");
  const selection = document.querySelector("#change-gender-selection");

  const cancelBtn = document.querySelector("#change-gender-cancel-button");

  /*
  At first form needs to input an screen telling the user to choose a gender. Most importantly, I need to remove this event listener after the function happens so that it doesn't interfiere with other form event listeners.
  */
  form.addEventListener("submit", genderHelper);

  selection.addEventListener("focus", function () {
    selection.classList.remove("input-error");
    selection.parentElement.lastElementChild.classList.add("hidden");
  });

  selection.addEventListener("change", function () {
    form.removeEventListener("submit", genderHelper);

    const otherGender = document.querySelector("#change-gender-other");
    const controlButtons = document.querySelector(
      "#change-gender-buttons-container"
    );

    if (selection.value == 4) {
      otherGender.classList.remove("change-gender-hidden");
      controlButtons.style.marginTop = "0rem";

      const gender = document.querySelector("#change-gender-other input");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        let error;

        gender.addEventListener("focus", function () {
          this.classList.remove("input-error");
          this.parentElement.lastElementChild.classList.add("hidden");
        });

        if (!gender.value) {
          gender.classList.add("input-error");
          gender.parentElement.lastElementChild.classList.remove("hidden");
          error = 1;
        }

        if (error) return;

        changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

        setTimeout(() => {
          loggedInAs._gender = `${gender.value}`;

          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

          userAccounts.forEach((el) =>
            loggedInAs.pin === el.pin ? (el._gender = loggedInAs._gender) : 0
          );

          localStorage.setItem("accounts", JSON.stringify(userAccounts));

          changeGender();

          const successMessage = document.querySelector(".name-changed");

          successMessage.classList.remove("hidden");
          setTimeout(() => {
            successMessage.classList.add("hidden");
          }, 5000);
          changeGenderElement.innerHTML = `${gender.value} <i class="fa-solid fa-angle-right" aria-hidden="true"></i>`;
        }, 3000);
      });
    } else {
      otherGender.classList.add("change-gender-hidden");
      controlButtons.style.marginTop = "5rem";

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const gender = selection[selection.value].innerHTML;

        changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

        setTimeout(() => {
          loggedInAs._gender = gender;

          localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

          userAccounts.forEach((el) =>
            loggedInAs.pin === el.pin ? (el._gender = loggedInAs._gender) : 0
          );

          localStorage.setItem("accounts", JSON.stringify(userAccounts));

          changeGender();

          const successMessage = document.querySelector(".name-changed");

          successMessage.classList.remove("hidden");

          setTimeout(() => {
            successMessage.classList.add("hidden");
          }, 5000);
          changeGenderElement.innerHTML = `${gender} <i class="fa-solid fa-angle-right" aria-hidden="true"></i>`;
        }, 3000);
      });
    }
  });

  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });
};
const changeGenderHTML = function (container) {
  return (container.innerHTML = ` <div id="change-gender">
            <div id="change-gender-top" class="flex">
              <h2>Share gender</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-gender-bottom" class="flex">
              <h2>Gender</h2>

              <form action="submit" class="flex">
                <p>Please enter your gender.</p>
                <div id="change-gender-input-container" class="flex">
              <div id="change-gender-container"> 
                  <select name="gender"  id="change-gender-selection">
                    <option value="0" disabled selected>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Ismail</option>
                    <option value="4">Other...</option>
                  </select>
                  <p class="input-error-text hidden"> * Choose a gender</p>
              </div>
                  <div id="change-gender-other" class="change-gender-hidden">
                    <p id="change-gender-text">Enter your gender</p>
                    <input
                      type="text"
                      placeholder="Attack Helicopter..."
                      name=""
                      id=""
                    />
                    <p class="input-error-text hidden">* Field can not be empty </p>
                  </div>
                </div>
                <p>
                  Sharing your gender does not affect the experience you will
                  have in the news page what-so-ever.
                </p>

                <div id="change-gender-buttons-container">
                  <p class="name-changed hidden">Displayed gender changed!</p>
                  <button
                    id="change-gender-save-button"
                    class="change-name-button"
                  >
                    Save
                  </button>
                  <button
                    id="change-gender-cancel-button"
                    class="change-name-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <p id="change-gender-bottom-text">
                By choosing to share your gender with Us you agree to our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-gender-added-container" class="flex">
                <div id="change-gender-added-left" class="flex">
                  <p>Email</p>
                  <span>Click here to edit your email</span>
                </div>
                <div id="change-gender-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};
const genderHelper = function (e) {
  e.preventDefault();
  const form = document.querySelector("#change-gender form");
  const selection = document.querySelector("#change-gender-selection");

  selection.classList.add("input-error");
  selection.parentElement.lastElementChild.classList.remove("hidden");

  /*
  If the selection we chose after clicking on "Gender" is still Gender, then we do NOT remove the gender helper function, and continue to display an error to the user. Otherwise, we remove the event listener, meaning the script will give form another event listener appropriate to the users gender selection.
   */
  if (+selection.value) form.removeEventListener("submit", genderHelper);
};

const changeEmail = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeEmailElement = document
    .querySelector(".basic-email")
    .querySelector(".basic-info-value");
  changeEmailHTML(changeContainer);

  const inputInnerText = document.querySelectorAll(".input-text");
  const inputs = document.querySelectorAll("#change-email input");

  handleIconRotation();
  const childArrow = changeEmailElement.firstElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.remove("display-change-name");
  changeContainer.classList.add("display-right-hidden");

  controlWindowHTML();

  const password = document.querySelector("#change-email-password-input");
  const PIN = document.querySelector("#change-email-pin-input");
  const form = document.querySelector("#change-email form");

  const cancelBtn = document.querySelector("#change-email-cancel-button");

  const credentialsError = document.querySelector(
    ".input-error-text-credentials"
  );

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    password.classList.remove("input-error");
    PIN.classList.remove("input-error");
    credentialsError.classList.add("hidden");

    const errorMessages = document.querySelectorAll(".input-error-text");

    errorMessages.forEach((el) => el.classList.add("hidden"));

    let error;

    if (!password.value) {
      password.classList.add("input-error");
      password.parentElement
        .querySelector(".norm-error")
        .classList.remove("hidden");
      error = 1;
    }
    if (!PIN.value) {
      PIN.classList.add("input-error");
      PIN.parentElement.lastElementChild.classList.remove("hidden");
      error = 1;
    }

    if (error) return;

    if (
      PIN.value !== loggedInAs.pin ||
      password.value !== loggedInAs.password
    ) {
      credentialsError.classList.remove("hidden");
      PIN.classList.add("input-error");
      password.classList.add("input-error");
      return;
    }

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

    setTimeout(() => {
      changeEmailSecond();
    }, 3000);
  });
  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });

  inputInnerText.forEach((el) =>
    el.addEventListener("click", function () {
      this.previousElementSibling.focus();
    })
  );
  inputs.forEach((el) =>
    el.addEventListener("focus", function () {
      this.nextElementSibling.classList.add("input-text-focused");
      this.classList.remove("input-error");
      this.parentElement
        .querySelectorAll(".input-error-text")
        .forEach((el) => el.classList.add("hidden"));

      el.addEventListener("focusout", function () {
        if (!this.value)
          this.nextElementSibling.classList.remove("input-text-focused");
      });
    })
  );
};
const changeEmailHTML = function (container) {
  return (container.innerHTML = `<div id="change-email">
            <div id="change-email-top" class="flex">
              <h2>Change email</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-email-bottom" class="flex">
              <h2>Email</h2>

              <form action="submit" class="flex">
                <p>
                  Before changing your email, you will need to provide your
                  password and PIN for added security.
                </p>

                <div id="change-email-input-container" class="flex">
                  <div>
                    <input
                      type="password"
                      placeholder="Password"
                      name=""
                      id="change-email-password-input"
                    />
                    <p class="input-error-text-credentials hidden">
                      * Password and PIN don't match your account
                    </p>
                    <p class="input-error-text norm-error hidden">
                      * Field can not be empty
                    </p>
                    <a href="../htmls/login-page.html#reset-password" class="forgot-password">Forgot password</a>
                  </div>
                  <div>
                    <input
                      type="password"
                      placeholder="PIN"
                      name=""
                      maxlength="4"
                      id="change-email-pin-input"
                    />
                    <p class="input-error-text hidden">
                      * Field can not be empty
                    </p>
                  </div>
                </div>

                <div id="change-email-buttons-container">
                  <p class="name-changed hidden">Email changed!</p>
                  <button
                    id="change-email-save-button"
                    class="change-name-button"
                  >
                    Proceed
                  </button>
                  <button
                    id="change-email-cancel-button"
                    class="change-name-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <p id="change-email-bottom-text">
                By choosing to change your email you agree to our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-email-added-container" class="flex">
                <div id="change-email-added-left" class="flex">
                  <p>Email</p>
                  <span>Click here to edit your email</span>
                </div>
                <div id="change-email-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};
const changeEmailSecond = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeEmailElement = document.querySelector(".basic-email");

  changeEmailSecondHTML(changeContainer);

  const inputInnerText = document.querySelectorAll(".input-text");
  const inputs = document.querySelectorAll("#change-email-second input");

  const childArrow = changeEmailElement.firstElementChild;

  const firstEmail = document.querySelector("#change-email-second-first");
  const secondEmail = document.querySelector(
    "#change-email-second-confirmation"
  );

  const cancelBtn = document.querySelector("#change-email-cancel-button");
  const allErrors = document.querySelectorAll(".email-error");

  const form = document.querySelector("#change-email-second form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    allErrors.forEach((el) => el.classList.add("hidden"));

    let error;

    if (!firstEmail.value) {
      firstEmail.parentElement
        .querySelector(".norm-error")
        .classList.remove("hidden");
      firstEmail.classList.add("input-error");
      error = 1;
    } else if (!firstEmail.value.endsWith("@gmail.com")) {
      firstEmail.parentElement
        .querySelector(".gmail-error")
        .classList.remove("hidden");
      firstEmail.classList.add("input-error");
      error = 1;
    } else if (firstEmail.value.slice(0, -10).length < 5) {
      firstEmail.parentElement
        .querySelector(".char-error")
        .classList.remove("hidden");
      firstEmail.classList.add("input-error");
      error = 1;
    } else if (firstEmail.value === loggedInAs.email) {
      firstEmail.parentElement
        .querySelector(".owned-error")
        .classList.remove("hidden");
      firstEmail.classList.add("input-error");
      error = 1;
    } else if (userAccounts.some((el) => el.email === firstEmail.value)) {
      firstEmail.parentElement
        .querySelector(".taken-error")
        .classList.remove("hidden");
      firstEmail.classList.add("input-error");
      error = 1;
    }
    if (!secondEmail.value) {
      secondEmail.parentElement
        .querySelector(".second-norm-error")
        .classList.remove("hidden");
      secondEmail.classList.add("input-error");
      error = 1;
    } else if (firstEmail.value !== secondEmail.value) {
      secondEmail.parentElement
        .querySelector(".same-error")
        .classList.remove("hidden");
      secondEmail.classList.add("input-error");
      error = 1;
    }
    if (error) return;

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

    setTimeout(() => {
      loggedInAs.email = `${firstEmail.value}`;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) =>
        loggedInAs.pin === el.pin ? (el.email = loggedInAs.email) : 0
      );

      localStorage.setItem("accounts", JSON.stringify(userAccounts));

      changeEmail();

      const successMessage = document.querySelector(".name-changed");

      successMessage.classList.remove("hidden");
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
      changeEmailElement.innerHTML = `${firstEmail.value} <i class="fa-solid fa-angle-right" aria-hidden="true"></i>`;
    }, 3000);
  });

  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });
  inputInnerText.forEach((el) =>
    el.addEventListener("click", function () {
      this.previousElementSibling.focus();
    })
  );
  inputs.forEach((el) =>
    el.addEventListener("focus", function () {
      this.nextElementSibling.classList.add("input-text-focused");
      this.classList.remove("input-error");
      this.parentElement
        .querySelectorAll(".input-error-text")
        .forEach((el) => el.classList.add("hidden"));

      el.addEventListener("focusout", function () {
        if (!this.value)
          this.nextElementSibling.classList.remove("input-text-focused");
      });
    })
  );
};
const changeEmailSecondHTML = function (container) {
  return (container.innerHTML = `  <div id="change-email-second">
            <div id="change-email-top-second" class="flex">
              <h2>Change email</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-email-bottom-second" class="flex">
              <h2>Email</h2>

              <form action="submit" class="flex">
                <p>Great! Enter a new email you'd like to use.</p>

                <div id="change-email-input-container-second" class="flex">
                  <div>
                    <input type="text" name="" id="change-email-second-first" />
                    <p id="first-name" class="input-text">Email</p>
                    <p class="input-error-text hidden email-error gmail-error">
                      * Email must end in @gmail.com
                    </p>
                    <p class="input-error-text hidden email-error char-error">
                      * Email must be longer than 5 characters
                    </p>
                    <p class="input-error-text hidden email-error norm-error">
                      * Field can not be empty
                    </p>
                     <p class="input-error-text hidden email-error taken-error">
                      * Email already taken
                    </p>
                    <p class="input-error-text hidden email-error owned-error">
                      * You already have this email
                    </p>
                  </div>
                  <div>
                    <input
                      type="text"
                      name=""
                      id="change-email-second-confirmation"
                    />
                    <p id="first-name" class="input-text">Confirm email</p>

                    <p
                      class="input-error-text email-error hidden second-norm-error">
                      * Field can not be empty
                    </p>
                    <p class="input-error-text hidden email-error same-error">
                      * Provided emails do not match
                    </p>
                  </div>
                </div>

                <div id="change-email-buttons-container">
                  <p class="name-changed hidden">Email changed!</p>
                  <button
                    id="change-email-save-button"
                    class="change-name-button"
                  >
                    Save
                  </button>
                  <button
                    id="change-email-cancel-button"
                    class="change-name-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <p id="change-email-bottom-text">
                By choosing to change your email you agree to our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-email-added-container" class="flex">
                <div id="change-email-added-left" class="flex">
                  <p>Email</p>
                  <span>Click here to edit your email</span>
                </div>
                <div id="change-email-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};

const changePassword = function () {
  const changeContainer = document.querySelector("#display-right");

  const changePasswordElement = document
    .querySelector(".basic-password")
    .querySelector(".account-info-value");
  changePasswordHTML(changeContainer);

  const inputInnerText = document.querySelectorAll(".input-text");
  const inputs = document.querySelectorAll("#change-password input");

  handleIconRotation();

  const childArrow = changePasswordElement.firstElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.remove("display-change-name");
  changeContainer.classList.add("display-right-hidden");

  controlWindowHTML();

  const oldPassword = document.querySelector("#change-password-old");
  const newPassword = document.querySelector("#change-password-new");
  const confirmationPassword = document.querySelector(
    "#change-password-confirmation"
  );

  const cancelBtn = document.querySelector("#change-password-cancel-button");
  const allErrors = document.querySelectorAll(".password-error");

  const form = document.querySelector("#change-password form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    allErrors.forEach((el) => el.classList.add("hidden"));

    let error;

    if (!oldPassword.value) {
      oldPassword.parentElement
        .querySelector(".norm-error")
        .classList.remove("hidden");
      oldPassword.classList.add("input-error");
      error = 1;
    } else if (oldPassword.value !== loggedInAs.password) {
      oldPassword.parentElement
        .querySelector(".old-error")
        .classList.remove("hidden");
      oldPassword.classList.add("input-error");
      error = 1;
    }

    if (!newPassword.value) {
      newPassword.parentElement
        .querySelector(".norm-error")
        .classList.remove("hidden");
      newPassword.classList.add("input-error");
      error = 1;
    } else if (newPassword.value === loggedInAs.password) {
      newPassword.parentElement
        .querySelector(".own-error")
        .classList.remove("hidden");
      newPassword.classList.add("input-error");
      error = 1;
    }

    if (!confirmationPassword.value) {
      confirmationPassword.parentElement
        .querySelector(".norm-error")
        .classList.remove("hidden");
      confirmationPassword.classList.add("input-error");
      error = 1;
    } else if (confirmationPassword.value !== newPassword.value) {
      confirmationPassword.parentElement
        .querySelector(".same-error")
        .classList.remove("hidden");
      confirmationPassword.classList.add("input-error");
      error = 1;
    }
    if (error) return;

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

    setTimeout(() => {
      loggedInAs.password = `${newPassword.value}`;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) => {
        if (loggedInAs.pin === el.pin) {
          el.password = loggedInAs.password;
        }
      });

      localStorage.setItem("accounts", JSON.stringify(userAccounts));

      changePassword();

      const successMessage = document.querySelector(".name-changed");

      successMessage.classList.remove("hidden");
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
    }, 3000);
  });

  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });
  inputInnerText.forEach((el) =>
    el.addEventListener("click", function () {
      this.previousElementSibling.focus();
    })
  );
  inputs.forEach((el) =>
    el.addEventListener("focus", function () {
      this.nextElementSibling.classList.add("input-text-focused");
      this.classList.remove("input-error");
      this.parentElement
        .querySelectorAll(".input-error-text")
        .forEach((el) => el.classList.add("hidden"));

      el.addEventListener("focusout", function () {
        if (!this.value)
          this.nextElementSibling.classList.remove("input-text-focused");
      });
    })
  );
};
const changePasswordHTML = function (container) {
  return (container.innerHTML = ` <div id="change-password">
            <div id="change-password-top" class="flex">
              <h2>Change password</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-password-bottom" class="flex">
              <h2>Password</h2>

              <form action="submit" class="flex">
                <p>
                  Please enter your old password and then choose a new password.
                </p>

                <div id="change-password-input-container" class="flex">
                  <div>
                    <input type="password" name="" id="change-password-old"/>
                    <p id="first-name" class="input-text">Old password</p>
                    <a
                      href="../htmls/login-page.html#reset-password"
                      class="forgot-password"
                      >Forgot password</a
                    >

                    <p class="input-error-text old-error hidden password-error">
                      * Password does not match your old password
                    </p>

                    <p class="input-error-text norm-error hidden password-error">
                      * Field can not be empty
                    </p>
                  </div>
                  <div>
                    <input type="password" name="" id="change-password-new" />
                    <p id="first-name" class="input-text">New password</p>

                    <p class="input-error-text norm-error hidden password-error">
                      * Field can not be empty
                    </p>
                    <p class="input-error-text own-error hidden password-error">
                      * Password can't be your old password
                    </p>
                  </div>
                  <div>
                    <input
                      type="password"
                      name=""
                       id="change-password-confirmation"
                    />
                    <p id="first-name" class="input-text">Confirm password</p>


                    <p class="input-error-text norm-error hidden password-error">
                      * Field can not be empty
                    </p>
                    <p class="input-error-text same-error hidden password-error">
                      * Passwords do not match
                    </p>
                  </div>
                </div>

                <div id="change-password-buttons-container">
                  <p class="name-changed hidden">Password changed!</p>
                  <button
                    id="change-password-save-button"
                    class="change-name-button"
                  >
                    Save
                  </button>
                  <button
                    id="change-password-cancel-button"
                    class="change-name-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <p id="change-password-bottom-text">
                By choosing to change your password you agree to our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-password-added-container" class="flex">
                <div id="change-password-added-left" class="flex">
                  <p>Email</p>
                  <span>Click here to edit your password</span>
                </div>
                <div id="change-password-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};

const changeUsername = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeUsernameElement = document
    .querySelector(".basic-username")
    .querySelector(".account-info-value");

  changeUsernameHTML(changeContainer);

  const inputInnerText = document.querySelector(".input-text");
  const input = document.querySelector("#change-username input");

  handleIconRotation();

  console.log(changeUsernameElement);
  const childArrow = changeUsernameElement.firstElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.remove("display-change-name");
  changeContainer.classList.add("display-right-hidden");

  controlWindowHTML();

  const newUsername = document.querySelector("#change-username-new");

  const allErrors = document.querySelectorAll(".username-error");
  const cancelBtn = document.querySelector("#change-username-cancel-button");

  const form = document.querySelector("#change-username form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    allErrors.forEach((el) => el.classList.add("hidden"));

    let error;

    if (!newUsername.value) {
      newUsername.parentElement
        .querySelector(".norm-error")
        .classList.remove("hidden");
      newUsername.classList.add("input-error");
      error = 1;
    } else if (newUsername.value === loggedInAs.username) {
      newUsername.parentElement
        .querySelector(".own-error")
        .classList.remove("hidden");
      newUsername.classList.add("input-error");
      error = 1;
    } else if (userAccounts.some((el) => el.username === newUsername.value)) {
      newUsername.parentElement
        .querySelector(".taken-error")
        .classList.remove("hidden");
      newUsername.classList.add("input-error");
      error = 1;
    }

    if (error) return;

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning"></i>`;

    setTimeout(() => {
      loggedInAs.username = `${newUsername.value}`;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) => {
        if (loggedInAs.pin === el.pin) el.username = loggedInAs.username;
      });

      localStorage.setItem("accounts", JSON.stringify(userAccounts));

      changeUsername();

      const successMessage = document.querySelector(".name-changed");

      successMessage.classList.remove("hidden");
      setTimeout(() => {
        successMessage.classList.add("hidden");
      }, 5000);
      changeUsernameElement.innerHTML = `${newUsername.value}<i class="fa-solid fa-angle-right" aria-hidden="true"></i>`;
    }, 3000);
  });

  cancelBtn.addEventListener("click", function (e) {
    e.preventDefault();
    changeContainer.innerHTML = `  <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>`;
    changeContainer.classList.remove("display-change-name");
    childArrow.style.transform = "rotate(0deg)";
  });
  inputInnerText.addEventListener("click", function () {
    this.previousElementSibling.focus();
  });
  input.addEventListener("focus", function () {
    this.nextElementSibling.classList.add("input-text-focused");
    this.classList.remove("input-error");
    this.parentElement
      .querySelectorAll(".input-error-text")
      .forEach((el) => el.classList.add("hidden"));

    input.addEventListener("focusout", function () {
      if (!this.value)
        this.nextElementSibling.classList.remove("input-text-focused");
    });
  });
};
const changeUsernameHTML = function (container) {
  return (container.innerHTML = `<div id="change-username">
            <div id="change-username-top" class="flex">
              <h2>Change username</h2>
              <p>2/19/2024</p>
            </div>
            <div id="change-username-bottom" class="flex">
              <h2>Username</h2>

              <form action="submit" class="flex">
                <p>What would you like other people to call you?</p>

                <div id="change-username-input-container" class="flex">
                  <div>
                    <input type="text" name="" id="change-username-new" />
                    <p id="first-name" class="input-text">New username</p>

                    <p class="input-error-text taken-error hidden username-error">
                      * Username already taken
                    </p>

                    <p class="input-error-text own-error hidden username-error">
                      * You're already using this username
                    </p>

                    <p class="input-error-text norm-error hidden username-error">
                      * Field can not be empty
                    </p>
                  </div>
                </div>
                <p>
                  You can choose whether to show your username or first and last
                  name to other users in the privacy tab.
                </p>

                <div id="change-username-buttons-container">
                  <p class="name-changed hidden">Username changed!</p>
                  <button
                    id="change-username-save-button"
                    class="change-name-button"
                  >
                    Save
                  </button>
                  <button
                    id="change-username-cancel-button"
                    class="change-name-button"
                  >
                    Cancel
                  </button>
                </div>
              </form>
              <p id="change-username-bottom-text">
                By choosing to change your username you agree to our
                <a href="#">Terms and Conditions</a>
              </p>
              <div id="change-username-added-container" class="flex">
                <div id="change-username-added-left" class="flex">
                  <p>Email</p>
                  <span>Click here to edit your password</span>
                </div>
                <div id="change-username-added-right">
                  <i class="fa-solid fa-pen"></i> <span>Edit</span>
                </div>
              </div>
            </div>
          </div>`);
};

//TODO: (maybe) Add getting new PIN code if the user forgot it (Requires username and password)

//TODO: Create the username change page
