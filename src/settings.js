"use strict";

const menuList = document.querySelector("#menu-list");
const menuBtns = document.querySelectorAll("#menu-list li");
const display = document.querySelector("#display");

const loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));
const userAccounts = JSON.parse(localStorage.getItem("accounts"));

const prefBtn = document.querySelector("#menu-preferences");
const accountBtn = document.querySelector("#menu-account");
const bookmarkBtn = document.querySelector("#menu-bookmarks");

console.log(loggedInAs);
console.log(userAccounts);

const menuContainer = document.querySelector("#menu");
const mainContainer = document.querySelector("#main");
const mainList = document.querySelector("#main-list");
const mainListBtns = document.querySelectorAll("#main-list li");

mainListBtns.forEach((el) =>
  el.addEventListener("click", function () {
    removeMainListClickedClasses();
    this.classList.add("main-list-clicked");

    if (this.id === "main-home") window.location.href = "#home";
    if (this.id === "main-membership") window.location.href = "#membership";
    if (this.id === "main-pricing") window.location.href = "#pricing";
    if (this.id === "main-about") window.location.href = "#about";
  })
);

let themeTimeout, adTimeout, displayTimeout, dataTimeout, removeMainListTimeout;

const removeCLickedClasses = () =>
  menuBtns.forEach((el) => el.classList.remove("menu-clicked"));
const removeMainListClickedClasses = () => {
  const mainListBtns = document.querySelectorAll("#main-list li");

  mainListBtns.forEach((el) => el.classList.remove("main-list-clicked"));
};

const loadProfileContainer = function () {
  const profileContainer = document.querySelector(".profile-container");

  profileContainer.innerHTML = `  <div class="profile-image">
            <img
              src="${
                loggedInAs
                  ? loggedInAs.img
                  : "https://art.pixilart.com/sr22591edfc8058.png"
              }"
              alt="User's profile picture"
            />
            <div class="view-profile-hover">
              <p>View</p>
            </div>
          </div>
          <div class="profile-info">
            <h3 class="profile-name">${
              loggedInAs
                ? `${loggedInAs._firstName}, ${loggedInAs._lastName}`
                : ""
            }</h3>
            ${
              loggedInAs
                ? `<p class="view-profile">View profile</p>`
                : `<p class="login-profile">Log in</p>`
            }
          </div>`;

  const viewProfile = document.querySelector(".view-profile");
  const viewProfileImage = document.querySelector(".view-profile-hover");

  [viewProfileImage, viewProfile].forEach((el) =>
    el.addEventListener("click", function () {
      clearTimeout(displayTimeout);
      clearTimeout(adTimeout);
      clearTimeout(themeTimeout);
      clearTimeout(dataTimeout);
      clearTimeout(removeMainListTimeout);
      prefBtn.classList.add("menu-clicked");
      accountPage();
    })
  );
};
loadProfileContainer();

const accountPage = function () {
  removeCLickedClasses();
  addMainList();

  accountBtn.classList.add("menu-clicked");

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
                    src="${loggedInAs ? loggedInAs.img : "Log in"}"
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
                   loggedInAs
                     ? loggedInAs._firstName
                       ? `${loggedInAs._firstName}, ${loggedInAs._lastName}`
                       : "Add a name..."
                     : "Log in"
                 }<i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex basic-date-of-birth">
                <p class="basic-info-key flex wd40">Date of Birth</p>
                <p class="basic-info-value flex wd60">
                 ${
                   loggedInAs
                     ? loggedInAs._dateOfBirth
                       ? `${loggedInAs._dateOfBirth}`
                       : "Add your date of birth..."
                     : "Log in"
                 }
                  <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex basic-gender">
                <p class="basic-info-key flex wd40">Gender</p>
                <p class="basic-info-value flex wd60">
                 ${
                   loggedInAs
                     ? loggedInAs._gender
                       ? `${loggedInAs._gender}`
                       : "Add a gender..."
                     : "Log in"
                 }<i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex basic-email">
                <p class="basic-info-key flex wd40">Email</p>
                <p class="basic-info-value flex wd60">
                  ${
                    loggedInAs ? loggedInAs.email : "Log in"
                  } <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
            <div id="account-info">
              <h2>Account info</h2>
              <div class="account-info flex basic-username">
                <p class="wd40">Username</p>
                <p class="account-info-value flex wd60">
                  ${
                    loggedInAs ? loggedInAs.username : "Log in"
                  } <i class="fa-solid fa-angle-right"></i>
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
};

const addMainList = function () {
  if (document.querySelector("#main-list")) return;
  mainContainer.insertAdjacentHTML(
    "afterbegin",
    ` <ul id="main-list">
        <li id="main-home">Home</li>
        <li id="main-membership">Membership</li>
        <li id="main-pricing">Pricing</li>
        <li id="main-about">About</li>
      </ul> `
  );
  const mainListBtns = document.querySelectorAll("#main-list li");

  mainListBtns.forEach((el) =>
    el.addEventListener("click", function () {
      mainListBtns.forEach((el) => el.classList.remove("main-list-clicked"));
      this.classList.add("main-list-clicked");

      if (this.id === "main-home") window.location.href = "#home";
      if (this.id === "main-membership") window.location.href = "#membership";
      if (this.id === "main-pricing") window.location.href = "#pricing";
      if (this.id === "main-about") window.location.href = "#about";
    })
  );
  const moreMenuBtn = document.querySelector("#menu-more");

  if (!moreMenuBtn) return;
  moreMenuBtn.remove();
};
const removeMainList = function () {
  if (!document.querySelector("#main-list")) return;

  menuList.insertAdjacentHTML("beforeend", ` <li id="menu-more">More</li>`);

  const mainList = document.querySelector("#main-list");
  const moreMenuBtn = document.querySelector("#menu-more");

  moreMenuBtn.addEventListener("click", () => (window.location.href = "#more"));
  mainList.remove();
};

window.addEventListener("hashchange", function () {
  menuContainer.classList.remove("menu-smaller");
  display.classList.remove("display-bigger");
  if (window.location.href.endsWith("preferences")) prefPage();
  if (window.location.href.endsWith("change-theme")) changeTheme();
  if (window.location.href.endsWith("change-ads")) changeAds();
  if (window.location.href.endsWith("more")) morePage();
  if (window.location.href.endsWith("about")) aboutPage();
  if (window.location.href.endsWith("membership")) membershipPage();
  if (window.location.href.endsWith("pricing")) pricingPage();
  if (window.location.href.endsWith("bookmarks")) bookmarksPage();
  if (window.location.href.endsWith("home")) {
    homePage();
    menuContainer.classList.add("menu-smaller");
    display.classList.add("display-bigger");
  }
  /*prettier-ignore */
  if (window.location.href.endsWith("change-display-information")) changeDisplayInfo();
  if (window.location.href.endsWith("change-data-sharing")) changeDataSharing();
  if (window.location.href.endsWith("account")) accountPage();
  if (
    !window.location.href.endsWith("pricing") &&
    !window.location.href.endsWith("about") &&
    !window.location.href.endsWith("home") &&
    !window.location.href.endsWith("membership")
  )
    removeMainListClickedClasses();
});

const prefPage = function () {
  removeCLickedClasses();

  addMainList();

  prefBtn.classList.add("menu-clicked");
  display.innerHTML = `  <div id="preferences">
          <div class="preferences-top">
            <div class="perference-title-container">
              <h1>Preferences</h1>
              <p>
                The place where you can make your experience on the site
                special.
              </p>
            </div>
          </div>
          <div class="preferences-bottom">
            <div class="preference">
              <div class="pref-top">
                <span class="fluent--paint-brush-16-filled dog"></span>
              </div>
              <div class="pref-bottom">
                <div>
                  <h1>Theme</h1>
                  <p>
                    Choose the theme of the website. Use one of the premade
                    themes or create your own.
                  </p>
                  
                </div>
               <div class="load-button-container"> 

                <button class="pref-bottom-button">
                  Edit now <i class="fa-solid fa-pen-to-square"></i> 
                </button> </div>
              </div>
            </div>
            <div class="preference">
              <div class="pref-top">
            <span class="fa-solid--ad dog"></span>
              </div>
              <div class="pref-bottom">
                <div>
                  <h1>Advertising</h1>
                  <p>
                    Modify the settings around what advertisements you get, how
                    many advertisements etc.
                  </p>
                </div>
                <div class="load-button-container">
                <button class="pref-bottom-button">
                  Change
                </button>
                </div>
              </div>
            </div>
            <div class="preference">
              <div class="pref-top">
             <span class="fluent--code-text-16-filled dog"></span>
              </div>
              <div class="pref-bottom">
                <div>
                  <h1>Displayed information</h1>
                  <p>
                    Choose what information gets displayed when other people
                    click on your profile
                  </p>
                </div>
                 <div class="load-button-container">
                <button class="pref-bottom-button">
                  Change
                </button>
                </div>
              </div>
            </div>
            <div class="preference">
              <div class="pref-top">
                <span class="fa6-solid--language dog"></span>
              </div>
              <div class="pref-bottom">
                <div>
                  <h1>Language</h1>
                  <p>
                    Share your preferred language and get in contact with other
                    people that share the same language
                  </p>
                </div>
                <div class="load-button-container"> 
            <select class="pref-bottom-select" id="choose-language">
              <option value="Choose" disabled selected >Choose</option>
              <option value="Afrikaans">Afrikaans</option>
              <option value="Albanian">Albanian</option>
              <option value="Arabic">Arabic</option>
              <option value="Armenian">Armenian</option>
              <option value="Basque">Basque</option>
              <option value="Bengali">Bengali</option>
              <option value="Bulgarian">Bulgarian</option>
              <option value="Catalan">Catalan</option>
              <option value="Cambodian">Cambodian</option>
              <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
              <option value="Croatian">Croatian</option>
              <option value="Czech">Czech</option>
              <option value="Danish">Danish</option>
              <option value="Dutch">Dutch</option>
              <option value="English">English</option>
              <option value="Estonian">Estonian</option>
              <option value="Fiji">Fiji</option>
              <option value="Finnish">Finnish</option>
              <option value="French">French</option>
              <option value="Georgian">Georgian</option>
              <option value="German">German</option>
              <option value="Greek">Greek</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Hebrew">Hebrew</option>
              <option value="Hindi">Hindi</option>
              <option value="Hungarian">Hungarian</option>
              <option value="Icelandic">Icelandic</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Irish">Irish</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Javanese">Javanese</option>
              <option value="Korean">Korean</option>
              <option value="Latin">Latin</option>
              <option value="Latvian">Latvian</option>
              <option value="Lithuanian">Lithuanian</option>
              <option value="Macedonian">Macedonian</option>
              <option value="Malay">Malay</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Maltese">Maltese</option>
              <option value="Maori">Maori</option>
              <option value="Marathi">Marathi</option>
              <option value="Mongolian">Mongolian</option>
              <option value="Nepali">Nepali</option>
              <option value="Norwegian">Norwegian</option>
              <option value="Persian">Persian</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Quechua">Quechua</option>
              <option value="Romanian">Romanian</option>
              <option value="Russian">Russian</option>
              <option value="Samoan">Samoan</option>
              <option value="Serbian">Serbian</option>
              <option value="Slovak">Slovak</option>
              <option value="Slovenian">Slovenian</option>
              <option value="Spanish">Spanish</option>
              <option value="Swahili">Swahili</option>
              <option value="Swedish ">Swedish </option>
              <option value="Tamil">Tamil</option>
              <option value="Tatar">Tatar</option>
              <option value="Telugu">Telugu</option>
              <option value="Thai">Thai</option>
              <option value="Tibetan">Tibetan</option>
              <option value="Tonga">Tonga</option>
              <option value="Turkish">Turkish</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Urdu">Urdu</option>
              <option value="Uzbek">Uzbek</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Welsh">Welsh</option>
              <option value="Xhosa">Xhosa</option>
            </select>
            </div>
              </div>
            </div>
            <div class="preference">
              <div class="pref-top">
          <span class="mdi--timezone dog"></span>
              </div>
              <div class="pref-bottom">
                <div>
                  <h1>Your timezone</h1>
                  <p>Share your timezone</p>
                </div>
                <div class="load-button-container"> 
           <select name="timezone_offset" id="choose-timezone" class="pref-bottom-select">
            <option value="Choose" disabled selected >Choose</option>
            <option value="-12:00">(GMT -12:00) Eniwetok, Kwajalein</option>
            <option value="-11:00">(GMT -11:00) Midway Island, Samoa</option>
            <option value="-10:00">(GMT -10:00) Hawaii</option>
            <option value="-09:50">(GMT -9:30) Taiohae</option>
            <option value="-09:00">(GMT -9:00) Alaska</option>
            <option value="-08:00">(GMT -8:00) Pacific Time (US &amp; Canada)</option>
            <option value="-07:00">(GMT -7:00) Mountain Time (US &amp; Canada)</option>
            <option value="-06:00">(GMT -6:00) Central Time (US &amp; Canada), Mexico City</option>
            <option value="-05:00">(GMT -5:00) Eastern Time (US &amp; Canada), Bogota, Lima</option>
            <option value="-04:50">(GMT -4:30) Caracas</option>
            <option value="-04:00">(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz</option>
            <option value="-03:50">(GMT -3:30) Newfoundland</option>
            <option value="-03:00">(GMT -3:00) Brazil, Buenos Aires, Georgetown</option>
            <option value="-02:00">(GMT -2:00) Mid-Atlantic</option>
            <option value="-01:00">(GMT -1:00) Azores, Cape Verde Islands</option>
            <option value="+00:00">(GMT) Western Europe Time, London, Lisbon, Casablanca</option>
            <option value="+01:00">(GMT +1:00) Brussels, Copenhagen, Madrid, Paris</option>
            <option value="+02:00">(GMT +2:00) Kaliningrad, South Africa</option>
            <option value="+03:00">(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg</option>
            <option value="+03:50">(GMT +3:30) Tehran</option>
            <option value="+04:00">(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi</option>
            <option value="+04:50">(GMT +4:30) Kabul</option>
            <option value="+05:00">(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent</option>
            <option value="+05:50">(GMT +5:30) Bombay, Calcutta, Madras, New Delhi</option>
            <option value="+05:75">(GMT +5:45) Kathmandu, Pokhara</option>
            <option value="+06:00">(GMT +6:00) Almaty, Dhaka, Colombo</option>
            <option value="+06:50">(GMT +6:30) Yangon, Mandalay</option>
            <option value="+07:00">(GMT +7:00) Bangkok, Hanoi, Jakarta</option>
            <option value="+08:00">(GMT +8:00) Beijing, Perth, Singapore, Hong Kong</option>
            <option value="+08:75">(GMT +8:45) Eucla</option>
            <option value="+09:00">(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk</option>
            <option value="+09:50">(GMT +9:30) Adelaide, Darwin</option>
            <option value="+10:00">(GMT +10:00) Eastern Australia, Guam, Vladivostok</option>
            <option value="+10:50">(GMT +10:30) Lord Howe Island</option>
            <option value="+11:00">(GMT +11:00) Magadan, Solomon Islands, New Caledonia</option>
            <option value="+11:50">(GMT +11:30) Norfolk Island</option>
            <option value="+12:00">(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka</option>
            <option value="+12:75">(GMT +12:45) Chatham Islands</option>
            <option value="+13:00">(GMT +13:00) Apia, Nukualofa</option>
            <option value="+14:00">(GMT +14:00) Line Islands, Tokelau</option>
          </select>
          </div>
              </div>
            </div>
            <div class="preference">
              <div class="pref-top">
                <span class="subway--sharing dog"></span>
              </div>
              <div class="pref-bottom">
                <div>
                  <h1>Data sharing</h1>
                  <p>Choose what we do with the data you provide.</p>
                </div>
                <div class="load-button-container"> 
                <button class="pref-bottom-button">
                  Change
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>`;

  const languageSelection = document.querySelector("#choose-language");
  const timezoneSelection = document.querySelector("#choose-timezone");

  languageSelection.addEventListener("change", function () {
    if (languageSelection.value === "Choose") return;
    loggedInAs.language = languageSelection.value;
    localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

    userAccounts.forEach((el) => {
      if (loggedInAs.pin === el.pin) {
        el.language = loggedInAs.language;
      }
    });
    localStorage.setItem("accounts", JSON.stringify(userAccounts));
  });

  timezoneSelection.addEventListener("change", function () {
    if (timezoneSelection.value === "Choose") return;
    loggedInAs.timezone = timezoneSelection.value;
    localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

    userAccounts.forEach((el) => {
      if (loggedInAs.pin === el.pin) {
        el.timezone = loggedInAs.timezone;
      }
    });
    localStorage.setItem("accounts", JSON.stringify(userAccounts));
  });

  /*Giving the option that the user clicked on before a selected attribute (can not use forEach when working with HTML elements for some reason) */
  for (let i = 0; i < languageSelection.children.length; i++) {
    let child = languageSelection.children[i];
    if (child.value === loggedInAs.language) child.setAttribute("selected", "");
  }
  for (let i = 0; i < timezoneSelection.children.length; i++) {
    let timezone = timezoneSelection.children[i];
    if (timezone.value === loggedInAs.timezone)
      timezone.setAttribute("selected", "");
  }

  const prefPageButtons = document.querySelectorAll(".pref-bottom-button");

  prefPageButtons.forEach((el) =>
    el.addEventListener("click", function (e) {
      const mainList = document.querySelector("#main-list");

      if (
        e.target.closest(".preference").querySelector("h1").textContent ===
        "Theme"
      ) {
        e.target
          .closest(".pref-bottom-button")
          .parentElement.insertAdjacentHTML(
            "afterbegin",
            `<i class="fa-spinner fa-solid pref-load"></i>`
          );
        prefPageButtons.forEach((el) => el.setAttribute("disabled", ""));
        themeTimeout = setTimeout(() => {
          window.location.href = "#preferences/change-theme";
        }, 1500);
      }
      if (
        e.target.closest(".preference").querySelector("h1").textContent ===
        "Advertising"
      ) {
        e.target
          .closest(".pref-bottom-button")
          .parentElement.insertAdjacentHTML(
            "afterbegin",
            `<i class="fa-spinner fa-solid pref-load"></i>`
          );
        prefPageButtons.forEach((el) => el.setAttribute("disabled", ""));

        adTimeout = setTimeout(() => {
          window.location.href = "#preferences/change-ads";
        }, 1500);
      }
      if (
        e.target.closest(".preference").querySelector("h1").textContent ===
        "Displayed information"
      ) {
        e.target
          .closest(".pref-bottom-button")
          .parentElement.insertAdjacentHTML(
            "afterbegin",
            `<i class="fa-spinner fa-solid pref-load"></i>`
          );
        prefPageButtons.forEach((el) => el.setAttribute("disabled", ""));

        displayTimeout = setTimeout(() => {
          window.location.href = "#preferences/change-display-information";
        }, 1500);
      }
      if (
        e.target.closest(".preference").querySelector("h1").textContent ===
        "Data sharing"
      ) {
        e.target
          .closest(".pref-bottom-button")
          .parentElement.insertAdjacentHTML(
            "afterbegin",
            `<i class="fa-spinner fa-solid pref-load"></i>`
          );
        prefPageButtons.forEach((el) => el.setAttribute("disabled", ""));

        displayTimeout = setTimeout(() => {
          window.location.href = "#preferences/change-data-sharing";
        }, 1500);
      }
    })
  );
};

let checkSell;

const changePages = function (e) {
  clearTimeout(displayTimeout);
  clearTimeout(adTimeout);
  clearTimeout(themeTimeout);
  clearTimeout(dataTimeout);
  clearInterval(checkSell);
  clearTimeout(removeMainListTimeout);
  removeMainListClickedClasses();
  if (e.target.id === "menu-account") window.location.href = "#account";
  else if (e.target.id === "menu-preferences")
    window.location.href = "#preferences";
  else if (e.target.id === "menu-bookmarks")
    window.location.href = "#bookmarks";
};

menuBtns.forEach((el) => el.addEventListener("click", (e) => changePages(e)));

const changeName = function () {
  const changeContainer = document.querySelector("#display-right");

  const changeNameElement = document
    .querySelector(".basic-name")
    .querySelector(".basic-info-value");

  const profilePreviewName = document.querySelector(".profile-name");

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

    changeContainer.innerHTML = `<i class="fa-solid fa-spinner spinning pref-load"></i>`;

    setTimeout(() => {
      loggedInAs._firstName = firstName.value;
      loggedInAs._lastName = lastName.value;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) => {
        if (loggedInAs.pin === el.pin) {
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
      profilePreviewName.innerHTML = `${loggedInAs._firstName}, ${loggedInAs._lastName}`;
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

  changeEmailHTML(changeContainer);

  const inputInnerText = document.querySelectorAll(".input-text");
  const inputs = document.querySelectorAll("#change-email input");

  const changeEmailElement = document
    .querySelector(".basic-email")
    .querySelector(".basic-info-value");

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

  const changeEmailElement = document
    .querySelector(".basic-email")
    .querySelector(".basic-info-value");

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

const generalTheme = document.querySelector("#general-theme");
const containerTheme = document.querySelector("#container-theme");
const backgroundTheme = document.querySelector("#background-theme");
const firstAccentTheme = document.querySelector("#first-accent-theme");
const secondAccentTheme = document.querySelector("#second-accent-theme");

if (loggedInAs && loggedInAs.theme) {
  if (loggedInAs.theme.detailTheme)
    generalTheme.setAttribute(
      "href",
      `../styles/themes/${loggedInAs.theme.detailTheme}.css`
    );
  if (loggedInAs.theme.containerTheme)
    containerTheme.setAttribute(
      "href",
      `../styles/themes/container-colors/${loggedInAs.theme.containerTheme}.css`
    );
  if (loggedInAs.theme.backgroundTheme)
    backgroundTheme.setAttribute(
      "href",
      `../styles/themes/background-colors/${loggedInAs.theme.backgroundTheme}.css`
    );
  if (loggedInAs.theme.firstAccentTheme) {
    firstAccentTheme.setAttribute(
      "href",
      `../styles/themes/accent-colors/${loggedInAs.theme.firstAccentTheme}.css`
    );
  }
  if (loggedInAs.theme.secondAccentTheme) {
    secondAccentTheme.setAttribute(
      "href",
      `../styles/themes/accent-colors-two/${loggedInAs.theme.secondAccentTheme}.css`
    );
  }
  if (loggedInAs.theme.input) {
    secondAccentTheme.setAttribute(
      "href",
      `../styles/themes/input-colors/${loggedInAs.theme.inputsTheme}.css`
    );
  }
} else if (loggedInAs) {
  loggedInAs.theme = {
    detailTheme: null,
    containerTheme: null,
    backgroundTheme: null,
    firstAccentTheme: null,
    secondAccentTheme: null,
    inputTheme: null,
  };
  localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
}

const fullTheme = {
  detailTheme: "default-theme",
  containerTheme: "default-container",
  backgroundTheme: "default-background",
  accentOneTheme: "default-accent",
  accentTwoTheme: "default-accent-two",
  inputsTheme: "default-inputs",
};

const changeTheme = function () {
  removeMainList();

  const container = document.querySelector("#display");

  themePageHTML(container);
  removeCLickedClasses();

  prefBtn.classList.add("menu-clicked");

  const allBtns = document.querySelectorAll(".theme-father");

  const premadeBtns = document.querySelectorAll(".theme-color-father-premade");
  const themeBtns = document.querySelectorAll(".theme-color-father");
  /*prettier-ignore*/
  const containerThemeBtns = document.querySelectorAll(".theme-color-father-cont");
  /*prettier-ignore*/
  const backgroundThemeBtns = document.querySelectorAll(".theme-color-father-bg");
  /*prettier-ignore*/
  const accentOneThemeBtns = document.querySelectorAll(".theme-color-father-accent-one");
  /*prettier-ignore*/
  const accentTwoThemeBtns = document.querySelectorAll(".theme-color-father-accent-two");

  /*Preview container elements */
  const generalThemePreview = document.querySelector("#general-theme-preview");
  /*prettier-ignore*/
  const containerThemePreview = document.querySelector("#container-theme-preview");
  /*prettier-ignore*/
  const backgroundThemePreview = document.querySelector("#background-theme-preview");
  /*prettier-ignore*/
  const firstAccentThemePreview = document.querySelector("#first-accent-theme-preview");
  /*prettier-ignore*/
  const secondAccentThemePreview = document.querySelector("#second-accent-theme-preview");

  /*prettier-ignore*/
  const changingColorContainer = document.querySelector(".theme-changing-color-cont");
  /*prettier-ignore*/
  const changingColorBackground = document.querySelector(".theme-changing-color-bg");
  /*prettier-ignore*/
  const changingAccentOne = document.querySelector(".theme-changing-color-accent-one");
  /*prettier-ignore*/
  const changingAccentTwo = document.querySelector(".theme-changing-color-accent-two");

  let genTheme, contTheme, bgTheme, accentThemeOne, accentThemeTwo;

  premadeBtns.forEach((el) =>
    el.addEventListener("click", function () {
      let genTheme = el.dataset.theme;
      const color = el.dataset.color;

      fullTheme.detailTheme = `${genTheme}`;
      fullTheme.containerTheme = "default-container";
      fullTheme.backgroundTheme = "default-background";
      fullTheme.accentOneTheme = "default-accent";
      fullTheme.accentTwoTheme = "default-accent-two";
      fullTheme.inputsTheme = "default-inputs";

      generalThemePreview.setAttribute(
        "href",
        `../styles/themes copy/${genTheme}.css`
      );
      containerThemePreview.setAttribute(
        "href",
        `../styles/themes copy/container-colors-preview/default-container.css`
      );
      backgroundThemePreview.setAttribute(
        "href",
        `../styles/themes copy/background-colors-preview/default-background.css`
      );
      firstAccentThemePreview.setAttribute(
        "href",
        `../styles/themes copy/accent-colors-preview/default-accent.css`
      );
      secondAccentThemePreview.setAttribute(
        "href",
        `../styles/themes copy/accent-colors-two-preview/default-accent-two.css`
      );
      /*prettier-ignore */
      changingColorContainer.setAttribute("class", `theme-changing-color-cont ${color}-bg`);
      /*prettier-ignore */
      changingColorContainer.parentElement.setAttribute("data-theme", `primary-container`);

      /*prettier-ignore */
      changingColorBackground.setAttribute("class", `theme-changing-color-bg ${color}-bg`);
      /*prettier-ignore */
      changingColorBackground.parentElement.setAttribute("data-theme", `primary-background`);

      /*prettier-ignore */
      changingAccentOne.setAttribute("class", `theme-changing-color-accent-one ${color}-bg`);
      /*prettier-ignore*/
      changingAccentOne.parentElement.setAttribute("data-theme", `default-accent`);

      /*prettier-ignore */
      changingAccentTwo.setAttribute("class", `theme-changing-accent-two ${color}-bg`);
      /*prettier-ignore */
      changingAccentTwo.parentElement.setAttribute("data-theme", `default-accent-two`);
    })
  );
  themeBtns.forEach((el) =>
    el.addEventListener("click", function (e) {
      genTheme = el.dataset.theme;
      const color = el.dataset.color;

      fullTheme.detailTheme = `${genTheme}`;

      generalThemePreview.setAttribute(
        "href",
        `../styles/themes copy/${genTheme}.css`
      );

      loggedInAs.theme.detailTheme = genTheme;
      /*prettier-ignore */
      changingColorContainer.setAttribute("class", `theme-changing-color-cont ${color}-bg`);
      /*prettier-ignore */
      changingColorContainer.parentElement.setAttribute("data-theme", `primary-container`);

      /*prettier-ignore */
      changingColorBackground.setAttribute("class", `theme-changing-color-bg ${color}-bg`);
      /*prettier-ignore */
      changingColorBackground.parentElement.setAttribute("data-theme", `primary-background`);

      /*prettier-ignore */
      changingAccentOne.setAttribute("class", `theme-changing-color-accent-one ${color}-bg`);
      /*prettier-ignore*/
      changingAccentOne.parentElement.setAttribute("data-theme", `default-accent`);

      /*prettier-ignore */
      changingAccentTwo.setAttribute("class", `theme-changing-accent-two ${color}-bg`);
      /*prettier-ignore */
      changingAccentTwo.parentElement.setAttribute("data-theme", `default-accent-two`);

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
    })
  );
  containerThemeBtns.forEach((el) =>
    el.addEventListener("click", function (e) {
      contTheme = el.dataset.theme;

      fullTheme.containerTheme = `${contTheme}`;

      /*prettier-ignore */
      containerThemePreview.setAttribute(
      "href",
      `../styles/themes copy/container-colors-preview/${contTheme}.css`
    );

      loggedInAs.theme.containerTheme = contTheme;
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
    })
  );
  backgroundThemeBtns.forEach((el) =>
    el.addEventListener("click", function () {
      bgTheme = el.dataset.theme;

      fullTheme.backgroundTheme = `${bgTheme}`;

      /*prettier-ignore */
      backgroundThemePreview.setAttribute(
      "href",
      `../styles/themes copy/background-colors-preview/${bgTheme}.css`
    );
      loggedInAs.theme.backgroundTheme = bgTheme;
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
    })
  );
  accentOneThemeBtns.forEach((el) =>
    el.addEventListener("click", function () {
      accentThemeOne = el.dataset.theme;

      fullTheme.accentOneTheme = `${accentThemeOne}`;

      /*prettier-ignore */
      firstAccentThemePreview.setAttribute(
      "href",
      `../styles/themes copy/accent-colors-preview/${accentThemeOne}.css`
    )
      loggedInAs.theme.firstAccentTheme = accentThemeOne;
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
    })
  );
  accentTwoThemeBtns.forEach((el) =>
    el.addEventListener("click", function () {
      accentThemeTwo = el.dataset.theme;

      fullTheme.accentTwoTheme = `${accentThemeTwo}`;

      /*prettier-ignore */
      secondAccentThemePreview.setAttribute(
      "href",
      `../styles/themes copy/accent-colors-two-preview/${accentThemeTwo}.css`
    );
      loggedInAs.theme.secondAccentTheme = accentThemeTwo;
      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));
    })
  );

  const openColorContainers = document.querySelectorAll(".theme-subtitle-main");

  openColorContainers.forEach((el) =>
    el.addEventListener("click", function (e) {
      if (
        e.target
          .closest(".theme-subtitle-container")
          .nextElementSibling.classList.contains("theme-colors-clicked")
      ) {
        e.target
          .closest(".theme-subtitle-container")
          .nextElementSibling.classList.remove("theme-colors-clicked");
        e.target
          .closest(".theme-subtitle-container")
          .classList.remove("theme-subtitle-container-active");
        e.target
          .closest(".theme-subtitle-container")
          .querySelector(".fa-plus")
          .classList.remove("rotated");
        e.target
          .closest(".theme-subtitle-container")
          .classList.remove("theme-subtitle-container-clicked");

        return;
      }

      const editColors = document.querySelectorAll("#theme-colors");
      editColors.forEach((el) => el.classList.remove("theme-colors-clicked"));
      const editContainers = document.querySelectorAll(
        ".theme-subtitle-container"
      );
      const pluses = document.querySelectorAll(".fa-plus");

      openColorContainers.forEach((el) =>
        el
          .closest(".theme-subtitle-container")
          .classList.remove("theme-subtitle-container-clicked")
      );
      e.target
        .closest(".theme-subtitle-container")
        .classList.add("theme-subtitle-container-clicked");

      editContainers.forEach((el) =>
        el.classList.remove("theme-subtitle-container-active")
      );
      pluses.forEach((el) => el.classList.remove("rotated"));

      e.target
        .closest(".theme-subtitle-container")
        .nextElementSibling.classList.add("theme-colors-clicked");
      e.target
        .closest(".theme-subtitle-container")
        .classList.add("theme-subtitle-container-active");
      e.target
        .closest(".theme-subtitle-container")
        .querySelector(".fa-plus")
        .classList.add("rotated");
    })
  );

  const themePage = document.querySelector("#themes");
  const leftTheme = document.querySelector("#theme-left");
  const rightTheme = document.querySelector("#theme-right");
  const topTheme = document.querySelector("#theme-top");
  const bottomTheme = document.querySelector("#theme-bottom");
  const themeCheckbox = document.querySelector("#theme-checkbox");
  const topPremade = document.querySelector("#premade-themes");

  themeCheckbox.addEventListener("change", function () {
    leftTheme.classList.toggle("theme-left-smaller");
    rightTheme.classList.toggle("theme-right-bigger");
    topPremade.classList.toggle("premade-smaller");
    topTheme.classList.toggle("theme-top-smaller");
    bottomTheme.classList.toggle("theme-bottom-bigger");
  });

  const useTheme = document.querySelector("#use-theme");
  const resetTheme = document.querySelector("#cancel-theme");
  const defaultTheme = document.querySelector("#set-theme");

  useTheme.addEventListener("click", function () {
    generalTheme.setAttribute(
      "href",
      `../styles/themes/${fullTheme.detailTheme}.css`
    );
    containerTheme.setAttribute(
      "href",
      `../styles/themes/container-colors/${fullTheme.containerTheme}.css`
    );
    backgroundTheme.setAttribute(
      "href",
      `../styles/themes/background-colors/${fullTheme.backgroundTheme}.css`
    );
    firstAccentTheme.setAttribute(
      "href",
      `../styles/themes/accent-colors/${fullTheme.accentOneTheme}.css`
    );
    secondAccentTheme.setAttribute(
      "href",
      `../styles/themes/accent-colors-two/${fullTheme.accentTwoTheme}.css`
    );
  });

  resetTheme.addEventListener("click", function () {
    generalThemePreview.setAttribute(
      "href",
      `../styles/themes copy/default-theme.css`
    );
    containerThemePreview.setAttribute(
      "href",
      `../styles/themes copy/container-colors-preview/default-container.css`
    );
    backgroundThemePreview.setAttribute(
      "href",
      `../styles/themes copy/background-colors-preview/default-background.css`
    );
    firstAccentThemePreview.setAttribute(
      "href",
      `../styles/themes copy/accent-colors-preview/default-accent.css`
    );
    secondAccentThemePreview.setAttribute(
      "href",
      `../styles/themes copy/accent-colors-two-preview/default-accent-two.css`
    );

    fullTheme.detailTheme = "default-theme";
    fullTheme.backgroundTheme = "default-background";
    fullTheme.accentOneTheme = "default-accent";
    fullTheme.accentTwoTheme = "default-accent-two";
    fullTheme.inputsTheme - "default-inputs";
  });

  defaultTheme.addEventListener("click", function () {
    loggedInAs.theme = {
      detailTheme: fullTheme.detailTheme,
      containerTheme: fullTheme.containerTheme,
      backgroundTheme: fullTheme.backgroundTheme,
      firstAccentTheme: fullTheme.accentOneTheme,
      secondAccentTheme: fullTheme.accentTwoTheme,
      inputTheme: fullTheme.inputsTheme,
    };

    localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

    userAccounts.forEach((el) => {
      if (loggedInAs.pin === el.pin) {
        el.theme = loggedInAs.theme;
      }
    });
    localStorage.setItem("accounts", JSON.stringify(userAccounts));

    console.log(userAccounts);
  });
};
const themePageHTML = function (container) {
  return (container.innerHTML = `     <div id="themes">
          <div id="theme-left">
            <div id="theme-top">
              <div class="icon-title-container">
                <span class="fluent--paint-brush-16-filled dog"></span>
                <h2 id="theme-title">Themes</h2>
              </div>
              <div id="premade-themes">
                <p class="theme-premade-subtitle">
                  Try some of these premade themes
                </p>
                <div id="theme-colors-premade">
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="default-theme"
                    data-color="lime"
                  >
                    <div class="default-bg default-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="blue-theme"
                    data-color="blue"
                  >
                    <div class="blue-bg blue-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="cyan-theme"
                    data-color="cyan"
                  >
                    <div class="cyan-bg cyan-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="green-theme"
                    data-color="green"
                  >
                    <div class="green-bg green-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="red-theme"
                    data-color="red"
                  >
                    <div class="red-bg red-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="pink-theme"
                    data-color="pink"
                  >
                    <div class="pink-bg pink-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="hot-pink-theme"
                    data-color="hot-pink"
                  >
                    <div
                      class="hot-pink-bg hot-pink-premade color-premade"
                    ></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="orange-theme"
                    data-color="orange"
                  >
                    <div class="orange-bg orange-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="yellow-theme"
                    data-color="yellow"
                  >
                    <div class="yellow-bg yellow-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="night-mode-theme"
                    data-color="black"
                  >
                    <div class="black-bg black-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="reverse-theme"
                    data-color="white"
                  >
                    <div class="white-bg white-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="dark-theme"
                    data-color="gray"
                  >
                    <div class="gray-bg gray-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="purple-theme"
                    data-color="purple"
                  >
                    <div class="purple-bg purple-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="aqua-theme"
                    data-color="aqua"
                  >
                    <div class="aqua-bg aqua-premade color-premade"></div>
                  </div>
                  <div
                    class="theme-color-father-premade theme-father-premade"
                    data-theme="colorful-theme"
                    data-color="colorful"
                  >
                    <div
                      class="colorful-bg colorful-premade color-premade"
                    ></div>
                  </div>
                </div>
              </div>
              <div class="create-container">
                <h2>Design your own theme ?</h2>
                <label class="switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div id="theme-bottom">
              <div class="theme-right-title">
                <h2>Your theme preview</h2>
                <p>This is how your glorious theme will look like!</p>
              </div>
              <div id="global-body">
                <div class="theme-right-smaller-global">
                  <div class="global-left"></div>
                  <div class="global-right"></div>
                </div>
              </div>
              <div id="theme-control-buttons">
                <button id="cancel-theme">Reset theme</button>
                <button id="use-theme" class="theme-control">Use</button>
                <button id="set-theme" class="theme-control">
                  Use by default
                </button>
              </div>
            </div>
          </div>
          <div id="theme-right">
            <div id="create-own-theme">
              <h1>Design</h1>
              <div id="detail-themes" class="dropdown-title">
                <div class="theme-subtitle-container">
                  <div class="theme-subtitle-main">
                    <h2 class="theme-subtitle">Detail color</h2>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div id="theme-colors">
                  <div
                    class="theme-color-father theme-father"
                    data-theme="blue-theme"
                    data-color="blue"
                  >
                    <div class="blue-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="green-theme"
                    data-color="green"
                  >
                    <div class="green-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="red-theme"
                    data-color="red"
                  >
                    <div class="red-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="pink-theme"
                    data-color="pink"
                  >
                    <div class="pink-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="hot-pink-theme"
                    data-color="hot-pink"
                  >
                    <div class="hot-pink-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="orange-theme"
                    data-color="orange"
                  >
                    <div class="orange-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="yellow-theme"
                    data-color="yellow"
                  >
                    <div class="yellow-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="night-mode-theme"
                    data-color="black"
                  >
                    <div class="black-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="reverse-theme"
                    data-color="white"
                  >
                    <div class="white-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="dark-theme"
                    data-color="gray"
                  >
                    <div class="gray-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="purple-theme"
                    data-color="purple"
                  >
                    <div class="purple-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="aqua-theme"
                    data-color="aqua"
                  >
                    <div class="aqua-bg"></div>
                  </div>
                  <div
                    class="theme-color-father theme-father"
                    data-theme="colorful-theme"
                    data-color="colorful"
                  >
                    <div class="colorful-bg"></div>
                  </div>
                </div>
              </div>
              <div id="container-themes" class="dropdown-title">
                <div class="theme-subtitle-container">
                  <div class="theme-subtitle-main">
                    <h2 class="theme-subtitle">Container color</h2>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div id="theme-colors">
                  <div
                    class="theme-color-father-cont theme-father theme-"
                    data-theme="primary-container"
                  >
                    <div class="default-bg theme-changing-color-cont"></div>
                  </div>

                  <div
                    class="theme-color-father-cont theme-father"
                    data-theme="night-container"
                  >
                    <div class="black-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-cont theme-father"
                    data-theme="white-container"
                  >
                    <div class="white-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-cont theme-father"
                    data-theme="dark-container"
                  >
                    <div class="gray-bg"></div>
                  </div>
                </div>
              </div>
              <div id="background-themes" class="dropdown-title">
                <div class="theme-subtitle-container">
                  <div class="theme-subtitle-main">
                    <h2 class="theme-subtitle">Background color</h2>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div id="theme-colors">
                  <div
                    class="theme-color-father-bg theme-father"
                    data-theme="primary-background"
                  >
                    <div class="default-bg theme-changing-color-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-bg theme-father"
                    data-theme="night-background"
                  >
                    <div class="black-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-bg theme-father"
                    data-theme="white-background"
                  >
                    <div class="white-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-bg theme-father"
                    data-theme="dark-background"
                  >
                    <div class="gray-bg"></div>
                  </div>
                </div>
              </div>
              <div id="accent-one-themes" class="dropdown-title">
                <div class="theme-subtitle-container">
                  <div class="theme-subtitle-main">
                    <h2 class="theme-subtitle">Accent color no.1</h2>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div id="theme-colors">
                  <div
                    class="theme-color-father-accent-one theme-father theme-"
                    data-theme="default-accent"
                  >
                    <div
                      class="default-bg theme-changing-color-accent-one"
                    ></div>
                  </div>

                  <div
                    class="theme-color-father-accent-one theme-father"
                    data-theme="dark-accent"
                  >
                    <div class="black-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-accent-one theme-father"
                    data-theme="white-accent"
                  >
                    <div class="white-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-accent-one theme-father no-accent"
                    data-theme="no-accent"
                  >
                    <div class="gray-bg"></div>
                  </div>
                </div>
              </div>
              <div id="accent-two-themes" class="dropdown-title">
                <div class="theme-subtitle-container">
                  <div class="theme-subtitle-main">
                    <h2 class="theme-subtitle">Accent color no.2</h2>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div id="theme-colors">
                  <div
                    class="theme-color-father-accent-two theme-father theme-"
                    data-theme="default-accent-two"
                  >
                    <div
                      class="default-bg theme-changing-color-accent-two"
                    ></div>
                  </div>

                  <div
                    class="theme-color-father-accent-two theme-father"
                    data-theme="dark-accent-two"
                  >
                    <div class="black-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-accent-two theme-father"
                    data-theme="white-accent-two"
                  >
                    <div class="white-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-accent-two theme-father no-accent-two"
                    data-theme="no-accent-two"
                  >
                    <div class="gray-bg"></div>
                  </div>
                </div>
              </div>
              <div id="accent-two-themes" class="dropdown-title">
                <div class="theme-subtitle-container">
                  <div class="theme-subtitle-main">
                    <h2 class="theme-subtitle">Input color</h2>
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                  </div>
                </div>
                <div id="theme-colors">
                  <div
                    class="theme-color-father-accent-two theme-father theme-"
                    data-theme="default-accent-two"
                  >
                    <div
                      class="default-bg theme-changing-color-accent-two"
                    ></div>
                  </div>

                  <div
                    class="theme-color-father-accent-two theme-father"
                    data-theme="dark-accent-two"
                  >
                    <div class="black-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-accent-two theme-father"
                    data-theme="white-accent-two"
                  >
                    <div class="white-bg"></div>
                  </div>
                  <div
                    class="theme-color-father-accent-two theme-father no-accent-two"
                    data-theme="no-accent-two"
                  >
                    <div class="gray-bg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`);
};
const changeAds = function () {
  const container = document.querySelector("#display");

  changeAdsHTML(container);
  removeMainList();
  removeCLickedClasses();

  prefBtn.classList.add("menu-clicked");

  if (loggedInAs && loggedInAs._adSettings)
    Object.entries(loggedInAs._adSettings).forEach((el) =>
      el[1]
        ? (document.querySelector(`#${el[0]}-switch input`).checked = true)
        : -1
    );

  const switches = document.querySelectorAll(".ad-switch input");

  switches.forEach((el) =>
    el.addEventListener("change", function () {
      if (el.checked && el.parentElement.id === "company-switch")
        loggedInAs._adSettings.company = true;
      else if (el.parentElement.id === "company-switch")
        loggedInAs._adSettings.company = false;
      if (el.checked && el.parentElement.id === "foreign-switch")
        loggedInAs._adSettings.foreign = true;
      else if (el.parentElement.id === "foreign-switch")
        loggedInAs._adSettings.foreign = false;
      if (el.checked && el.parentElement.id === "hide-switch")
        loggedInAs._adSettings.hide = true;
      else if (el.parentElement.id === "hide-switch")
        loggedInAs._adSettings.hide = false;
      if (el.checked && el.parentElement.id === "familliar-switch") {
        loggedInAs._adSettings.familliar = true;
        const trendingSwitch = document.querySelector("#trending-switch input");
        trendingSwitch.checked = false;
        loggedInAs._adSettings.trending = false;
      } else if (el.parentElement.id === "familliar-switch") loggedInAs._adSettings.familliar = false;
      if (el.checked && el.parentElement.id === "trending-switch") {
        loggedInAs._adSettings.trending = true;
        const familliarSwitch = document.querySelector(
          "#familliar-switch input"
        );
        familliarSwitch.checked = false;
        loggedInAs._adSettings.familliar = false;
      } else if (el.parentElement.id === "trending-switch") loggedInAs._adSettings.trending = false;
      if (el.checked && el.parentElement.id === "adult-switch")
        loggedInAs._adSettings.adult = true;
      else if (el.parentElement.id === "adult-switch")
        loggedInAs._adSettings.adult = false;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) =>
        el.pin === loggedInAs.pin
          ? (el._adSettings = loggedInAs._adSettings)
          : -1
      );

      localStorage.setItem("accounts", JSON.stringify(userAccounts));
    })
  );
};
const changeAdsHTML = function (container) {
  return (container.innerHTML = ` <div id="advertisements">
          <div class="advertisements-top">
            <span class="fa-solid--ad dog"></span>
            <div>
              <h1>Advertisements</h1>
              <p>
                Choose what content is shown to you and how much of it is shown.
              </p>
            </div>
          </div>
          <div class="advertisements-bottom">
            <div class="ad-option">
              <h1>Categories</h1>
              <p>
                Specifically choose which categories are going to be shown in
                your ad feed. This won't stop other ads from appearing, but the
                main ads that are shown will be related to the categories you
                add here.
              </p>
            </div>
            <div class="ad-option">
              <h1>Amount</h1>
              <p>
                Choose how many ads you get per day, as a non premium user the
                minimum is 10 and maximum is 25.
              </p>
            </div>
            <div class="ad-option">
              <h1>Companies</h1>
              <div class="ad-paragraph-switch-container">
                <p>
                  Choose whether you want to get personalized company
                  advertisements in your ad feed or not.
                </p>
                <label id="company-switch" class="ad-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="ad-option">
              <h1>Foreign</h1>
              <div class="ad-paragraph-switch-container">
                <p>
                  Show more ads from other countries and foreign companies, this
                  option is used for users who want to reach further connections
                  from people from all over the world.
                </p>
                <label id="foreign-switch" class="ad-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
                <div class="ad-option">
              <h1>Familliar</h1>
              <div class="ad-paragraph-switch-container">
                <p>
                  Show more ads that are in some way related to the categories
                  you've followed. This won't stop other ads from appearing, but
                  the main ads that are shown will be related to your likings.
                </p>
                <label id="familliar-switch" class="ad-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="ad-option">
              <h1>Hide ads</h1>
              <div class="ad-paragraph-switch-container">
                <p>
                  Completely hide all ads altogether, in order to be able to
                  turn this option on you will need to be a premium member.
                </p>
                <label id="hide-switch" class="ad-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="ad-option">
              <h1>Trending</h1>
              <div class="ad-paragraph-switch-container">
                <p>
                  Show more ads from the Trending category, this might include
                  ads that are not related to any of the categories you've
                  followed. It will only show categories that other users have
                  found useful. This won't stop other ads from appearing, but
                  the main ads that are shown will be from the Trending
                  category.
                </p>
                <label id="trending-switch" class="ad-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <div class="ad-option">
                <h1>Adult</h1>
                <div class="ad-paragraph-switch-container">
                  <p>Choose whether or not to show adult (18+) ads or not.</p>
                  <label id="adult-switch" class="ad-switch">
                    <input id="theme-checkbox" type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>`);
};
//TODO: (maybe) Add getting new PIN code if the user forgot it (Requires username and password)
if (loggedInAs && !loggedInAs._adSettings) {
  loggedInAs._adSettings = {
    company: false,
    foreign: false,
    hide: false,
    familliar: false,
    trending: false,
    adult: true,
  };
}

if (loggedInAs && !loggedInAs._displaySettings) {
  loggedInAs._displaySettings = {
    name: "public",
    date: "public",
    gender: "public",
    email: "email",
    username: "showing",
    image: "showing",
  };
}
const changeDisplayInfo = function () {
  const container = document.querySelector("#display");

  changeDisplayInfoHTML(container);
  removeMainList();
  removeCLickedClasses();

  prefBtn.classList.add("menu-clicked");

  const useDisplayModes = document.querySelectorAll(".display-use-mode");

  const displayNameBtns = document.querySelectorAll(".display-name");
  const displayDateBtns = document.querySelectorAll(".display-date");
  const displayUsernameBtns = document.querySelectorAll(".display-username");
  const displayEmailBtns = document.querySelectorAll(".display-email");

  const arrayOfDisplays = [
    displayNameBtns,
    displayEmailBtns,
    displayUsernameBtns,
    displayDateBtns,
  ];

  const customBtn = document.querySelector(".use-custom");

  useDisplayModes.forEach((el) =>
    el.addEventListener("click", function () {
      useDisplayModes.forEach((el) => {
        el.classList.remove("display-used-mode");
        el.textContent = "Use";
      });

      this.textContent = "Using";
      this.classList.toggle("display-used-mode");

      customBtn.classList.remove("used-custom");

      arrayOfDisplays.forEach((el) =>
        el.forEach((el) => el.classList.remove("display-picked"))
      );
      arrayOfToggles.forEach((el) =>
        el.forEach((el) => el.classList.remove("display-toggled"))
      );

      if (this.id === "use-public-mode") {
        handleRemovingButtonClassDisplay(0);
        handleRemovingToggledButtonsClass(0, 0);
        handleUpdatingDisplayLocalStorage("public", "showing", "showing");
      }
      if (this.id === "use-private-mode") {
        handleRemovingButtonClassDisplay(1);
        handleRemovingToggledButtonsClass(0, 1);
        handleUpdatingDisplayLocalStorage("private", "showing", "hidden");
      }
      if (this.id === "use-super-private-mode") {
        handleRemovingButtonClassDisplay(2);
        handleRemovingToggledButtonsClass(1, 1);
        handleUpdatingDisplayLocalStorage("super-private", "hidden", "hidden");
      }
      if (this.id === "use-fbi-mode") {
        handleRemovingButtonClassDisplay(3);
        handleRemovingToggledButtonsClass(1, 1);
        handleUpdatingDisplayLocalStorage("fbi", "hidden", "hidden");
      }
      handleDisplayPreview();
    })
  );

  const pickDisplayOption = document.querySelectorAll(".display-pick");

  pickDisplayOption.forEach((el) =>
    el.addEventListener("click", function () {
      if (this.classList.contains("display-name")) {
        displayNameBtns.forEach((el) => el.classList.remove("display-picked"));
        handleUpadingIndividualLocalStorage("name", el);
      }
      if (this.classList.contains("display-date")) {
        displayDateBtns.forEach((el) => el.classList.remove("display-picked"));
        handleUpadingIndividualLocalStorage("date", el);
      }
      if (this.classList.contains("display-username")) {
        displayUsernameBtns.forEach((el) =>
          el.classList.remove("display-picked")
        );
        handleUpadingIndividualLocalStorage("username", el);
      }
      if (this.classList.contains("display-email")) {
        displayEmailBtns.forEach((el) => el.classList.remove("display-picked"));
        handleUpadingIndividualLocalStorage("email", el);
      }
      this.classList.add("display-picked");

      handleDisplayPreview();

      useDisplayModes.forEach((el) => {
        el.classList.remove("display-used-mode");
        el.textContent = "Use";
      });

      let custom = 0;
      for (let i = 0; i < 4; i++) {
        if (
          displayNameBtns[i].classList.contains("display-picked") &&
          displayDateBtns[i].classList.contains("display-picked") &&
          displayEmailBtns[i].classList.contains("display-picked") &&
          displayUsernameBtns[i].classList.contains("display-picked") &&
          ((i === 0 &&
            displayGenderBtns[0].classList.contains("display-toggled") &&
            displayPfpBtns[0].classList.contains("display-toggled")) ||
            (i === 1 &&
              displayGenderBtns[0].classList.contains("display-toggled") &&
              displayPfpBtns[1].classList.contains("display-toggled")) ||
            (i === 2 &&
              displayGenderBtns[1].classList.contains("display-toggled") &&
              displayPfpBtns[1].classList.contains("display-toggled")) ||
            (i === 3 &&
              displayGenderBtns[1].classList.contains("display-toggled") &&
              displayPfpBtns[1].classList.contains("display-toggled")))
        ) {
          custom = 1;
          useDisplayModes[i].classList.add("display-used-mode");
          useDisplayModes[i].textContent = "Using";
        }
      }
      if (custom) customBtn.classList.remove("used-custom");
      else customBtn.classList.add("used-custom");
    })
  );
  const handleRemovingButtonClassDisplay = function (number) {
    arrayOfDisplays.forEach((el) => el[number].classList.add("display-picked"));
  };
  const displayGenderBtns = document.querySelectorAll(".display-gender");
  const displayPfpBtns = document.querySelectorAll(".display-pfp");

  const arrayOfToggles = [displayGenderBtns, displayPfpBtns];

  const handleRemovingToggledButtonsClass = function (value1, value2) {
    displayGenderBtns[value1].classList.add("display-toggled");
    displayPfpBtns[value2].classList.add("display-toggled");
  };

  const handleUpdatingDisplayLocalStorage = function (value, value2, value3) {
    loggedInAs._displaySettings.name = value;
    loggedInAs._displaySettings.date = value;
    loggedInAs._displaySettings.email = value;
    loggedInAs._displaySettings.username = value;
    loggedInAs._displaySettings.gender = value2;
    loggedInAs._displaySettings.image = value3;

    localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

    userAccounts.forEach((el) =>
      el.pin === loggedInAs.pin
        ? (el._displaySettings = loggedInAs._displaySettings)
        : -1
    );

    localStorage.setItem("accounts", JSON.stringify(userAccounts));
  };
  const handleUpadingIndividualLocalStorage = function (key, el) {
    loggedInAs._displaySettings[`${key}`] = `${el.textContent
      .replace("\n", "")
      .toLowerCase()
      .trim()
      .replace(" ", "-")}`;

    localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

    userAccounts.forEach((el) =>
      el.pin === loggedInAs.pin
        ? (el._displaySettings = loggedInAs._displaySettings)
        : -1
    );

    localStorage.setItem("accounts", JSON.stringify(userAccounts));
  };
  const handleUpadingIndividualToggledLocalStorage = function (key, value) {
    loggedInAs._displaySettings[`${key}`] = `${value}`;

    localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

    userAccounts.forEach((el) =>
      el.pin === loggedInAs.pin
        ? (el._displaySettings = loggedInAs._displaySettings)
        : -1
    );

    localStorage.setItem("accounts", JSON.stringify(userAccounts));
  };
  const handleDisplayPreview = function () {
    const nameDisplayPreview = document.querySelector("#display-preview-name")
      .parentElement.firstElementChild;
    const dateDisplayPreview = document.querySelector("#display-preview-date")
      .parentElement.firstElementChild;
    const usernameDisplayPreview = document.querySelector(
      "#display-preview-username"
    ).parentElement.firstElementChild;
    const emailDisplayPreview = document.querySelector("#display-preview-email")
      .parentElement.firstElementChild;
    if (loggedInAs._displaySettings.name === "public") {
      nameDisplayPreview.textContent = `${
        loggedInAs._firstName
          ? `${loggedInAs._firstName}, ${loggedInAs._lastName}`
          : "You haven't added a name"
      }`;
    } else if (loggedInAs._displaySettings.name === "private") {
      nameDisplayPreview.textContent = `${
        loggedInAs._firstName
          ? `${loggedInAs._firstName}, ${loggedInAs._lastName.slice(
              0,
              loggedInAs._lastName.lastIndexOf(" ") + 2
            )}.`
          : "You haven't added a name"
      }`;
    } else if (loggedInAs._displaySettings.name === "super-private") {
      nameDisplayPreview.textContent = `${
        loggedInAs._firstName
          ? `${loggedInAs._firstName.slice(0, 1)}. ${loggedInAs._lastName.slice(
              0,
              1
            )}.`
          : "You haven't added a name"
      }`;
    } else if (loggedInAs._displaySettings.name === "fbi") {
      nameDisplayPreview.textContent = `${
        loggedInAs._firstName ? `` : "You haven't added a name"
      }`;
    }
    if (loggedInAs._displaySettings.date === "public") {
      dateDisplayPreview.textContent = `${
        loggedInAs._dateOfBirth
          ? `${loggedInAs._dateOfBirth}`
          : "You haven't added a date"
      }`;
    } else if (loggedInAs._displaySettings.date === "private") {
      dateDisplayPreview.textContent = `${
        loggedInAs._dateOfBirth
          ? `${loggedInAs._dateOfBirth.slice(
              loggedInAs._dateOfBirth.indexOf("/") + 1,
              loggedInAs._dateOfBirth.length
            )}`
          : "You haven't added a date"
      }`;
    } else if (loggedInAs._displaySettings.date === "super-private") {
      dateDisplayPreview.textContent = `${
        loggedInAs._dateOfBirth
          ? `${loggedInAs._dateOfBirth.slice(
              loggedInAs._dateOfBirth.lastIndexOf("/") + 1,
              loggedInAs._dateOfBirth.length
            )}`
          : "You haven't added a date"
      }`;
    } else if (loggedInAs._displaySettings.date === "fbi") {
      dateDisplayPreview.textContent = `${
        loggedInAs._dateOfBirth ? `` : "You haven't added a date"
      }`;
    }
    if (loggedInAs._displaySettings.username === "public") {
      usernameDisplayPreview.textContent = `${
        loggedInAs.username
          ? `${loggedInAs.username}`
          : "You haven't added a username"
      }`;
    } else if (loggedInAs._displaySettings.username === "private") {
      usernameDisplayPreview.textContent = `${
        loggedInAs.username
          ? `${loggedInAs.username.slice(
              0,
              (loggedInAs.username.length + 2) / 2
            )}${"*".repeat(Math.ceil(loggedInAs.username.length / 2) - 1)}`
          : "You haven't added a username"
      }`;
    } else if (loggedInAs._displaySettings.username === "super-private") {
      usernameDisplayPreview.textContent = `${
        loggedInAs.username
          ? `${loggedInAs.username.slice(0, 1)}${"*".repeat(
              loggedInAs.username.length - 1
            )}`
          : "You haven't added a name"
      }`;
    } else if (loggedInAs._displaySettings.username === "fbi") {
      usernameDisplayPreview.textContent = `${
        loggedInAs.username ? `` : "You haven't added a name"
      }`;
    }
    if (loggedInAs._displaySettings.email === "public") {
      emailDisplayPreview.textContent = `${
        loggedInAs.email ? `${loggedInAs.email}` : "You haven't added a email"
      }`;
    } else if (loggedInAs._displaySettings.email === "private") {
      emailDisplayPreview.textContent = `${
        loggedInAs.email
          ? `${loggedInAs.email.slice(
              0,
              loggedInAs.email.indexOf("@") / 2
            )}${"*".repeat(
              loggedInAs.email.slice(0, loggedInAs.email.indexOf("@") / 2)
                .length
            )}@gmail.com`
          : "You haven't added a email"
      }`;
    } else if (loggedInAs._displaySettings.email === "super-private") {
      emailDisplayPreview.textContent = `${
        loggedInAs.email
          ? `${loggedInAs.email.slice(0, 1)}${"*".repeat(
              loggedInAs.email.length - 5
            )}.com`
          : "You haven't added a name"
      }`;
    } else if (loggedInAs._displaySettings.email === "fbi") {
      emailDisplayPreview.textContent = `${
        loggedInAs.email ? `` : "You haven't added a name"
      }`;
    }
  };

  const displayToggleButtons = document.querySelectorAll(".display-toggle");

  displayToggleButtons.forEach((el) =>
    el.addEventListener("click", function () {
      if (this.classList.contains("display-gender")) {
        displayGenderBtns.forEach((el) =>
          el.classList.remove("display-toggled")
        );
        this.id === "show-gender"
          ? handleUpadingIndividualToggledLocalStorage("gender", "showing")
          : handleUpadingIndividualToggledLocalStorage("gender", "hidden");
      }
      if (this.classList.contains("display-pfp")) {
        displayPfpBtns.forEach((el) => el.classList.remove("display-toggled"));
        this.id === "show-picture"
          ? handleUpadingIndividualToggledLocalStorage("image", "showing")
          : handleUpadingIndividualToggledLocalStorage("image", "hidden");
      }
      this.classList.add("display-toggled");

      useDisplayModes.forEach((el) => {
        el.classList.remove("display-used-mode");
        el.textContent = "Use";
      });

      let custom = 0;
      for (let i = 0; i < 4; i++) {
        if (
          displayNameBtns[i].classList.contains("display-picked") &&
          displayDateBtns[i].classList.contains("display-picked") &&
          displayEmailBtns[i].classList.contains("display-picked") &&
          displayUsernameBtns[i].classList.contains("display-picked") &&
          ((i === 0 &&
            displayGenderBtns[0].classList.contains("display-toggled") &&
            displayPfpBtns[0].classList.contains("display-toggled")) ||
            (i === 1 &&
              displayGenderBtns[0].classList.contains("display-toggled") &&
              displayPfpBtns[1].classList.contains("display-toggled")) ||
            (i === 2 &&
              displayGenderBtns[1].classList.contains("display-toggled") &&
              displayPfpBtns[1].classList.contains("display-toggled")) ||
            (i === 3 &&
              displayGenderBtns[1].classList.contains("display-toggled") &&
              displayPfpBtns[1].classList.contains("display-toggled")))
        ) {
          custom = 1;
          useDisplayModes[i].classList.add("display-used-mode");
          useDisplayModes[i].textContent = "Using";
        }
      }
      if (custom) customBtn.classList.remove("used-custom");
      else customBtn.classList.add("used-custom");
    })
  );

  const handlePageLoad = function () {
    if (loggedInAs._displaySettings.name === "public")
      displayNameBtns[0].classList.add("display-picked");
    if (loggedInAs._displaySettings.name === "private")
      displayNameBtns[1].classList.add("display-picked");
    if (loggedInAs._displaySettings.name === "super-private")
      displayNameBtns[2].classList.add("display-picked");
    if (loggedInAs._displaySettings.name === "fbi")
      displayNameBtns[3].classList.add("display-picked");

    if (loggedInAs._displaySettings.date === "public")
      displayDateBtns[0].classList.add("display-picked");
    if (loggedInAs._displaySettings.date === "private")
      displayDateBtns[1].classList.add("display-picked");
    if (loggedInAs._displaySettings.date === "super-private")
      displayDateBtns[2].classList.add("display-picked");
    if (loggedInAs._displaySettings.date === "fbi")
      displayDateBtns[3].classList.add("display-picked");

    if (loggedInAs._displaySettings.email === "public")
      displayEmailBtns[0].classList.add("display-picked");
    if (loggedInAs._displaySettings.email === "private")
      displayEmailBtns[1].classList.add("display-picked");
    if (loggedInAs._displaySettings.email === "super-private")
      displayEmailBtns[2].classList.add("display-picked");
    if (loggedInAs._displaySettings.email === "fbi")
      displayEmailBtns[3].classList.add("display-picked");

    if (loggedInAs._displaySettings.username === "public")
      displayUsernameBtns[0].classList.add("display-picked");
    if (loggedInAs._displaySettings.username === "private")
      displayUsernameBtns[1].classList.add("display-picked");
    if (loggedInAs._displaySettings.username === "super-private")
      displayUsernameBtns[2].classList.add("display-picked");
    if (loggedInAs._displaySettings.username === "fbi")
      displayUsernameBtns[3].classList.add("display-picked");

    if (loggedInAs._displaySettings.image === "showing")
      displayPfpBtns[0].classList.add("display-toggled");
    if (loggedInAs._displaySettings.image === "hidden")
      displayPfpBtns[1].classList.add("display-toggled");

    if (loggedInAs._displaySettings.gender === "showing")
      displayGenderBtns[0].classList.add("display-toggled");
    if (loggedInAs._displaySettings.gender === "hidden")
      displayGenderBtns[1].classList.add("display-toggled");

    handleDisplayPreview();

    let custom = 0;
    for (let i = 0; i < 4; i++) {
      if (
        displayNameBtns[i].classList.contains("display-picked") &&
        displayDateBtns[i].classList.contains("display-picked") &&
        displayEmailBtns[i].classList.contains("display-picked") &&
        displayUsernameBtns[i].classList.contains("display-picked") &&
        ((i === 0 &&
          displayGenderBtns[0].classList.contains("display-toggled") &&
          displayPfpBtns[0].classList.contains("display-toggled")) ||
          (i === 1 &&
            displayGenderBtns[0].classList.contains("display-toggled") &&
            displayPfpBtns[1].classList.contains("display-toggled")) ||
          (i === 2 &&
            displayGenderBtns[1].classList.contains("display-toggled") &&
            displayPfpBtns[1].classList.contains("display-toggled")) ||
          (i === 3 &&
            displayGenderBtns[1].classList.contains("display-toggled") &&
            displayPfpBtns[1].classList.contains("display-toggled")))
      ) {
        custom = 1;
        useDisplayModes[i].classList.add("display-used-mode");
        useDisplayModes[i].textContent = "Using";
      }
    }
    if (custom) customBtn.classList.remove("used-custom");
    else customBtn.classList.add("used-custom");
  };
  handlePageLoad();
};
const changeDisplayInfoHTML = function (container) {
  return (container.innerHTML = `
   <div id="display-info">
          <div class="display-info-top">
            <div class="display-title-container">
              <span class="fluent--code-text-16-filled dog"></span>
              <div>
                <h1>Displayed information</h1>
                <p>
                  Choose what content is shown to other people when they click
                  on your profile.
                </p>
              </div>
            </div>

            <div class="display-info-top-containers">
              <div class="display-option">
                <h2>Public mode</h2>
                <span class="mdi--shield-unlocked cat"></span>
                <button id="use-public-mode" class="display-use-mode">
                  Use
                </button>
              </div>
              <div class="display-option">
                <h2>Private mode</h2>
                <span class="material-symbols--shield-locked cat"></span>
                <button id="use-private-mode" class="display-use-mode">
                  Use
                </button>
              </div>
              <div class="display-option">
                <h2>Super private mode</h2>
                <span class="gis--globe-shield cat"></span>
                <button id="use-super-private-mode" class="display-use-mode">
                  Use
                </button>
              </div>
              <div class="display-option">
                <h2>FBI mode</h2>
                <span class="streamline--incognito-mode-solid cat"></span>
                <button id="use-fbi-mode" class="display-use-mode">Use</button>
              </div>
              <button class="use-custom">Custom</button>
            </div>
          </div>
          <div class="display-info-bottom">
            <div class="display-option-bottom">
              <div class="display-option-top">
                <div>
                  <h2>First and last name</h2>
                  <p>
                    Choose what security level you want for your name display.
                  </p>
                </div>
                <div class="display-preview-container">
                  <span>Amar, Muric </span>
                  <p id="display-preview-name" class="display-preview">
                    PREVIEW
                  </p>
                </div>
              </div>
              <div class="display-button-container">
                <button id="public-name" class="display-pick display-name">
                  Public
                </button>
                <button id="private-name" class="display-pick display-name">
                  Private
                </button>
                <button
                  id="super-private-name"
                  class="display-pick display-name"
                >
                  Super Private
                </button>
                <button id="fbi-name" class="display-pick display-name">
                  FBI
                </button>
              </div>
            </div>
            <div class="display-option-bottom">
              <div class="display-option-top">
                <div>
                  <h2>Display date of birth</h2>
                  <p>
                    Choose what security level you want for your date of birth
                    display.
                  </p>
                </div>
                <div class="display-preview-container">
                  <span>27/12/2004 </span>
                  <p id="display-preview-date" class="display-preview">
                    PREVIEW
                  </p>
                </div>
              </div>

              <div class="display-button-container">
                <button id="public-date" class="display-pick display-date">
                  Public
                </button>
                <button id="private-date" class="display-pick display-date">
                  Private
                </button>
                <button
                  id="super-private-date"
                  class="display-pick display-date"
                >
                  Super Private
                </button>
                <button id="fbi-date" class="display-pick display-date">
                  FBI
                </button>
              </div>
            </div>
            <div class="display-option-bottom">
              <div class="display-option-top">
                <div>
                  <h2>Display username</h2>
                  <p>
                    Choose what security level you want for your username
                    display.
                  </p>
                </div>
                <div class="display-preview-container">
                  <span>Murga </span>
                  <p id="display-preview-username" class="display-preview">
                    PREVIEW
                  </p>
                </div>
              </div>
              <div class="display-button-container">
                <button
                  id="public-username"
                  class="display-pick display-username"
                >
                  Public
                </button>
                <button
                  id="private-username"
                  class="display-pick display-username"
                >
                  Private
                </button>
                <button
                  id="super-private-username"
                  class="display-pick display-username"
                >
                  Super Private
                </button>
                <button id="fbi-username" class="display-pick display-username">
                  FBI
                </button>
              </div>
            </div>
            <div class="display-option-bottom">
              <div class="display-option-top">
                <div>
                  <h2>Display email</h2>
                  <p>
                    Choose what security level you want for your email display.
                  </p>
                </div>
                <div class="display-preview-container">
                  <span>muricamar2004@gmail.com </span>
                  <p id="display-preview-email" class="display-preview">
                    PREVIEW
                  </p>
                </div>
              </div>
              <div class="display-button-container">
                <button id="public-email" class="display-pick display-email">
                  Public
                </button>
                <button id="private-email" class="display-pick display-email">
                  Private
                </button>
                <button
                  id="super-private-email"
                  class="display-pick display-email"
                >
                  Super Private
                </button>
                <button id="fbi-email" class="display-pick display-email">
                  FBI
                </button>
              </div>
            </div>
            <div class="display-option-bottom">
              <h2>Display gender</h2>
              <p>Choose whether to show your gender or not.</p>

              <div class="display-button-container">
                <button id="show-gender" class="display-toggle display-gender">
                  Show
                </button>
                <button id="hide-gender" class="display-toggle display-gender">
                  Hide
                </button>
              </div>
            </div>
            <div class="display-option-bottom">
              <h2>Show profile picture</h2>
              <p>Choose whether to show your profile picture or not.</p>
              <div class="display-button-container">
                <button id="show-picture" class="display-toggle display-pfp">
                  Show
                </button>
                <button id="hide-picture" class="display-toggle display-pfp">
                  Hide
                </button>
              </div>
            </div>
          </div>
        </div>`);
};

loggedInAs._dataSharingSettings = {
  use: false,
  share: false,
  priceOptim: false,
  anonSell: false,
  cookies: false,
  optim: false,
  target: false,
  sell: true,
};

const changeDataSharing = function () {
  const container = document.querySelector("#display");

  changeDataSharingHTML(container);
  removeMainList();
  removeCLickedClasses();

  prefBtn.classList.add("menu-clicked");

  const switches = document.querySelectorAll(".data-switch input");

  localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

  userAccounts.forEach((el) => {
    if (loggedInAs.pin === el.pin) {
      el._dataSharingSettings = loggedInAs._dataSharingSettings;
    }
  });
  localStorage.setItem("accounts", JSON.stringify(userAccounts));

  switches.forEach((el) =>
    el.addEventListener("change", function () {
      if (this.checked && this.parentElement.id === "use-switch")
        loggedInAs._dataSharingSettings.use = true;
      else if (this.parentElement.id === "use-switch")
        loggedInAs._dataSharingSettings.use = false;
      if (this.checked && this.parentElement.id === "share-switch")
        loggedInAs._dataSharingSettings.share = true;
      else if (this.parentElement.id === "share-switch")
        loggedInAs._dataSharingSettings.share = false;
      if (this.checked && this.parentElement.id === "price-switch")
        loggedInAs._dataSharingSettings.priceOptim = true;
      else if (this.parentElement.id === "price-switch")
        loggedInAs._dataSharingSettings.priceOptim = false;
      if (this.checked && this.parentElement.id === "anon-switch")
        loggedInAs._dataSharingSettings.anonSell = true;
      else if (this.parentElement.id === "anon-switch")
        loggedInAs._dataSharingSettings.anonSell = false;
      if (this.checked && this.parentElement.id === "cookie-switch")
        loggedInAs._dataSharingSettings.cookies = true;
      else if (this.parentElement.id === "cookie-switch")
        loggedInAs._dataSharingSettings.cookies = false;
      if (this.checked && this.parentElement.id === "optim-switch")
        loggedInAs._dataSharingSettings.optim = true;
      else if (this.parentElement.id === "optim-switch")
        loggedInAs._dataSharingSettings.optim = false;
      if (this.checked && this.parentElement.id === "target-switch")
        loggedInAs._dataSharingSettings.target = true;
      else if (this.parentElement.id === "target-switch")
        loggedInAs._dataSharingSettings.target = false;
      if (this.checked && this.parentElement.id === "sell-switch")
        loggedInAs._dataSharingSettings.sell = true;
      else if (this.parentElement.id === "sell-switch")
        loggedInAs._dataSharingSettings.sell = false;

      localStorage.setItem("loggedInAs", JSON.stringify(loggedInAs));

      userAccounts.forEach((el) => {
        if (loggedInAs.pin === el.pin) {
          el._dataSharingSettings = loggedInAs._dataSharingSettings;
        }
      });
      localStorage.setItem("accounts", JSON.stringify(userAccounts));
    })
  );

  checkSell = setInterval(() => {
    document.querySelector("#sell-switch input").checked = true;
    loggedInAs._dataSharingSettings.sell = true;

    userAccounts.forEach((el) => {
      if (loggedInAs.pin === el.pin) {
        el._dataSharingSettings = loggedInAs._dataSharingSettings;
      }
    });
    localStorage.setItem("accounts", JSON.stringify(userAccounts));
  }, 5000);
};
const changeDataSharingHTML = function (container) {
  return (container.innerHTML = `
    <div id="data">
          <div class="data-top">
            <span class="subway--sharing dog"></span>
            <div>
              <h1>Data Sharing</h1>
              <p>Choose what we do with the date you provide.</p>
            </div>
          </div>
          <div class="data-bottom">
            <div class="data-option">
              <h1>Use of your data</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether you want us to look through the data you
                  provide and use it to make the experience of the website feel
                  more relatable or not.
                </p>
                <label id="use-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="data-option">
              <h1>Sharing your data</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether you want us to share the data you provide to
                  other companies and institutions that may find it useful in
                  their data analytics or not.
                </p>
                <label id="share-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="data-option">
              <h1>Pricing optimization</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether you want us to optimize the pricing of our
                  memberships based on your location or not.
                </p>
                <label id="price-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="data-option">
              <h1>Anonymized selling of your data</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether you allow us to sell your data as an anonymous
                  user to other companies / schools or other institutions that
                  may use your data for various experiments and studies.
                </p>
                <label id="anon-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="data-option">
              <h1>Cookies policy</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether you want to accept cookies for a better site
                  experience and more relatable and up-to-date news or not.
                </p>
                <label id="cookie-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="data-option">
              <h1>Optimization</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether or not you want us to use your data to optimize
                  our website to the best of our abilities, using the news you
                  look at the most and sharing those news to other users that
                  have similar interests and hiding the ones you don't want to
                  see.
                </p>
                <label id="optim-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div class="data-option">
              <h1>Targeted Marketing</h1>
              <div class="data-paragraph-switch-container">
                <p>
                  Choose whether you want us to use the data you provide to
                  share products and other memberships that we find would be
                  useful to you.
                </p>
                <label id="target-switch" class="data-switch">
                  <input id="theme-checkbox" type="checkbox" />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <div class="data-option">
                <h1>Selling your data</h1>
                <div class="data-paragraph-switch-container">
                  <p>
                    Choose whether or not you allow us to sell your data to
                    other companies for unethical, profit centered,
                    exploitative, corrupt and inhumane reasons.
                  </p>
                  <label id="sell-switch" class="data-switch">
                    <input id="theme-checkbox" type="checkbox" checked />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>`);
};

const morePage = function () {
  const container = document.querySelector("#display");

  morePageHTML(container);
  removeCLickedClasses();
  removeMainList();

  const menuMoreBtn = document.querySelector("#menu-more");

  const moreNavigateBtns = document.querySelectorAll(".more-option");

  moreNavigateBtns.forEach((el) =>
    el.addEventListener("click", function () {
      if (this.id === "more-home") window.location.href = "#home";
      if (this.id === "more-membership") window.location.href = "#membership";
      if (this.id === "more-pricing") window.location.href = "#pricing";
      if (this.id === "more-about") window.location.href = "#about";
    })
  );

  menuMoreBtn.classList.add("menu-clicked");
};
const morePageHTML = function (container) {
  return (container.innerHTML = `  <div id="more">
          <div id="more-options">
            <div class="more-option" id="more-home">
              <div class="more-option-left">
                <span class="solar--home-bold pig"> </span>
              </div>
              <div class="more-option-right">
                <h1> Home </h1>
                <p>Go to the home page</p>
              </div>
            </div>
            <div class="more-option">
              <div class="more-option-left" id="more-membership">
                <span class="ic--round-remember-me pig"></span>
              </div>
              <div class="more-option-right">
                <h1> Membership </h1>
                <p>Become a member</p>
              </div>
            </div>
            <div class="more-option" id="more-pricing">
              <div class="more-option-left">
                <span class="simple-icons--cashapp pig"></span>
              </div>
              <div class="more-option-right">
                <h1> Pricing </h1>
                <p>Check out the prices</p>
              </div>
            </div>
            <div class="more-option" id="more-about">
              <div class="more-option-left"
                ><span class="mdi--about pig"></span>
              </div>
              <div class="more-option-right">
                <h1> About </h1>
                <p>See what we are all about</p>
              </div>
            </div>
          </div>
        </div>`);
};

const homePage = function () {
  const container = document.querySelector("#display");

  homePageHTML(container);

  const homeNavigateBtns = document.querySelectorAll(".home-option");

  homeNavigateBtns.forEach((el) =>
    el.addEventListener("click", function () {
      if (this.id === "home-preferences") window.location.href = "#preferences";
      if (this.id === "home-help") window.location.href = "#help";
      if (this.id === "home-account") window.location.href = "#account";
      if (this.id === "home-bookmarks") window.location.href = "#bookmarks";
      if (this.id === "home-privacy") window.location.href = "#privacy";
      if (this.id === "home-more") window.location.href = "#more";
    })
  );
};
const homePageHTML = function (container) {
  return (container.innerHTML = ` <div id="home">
        <div id="home-top">
          <h1 id="home-settings">Settings</h1>
          <h1>Home</h1>
        </div>
        <div id="home-bottom">
          <div id="home-options">
            <div class="home-option" id="home-account">
              <div class="home-option-left">
                <span class="ri--account-box-fill for"></span>
              </div>
              <div class="home-option-right">
                <h1>Account</h1>
                <p>Check out your account</p>
              </div>
            </div>
            <div class="home-option" id="home-privacy">
              <div class="home-option-left">
                <span class="ic--baseline-privacy-tip for"></span>
              </div>
              <div class="home-option-right">
                <h1>Privacy</h1>
                <p>Take a look at our privacy policy</p>
              </div>
            </div>
            <div class="home-option" id="home-preferences">
              <div class="home-option-left">
                <span class="material-symbols--room-preferences for"></span>
              </div>
              <div class="home-option-right">
                <h1>Preferences</h1>
                <p>Modify the look of the website</p>
              </div>
            </div>
            <div class="home-option" id="home-bookmarks">
              <div class="home-option-left">
                <span class="bi--bookmark-fill for"></span>
              </div>
              <div class="home-option-right">
                <h1>Bookmarks</h1>
                <p>All of your favorite news in one place</p>
              </div>
            </div>
            <div class="home-option" id="home-help">
              <div class="home-option-left">
                <span class="material-symbols--live-help-rounded for"></span>
              </div>
              <div class="home-option-right">
                <h1>Help</h1>
                <p>Read through some FaQs</p>
              </div>
            </div>
            <div class="home-option" id="home-more">
              <div class="home-option-left">
                <span class="ion--arrow-redo-sharp for"></span>
              </div>
              <div class="home-option-right">
                <h1>More</h1>
                <p>Take a look at more options</p>
              </div>
            </div>
          </div>
        </div>
      </div>`);
};

const membershipPage = function () {
  const container = document.querySelector("#display");

  membershipPageHTML(container);

  document
    .querySelector("#check-price-button")
    .addEventListener("click", function () {
      window.location.href = "#pricing";
    });

  const controlBtns = document.querySelectorAll(".control-button");
  controlBtns.forEach((el) =>
    el.addEventListener("click", function () {
      const rightCard = document.querySelector(`[data-num="2"]`);
      const mainCard = document.querySelector(`[data-num="1"]`);
      const leftCard = document.querySelector(`[data-num="0"]`);
      if (this.id === "right-control-button") {
        rightCard.dataset.num = "1";
        leftCard.dataset.num = "2";
        mainCard.dataset.num = "0";

        document.querySelector("#check-price-button").remove();

        rightCard.querySelector(".membership-option-bottom").insertAdjacentHTML(
          "beforeend",
          `   <button id="check-price-button"
                  ><span class="fluent-mdl2--see-do fog"></span>See
                  price</button
                >`
        );
        document
          .querySelector("#check-price-button")
          .addEventListener("click", function () {
            window.location.href = "#pricing";
          });
      }
      if (this.id === "left-control-button") {
        rightCard.dataset.num = "0";
        leftCard.dataset.num = "1";
        mainCard.dataset.num = "2";

        document.querySelector("#check-price-button").remove();

        leftCard.querySelector(".membership-option-bottom").insertAdjacentHTML(
          "beforeend",
          `   <button id="check-price-button"
                  ><span class="fluent-mdl2--see-do fog"></span>See
                  price</button
                >`
        );
        document
          .querySelector("#check-price-button")
          .addEventListener("click", function () {
            window.location.href = "#pricing";
          });
      }
    })
  );
};
const membershipPageHTML = function (container) {
  return (container.innerHTML = `<div id="membership">
          <div id="membership-top">
            <div id="membership-title">
              <h1>Membership</h1>
              <p
                >Choose what subscription you want to increase your overall news
                experience</p
              >
            </div>
          </div>
          <div id="membership-bottom">
            <div id="control-buttons">
              <button class="control-button" id="left-control-button"
                ><i class="fa-solid fa-chevron-left"></i
              ></button>
              <button class="control-button" id="right-control-button"
                ><i class="fa-solid fa-chevron-right"></i
              ></button>
            </div>
            <div class="membership-option" id="gold" data-num="0">
              <div class="membership-option-top">
                <h2>Gold</h2>
                <h1>Membership</h1>
              </div>
              <div class="membership-option-bottom">
                <ul class="get-list">
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li>
                    <span class="material-symbols-light--close fog"></span
                    >Lorem, ipsum.
                  </li>
                  <li>
                    <span class="material-symbols-light--close fog"></span
                    >Lorem, ipsum.
                  </li>
                  <li>
                    <span class="material-symbols-light--close fog"></span
                    >Lorem, ipsum.
                  </li>
                </ul>
              </div>
            </div>
            <div class="membership-option" id="diamond" data-num="1">
              <div class="membership-option-top">
                <h2>Diamond</h2>
                <h1>Membership</h1>
              </div>
              <div class="membership-option-bottom">
                <ul class="get-list">
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                </ul>
                <button id="check-price-button"
                  ><span class="fluent-mdl2--see-do fog"></span>See
                  price</button
                >
              </div>
            </div>
            <div class="membership-option" id="platinum" data-num="2">
              <div class="membership-option-top">
                <h2>Platinum</h2>
                <h1>Membership</h1>
              </div>
              <div class="membership-option-bottom">
                <ul class="get-list">
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li
                    ><span class="carbon--checkmark fog"></span>Lorem,
                    ipsum.</li
                  >
                  <li>
                    <span class="material-symbols-light--close fog"></span
                    >Lorem, ipsum.
                  </li>
                  <li>
                    <span class="material-symbols-light--close fog"></span
                    >Lorem, ipsum.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>`);
};

let membership,
  increaseQuantity,
  decreaseQuantity,
  quantityElement,
  quantity,
  price,
  checkout;

const pricingPage = function () {
  const container = document.querySelector("#display");

  pricingPageHTML(container);

  checkout = document.querySelector(".checkout-info");

  const detailContainer = document.querySelector(".payment-detail-container");

  const previewContainer = document.querySelector("#pricing-two");
  const diamondMembershipBtn = document.querySelector(
    "#diamond-membership-button"
  );
  const platinumMembershipBtn = document.querySelector(
    "#platinum-membership-button"
  );
  const goldMembershipBtn = document.querySelector("#gold-membership-button");

  diamondMembershipBtn.addEventListener("click", function () {
    previewContainer.innerHTML = ` 
  <div id="option-preview" class="diamond-preview">
                <div class="option-preview-top">
                  <div class="option-preview-icon">
                    <span class="basil--diamond-solid lag"></span>
                  </div>
                  <div class="option-preview-title">
                    <h1>Diamond</h1>
                    <p>News wizard</p>
                  </div>
                  <h1 class="membership-container">Membership</h1>
                </div>
                <div class="option-preview-bottom">
                <div class="option-preview-list-container">
                  <ul class="option-preview-list">
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                  </ul>
                  <ul class="option-preview-list">
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li>
                      <span class="carbon--checkmark fog"></span
                      >Lorem, ipsum.
                    </li>
                    <li>
                      <span class="carbon--checkmark fog"></span
                      >Lorem, ipsum.
                    </li>
                  </ul></div>
                       <button>Buy</button>
                </div>
              </div>`;
    updateBundleContainer();
    customPayment();
  });
  platinumMembershipBtn.addEventListener("click", function () {
    previewContainer.innerHTML = ` <div id="option-preview" class="platinum-preview">
                <div class="option-preview-top">
                  <div class="option-preview-icon">
                  <span class="game-icons--emerald lag"></span>
                  </div>
                  <div class="option-preview-title">
                    <h1>Platinum</h1>
                    <p>News knight</p>
                  </div>
                  <h1 class="membership-container">Membership</h1>
                </div>
                <div class="option-preview-bottom">
                <div class="option-preview-list-container">
                  <ul class="option-preview-list">
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                  </ul>
                  <ul class="option-preview-list">
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li>
                      <span class="carbon--checkmark fog"></span
                      >Lorem, ipsum.
                    </li>
                    <li>
                      <span class="carbon--checkmark fog"></span
                      >Lorem, ipsum.
                    </li>
                  </ul></div>
                       <button>Buy</button>
                </div>
              </div>`;
    updateBundleContainer();
    customPayment();
  });
  goldMembershipBtn.addEventListener("click", function () {
    previewContainer.innerHTML = ` 
  <div id="option-preview" class="gold-preview">
                <div class="option-preview-top">
                  <div class="option-preview-icon">
                    <span class="game-icons--gold-bar lag"></span>
                  </div>
                  <div class="option-preview-title">
                    <h1>Gold</h1>
                    <p>News pawn</p>
                  </div>
                  <h1 class="membership-container">Membership</h1>
                </div>
                <div class="option-preview-bottom">
                 <div class="option-preview-list-container">
                  <ul class="option-preview-list">
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                  </ul>
                  <ul class="option-preview-list">
                    <li
                      ><span class="carbon--checkmark fog"></span>Lorem,
                      ipsum.</li
                    >
                    <li>
                      <span class="material-symbols-light--close fog"></span
                      >Lorem, ipsum.
                    </li>
                    <li>
                      <span class="material-symbols-light--close fog"></span
                      >Lorem, ipsum.
                    </li>
                  </ul></div>
                  <button>Buy</button>

                </div>
              </div>`;
    updateBundleContainer();
    customPayment();
  });

  const payOptions = document.querySelectorAll(".payment-option");
  const optionBtns = document.querySelectorAll(".pricing-proceed-card");

  /*prettier-ignore */
  optionBtns.forEach((el) => el.addEventListener("click", bundlePayment));
  payOptions.forEach((el) =>
    el.addEventListener("click", function () {
      payOptions.forEach((el) => {
        el.classList.remove("payment-option-clicked");
        el.querySelector(".check").classList.remove("checked");
      });

      if (this.id === "pay-by-card")
        detailContainer.innerHTML = `    <div class="card-number-container info-container">
                      <label class="payment-information-label" for="card-number"
                        >Card number</label
                      >
                      <input type="text" name="card-number" id="card-number" />
                    </div>
                    <div class="expiration-ccv-container info-container">
                      <div class="expiration-container">
                        <label
                          class="payment-information-label"
                          for="expiration-date"
                          >Expiration date</label
                        >
                        <input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                        />
                      </div>
                      <div class="ccv-container">
                        <label class="payment-information-label" for="ccv"
                          >CCV</label
                        >
                        <input type="password" name="ccv" id="ccv" />
                      </div>
                    </div>
                    <div class="cardholder-container info-container">
                      <label
                        class="payment-information-label"
                        for="cardholder-name"
                        >Cardholder name</label
                      >
                      <input
                        type="text"
                        name="cardholder-name"
                        id="cardholder-name"
                      />
                      <div class="save-for-later-container info-container">
                        <input type="checkbox" name="" id="save-for-later" />
                        <label for="save-for-later">Save card for later</label>
                      </div>
                    </div>`;
      if (this.id === "pay-by-paypal")
        detailContainer.innerHTML = `  <p class="paypal-detail-title"
                      >Please log in to your paypal account to proceed with the
                      purchase.</p
                    >
                    <div class="paypal-login-container info-container">
                      <div class="payment-paypal-username info-container">
                        <label class="payment-information-label" for="paypal-username">Username</label>
                        <input type="text" name="" id="paypal-username" />
                      </div>
                      <div class="payment-paypal-password info-container">
                        <label class="payment-information-label" for="paypal-password">Password</label>
                        <input type="password" name="" id="paypal-password" />
                            <div class="save-for-later-container info-container">
                        <input type="checkbox" name="" id="save-for-later" />
                        <label for="save-for-later">Save account for later</label>
                      </div>
                      </div>
                    </div>`;

      this.classList.add("payment-option-clicked");
      this.querySelector(".check").classList.add("checked");
    })
  );

  increaseQuantity = document.querySelector("#add-quantity");
  decreaseQuantity = document.querySelector("#remove-quantity");
  quantityElement = document.querySelector(".pricing-quantity");

  quantity = 1;
  increaseQuantity.addEventListener("click", function () {
    if (document.querySelector(".bundle-discount"))
      document.querySelector(".bundle-discount").remove();

    if (quantity == 99) return;

    quantity++;
    quantityElement.textContent = `${quantity}x`;

    updateCheckout(quantity, price);
  });
  decreaseQuantity.addEventListener("click", function () {
    if (document.querySelector(".bundle-discount"))
      document.querySelector(".bundle-discount").remove();

    if (quantity == 1) return;

    quantity--;
    quantityElement.textContent = `${quantity}x`;

    updateCheckout(quantity, price);
  });

  const switchOptions = document.querySelector(".bundles-custom");

  switchOptions.addEventListener("click", function () {
    const bundleElement = document.querySelector("#pricing-three-top");

    if (switchOptions.textContent === "BUNDLES") {
      switchOptions.textContent = "CUSTOM";
      document.querySelector("#pricing-three").style.overflow = "visible";

      switchOptions.style.bottom = "250%";
      switchOptions.style.transform = "trnaslateY(0%)";
    } else {
      switchOptions.textContent = "BUNDLES";
      document.querySelector("#pricing-three").style.overflow = "hidden";

      switchOptions.style.bottom = "50%";
      switchOptions.style.transform = "trnaslateY(50%)";
    }

    bundleElement.classList.toggle("pricing-three-top-showing");
  });
};
const pricingPageHTML = function (container) {
  container.innerHTML = `    <div id="pricing">
          <div id="pricing-top">
            <div id="pricing-title">
              <h1>Pricing</h1>
              <p>Check out all of the membership's prices</p>
            </div>
          </div>
          <div id="pricing-bottom">
            <div id="pricing-one">
              <div class="pricing-option" id="pricing-diamond">
                <div class="pricing-option-top">
                  <div class="pricing-option-icon">
                    <span class="basil--diamond-solid lag"></span>
                  </div>
                  <div class="pricing-option-title">
                    <h1>Diamond</h1>
                    <p>Least amount of accessibilities</p>
                  </div>
                </div>
                <div class="pricing-option-bottom" id="diamond-membership-button">
                  <p>$ 59.99 <span>/m</span></p>
                </div>
              </div>
              <div class="pricing-option" id="pricing-platinum">
                <div class="pricing-option-top">
                  <div class="pricing-option-icon">
                    <span class="game-icons--emerald lag"></span>
                  </div>
                  <div class="pricing-option-title">
                    <h1>Platinum</h1>
                    <p>Least amount of accessibilities</p>
                  </div>
                </div>
                <div class="pricing-option-bottom" id="platinum-membership-button">
                  <p>$ 29.99 <span>/m</span></p>
                </div>
              </div>
              <div class="pricing-option" id="pricing-gold">
                <div class="pricing-option-top">
                  <div class="pricing-option-icon">
                    <span class="game-icons--gold-bar lag"></span>
                  </div>
                  <div class="pricing-option-title">
                    <h1>Gold</h1>
                    <p>Least amount of accessibilities</p>
                  </div>
                </div>
                <div class="pricing-option-bottom" id="gold-membership-button">
                  <p>$ 19.99 <span>/m</span></p>
                </div>
              </div>
            </div>
            <div id="pricing-two">
              <div id="option-preview" class="gold-preview">
                <div class="option-preview-top">
                  <div class="option-preview-icon">
                    <span class="basil--diamond-solid lag"></span>
                  </div>
                  <div class="option-preview-title">
                    <h1>Gold</h1>
                    <p>News wizard</p>
                  </div>
                  <h1 class="membership-container">Membership</h1>
                </div>
                <div class="option-preview-bottom">
                  <div class="option-preview-list-container">
                    <ul class="option-preview-list">
                      <li>
                        <span class="carbon--checkmark fog"></span>Lorem, ipsum.
                      </li>
                      <li>
                        <span class="carbon--checkmark fog"></span>Lorem, ipsum.
                      </li>
                      <li>
                        <span class="carbon--checkmark fog"></span>Lorem, ipsum.
                      </li>
                      <li>
                        <span class="carbon--checkmark fog"></span>Lorem, ipsum.
                      </li>
                    </ul>
                    <ul class="option-preview-list">
                      <li>
                        <span class="carbon--checkmark fog"></span>Lorem, ipsum.
                      </li>
                      <li>
                        <span class="material-symbols-light--close fog"></span
                        >Lorem, ipsum.
                      </li>
                      <li>
                        <span class="material-symbols-light--close fog"></span
                        >Lorem, ipsum.
                      </li>
                    </ul>
                  </div>
                  <button>Buy 1 month</button>
                </div>
              </div>
            </div>
            <div id="pricing-three">
              <div id="pricing-three-top">
                <div class="pricing-proceed-card">
                  <div class="pricing-proceed-card-option">
                    <h2 class="pricing-months">3</h2>
                    <p>Months</p>
                    <span
                      >$
                      <p class="pricing-price three-month-price">39.99</p>
                      /m</span
                    >
                  </div>
                </div>
                <div class="pricing-proceed-card">
                  <div class="pricing-proceed-card-option">
                    <h2 class="pricing-months">6</h2>
                    <p>Months</p>
                    <span
                      >$
                      <p class="pricing-price six-month-price">34.99</p>
                      /m
                    </span>
                  </div>
                </div>
                <div class="pricing-proceed-card">
                  <div class="pricing-proceed-card-option">
                    <h2 class="pricing-months">12</h2>
                    <p>Months</p>
                    <span
                      >$
                      <p class="pricing-price twelve-month-price">29.99</p>
                      /m</span
                    >
                  </div>
                </div>
              </div>

              <div id="pricing-three-top-two">
                <div id="payment-info-top">
                  <h2>Payment information</h2>
                  <p class="bundles-custom">BUNDLES</p>
                </div>
                <div id="pricing-top-container">
                  <div class="pricing-title">
                    <h3 class="pricing-membership">Diamond membership</h3>
                    <p>Buy in advance</p>
                  </div>
                  <div class="pricing-control-quantity-buttons">
                    <button id="add-quantity">+</button>
                    <button id="remove-quantity">-</button>
                    <h1 class="pricing-quantity">x1</h1>
                  </div>
                </div>
              </div>
              <div id="pricing-three-bottom">
                <div id="pricing-three-bottom-title">
                  <h2>Payment details</h2>
                  <p>
                    Complete your purchase by providing your payment details
                  </p>
                </div>
                <div class="payment-option-container">
                  <div class="payment-option" id="pay-by-card">
                    <span class="ion--card lag"></span>
                    <p>Pay by card</p>
                    <div class="check"></div>
                  </div>
                  <div class="payment-option" id="pay-by-paypal">
                    <span class="logos--paypal"></span>
                    <p>Pay with PayPal</p>
                    <div class="check"></div>
                  </div>
                </div>
                <div id="pricing-three-bottom-information">
                  <div class="payment-detail-container">

                  </div>
                </div>
                <div id="pricing-three-bottom-checkout">
             <div class="checkout-info"></div>
                 
                  <p class="total">Total <span class="total-price"></span></p>
                  <div class="payment-checkout-pay-button-container">
                    <button>
                      Confirm & Pay <span class="total-price"></span>
                    </button>
                    <div class="payment-checkout-pay-encrypted">
                      <span class="iconamoon--shield-yes-fill"></span>
                      <p>Payments are secured and encrypted</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`;
};
const updateCheckout = function (quantity, price) {
  const originalPriceValue = quantity * price;
  const discount = (originalPriceValue / 50).toFixed(2);

  const originalPriceElement = document.querySelector(".original-price");
  const totalPriceElement = document.querySelectorAll(".total-price");

  if (quantity >= 10 && !document.querySelector(".discount")) {
    checkout.insertAdjacentHTML(
      "afterbegin",
      `
 <p class="discount">
                    Discount (2% per month after 10 months):
                    <span class="discount-price"></span>
                  </p>`
    );

    console.log(discount);
  } else if (quantity < 10 && document.querySelector(".discount"))
    document.querySelector(".discount").remove();

  if (
    document.querySelector(".discount-price")
  ) {
    document.querySelector(".discount-price").textContent = `- ${discount}$`;

    /*prettier-ignore */
    totalPriceElement.forEach((el) => (el.textContent = `${(originalPriceValue - discount).toFixed(2)}$`));
  } /*prettier-ignore */ else
    totalPriceElement.forEach(
      (el) => (el.textContent = `${originalPriceValue.toFixed(2)}$`)
    );
  originalPriceElement.textContent = `${quantity} month/s of ${membership}: ${originalPriceValue.toFixed(
    2
  )}$`;
};

const bundlePayment = function () {
  const bundlePrice = +this.querySelector(".pricing-price").textContent;
  const months = +this.querySelector(".pricing-months").textContent;

  let price;

  if (membership.startsWith("Diamond")) price = 59.99;
  if (membership.startsWith("Gold")) price = 19.99;
  if (membership.startsWith("Platinum")) price = 29.99;

  const originalPriceValue = months * price;
  const bundleDiscount = (originalPriceValue - bundlePrice * months).toFixed(2);
  const discount = (originalPriceValue / 50).toFixed(2);

  checkout.innerHTML = `<p class="subtotal">
                    Subtotal:
                    <span class="subtotal-price"
                      ><span class="original-price"></span
                    ></span>
                  </p>
                   <p class="bundle-discount">
                    Bundle discount:
                    <span class="bundle-discount-price"></span>
                  </p>
           `;

  if (months >= 10 && !document.querySelector(".discount")) {
    checkout.insertAdjacentHTML(
      "afterbegin",
      `
 <p class="discount">
                    Discount (2% per month after 10 months):
                    <span class="discount-price"></span>
                  </p>`
    );

    console.log(discount);
  } else if (months < 10 && document.querySelector(".discount"))
    document.querySelector(".discount").remove();

  const totalPriceElement = document.querySelectorAll(".total-price");

  if (document.querySelector(".discount-price")) {
    document.querySelector(".discount-price").textContent = `- ${discount}$`;
    /*prettier-ignore */
    totalPriceElement.forEach((el) => (el.textContent = `${(originalPriceValue - bundleDiscount - discount).toFixed(2)}$`));
  } else {
    /*prettier-ignore */
    totalPriceElement.forEach((el) => (el.textContent = `${(originalPriceValue - bundleDiscount).toFixed(2)}$`));
  }
  const originalPriceElement = document.querySelector(".original-price");
  const bundleDiscountElement = document.querySelector(
    ".bundle-discount-price"
  );

  originalPriceElement.textContent = `${months} month/s of ${membership}: ${originalPriceValue}$`;
  bundleDiscountElement.textContent = `- ${bundleDiscount}$`;
};
const customPayment = function () {
  document
    .querySelector("#pricing-three")
    .classList.add("pricing-three-showing");

  quantity = 1;

  quantityElement.textContent = `${quantity}x`;

  membership = document.querySelector(".option-preview-title h1").textContent;

  if (membership.startsWith("Diamond")) price = 59.99;
  if (membership.startsWith("Gold")) price = 19.99;
  if (membership.startsWith("Platinum")) price = 29.99;

  document.querySelector(
    ".pricing-membership"
  ).textContent = `${membership} membership`;

  checkout.innerHTML = `<p class="subtotal">
                    Subtotal:
                    <span class="subtotal-price"
                      ><span class="original-price"></span
                    ></span>
                  </p>`;

  const originalPriceElement = document.querySelector(".original-price");
  const totalPriceElement = document.querySelectorAll(".total-price");

  originalPriceElement.textContent = `1 month of ${membership}: ${price}$`;
  /*prettier-ignore */
  totalPriceElement.forEach((el) => (el.textContent = `${price}$`));
};

const updateBundleContainer = function () {
  const prices = document.querySelectorAll(".pricing-price");

  membership = document.querySelector(".option-preview-title h1").textContent;

  if (membership.startsWith("Diamond")) price = 59.99;
  if (membership.startsWith("Gold")) price = 19.99;
  if (membership.startsWith("Platinum")) price = 29.99;

  prices.forEach((el) => {
    if (el.classList.contains("three-month-price"))
      el.textContent = `${(price * 0.9).toFixed(2)}`;
    if (el.classList.contains("six-month-price"))
      el.textContent = `${(price * 0.8).toFixed(2)}`;
    if (el.classList.contains("twelve-month-price"))
      el.textContent = `${(price * 0.7).toFixed(2)}`;
  });
};

const aboutPage = function () {
  window.location.href = "#about";

  const container = document.querySelector("#display");

  aboutPageHTML(container);
};
const aboutPageHTML = function (container) {
  return (container.innerHTML = `  <div id="about">
          <p id="gpt">This text was generated by ChatGPT</p>
          <div id="about-top">
            <h1 id="about-title">About Newsly</h1>
          </div>
          <div id="about-bottom">
            <div id="about-bottom-left">
              <p>
                <span class="big">N</span>estled in the bustling landscape of
                online media, Newsly emerges as a dynamic platform, akin to
                Google News, offering a diverse array of stories curated from
                across the globe. With its intuitive interface and comprehensive
                coverage, Newsly stands as a beacon of reliable information in
                the digital age. Whether it's breaking news or in-depth
                analyses, users can rely on Newsly to deliver timely updates on
                a myriad of topics, catering to a wide spectrum of interests.
              </p>

              <p>
                <span class="big">E</span>mbracing innovation, Newsly harnesses
                the power of advanced algorithms to personalize the news feed
                for each user, ensuring a tailored experience that resonates
                with individual preferences. Through its seamless integration of
                cutting-edge technology, Newsly empowers users to stay informed
                effortlessly, facilitating a deeper engagement with current
                events and trending topics. By prioritizing user experience,
                Newsly sets itself apart as a frontrunner in the competitive
                landscape of online news aggregation.
              </p>

              <p>
                <span class="big">W</span>ith an unwavering commitment to
                journalistic integrity, Newsly upholds the highest standards of
                accuracy and credibility in its reporting. Every story featured
                on the platform undergoes rigorous vetting processes,
                safeguarding against misinformation and fake news. As a trusted
                source of information, Newsly fosters a culture of transparency,
                enabling users to navigate the complexities of the media
                landscape with confidence and clarity.
              </p>

              <p>
                <span class="big">S</span>pearheading the dissemination of
                knowledge, Newsly serves as a catalyst for informed discourse
                and societal progress. Through its diverse range of perspectives
                and thought-provoking content, Newsly fosters a vibrant
                community of engaged citizens who actively participate in
                shaping the narrative of our times. By amplifying voices from
                all corners of the globe, Newsly cultivates a richer
                understanding of the world we inhabit, fostering empathy and
                solidarity across cultural divides.
              </p>

              <p>
                <span class="big">L</span>everaging the power of collaboration,
                Newsly partners with leading media outlets and independent
                journalists to deliver unparalleled coverage of global events.
                Through strategic alliances and syndication agreements, Newsly
                expands its reach and enriches its content offerings, ensuring
                that users have access to a comprehensive panorama of news and
                insights. By fostering mutually beneficial relationships within
                the media ecosystem, Newsly reinforces its position as a
                cornerstone of the digital news landscape.
              </p>

              <p>
                <span class="big">Y</span>earning to redefine the way we consume
                information, Newsly remains steadfast in its mission to empower
                individuals with knowledge and understanding. By embracing the
                ethos of innovation, integrity, and inclusivity, Newsly charts a
                course towards a future where access to reliable news is not
                just a privilege but a fundamental right. With each click and
                scroll, Newsly reaffirms its commitment to serving as a beacon
                of truth in an increasingly complex world.
              </p>
            </div>
            <div id="about-bottom-right">
              <img src="../dinge.png" alt="" />
              <div id="about-background-accent"></div>
            </div>
          </div>
          <p>
            At Newsly, we are committed to delivering accurate, unbiased, and
            timely news coverage. We prioritize quality journalism and strive to
            maintain the highest standards of integrity and professionalism in
            everything we do. You can trust Newsly to provide you with reliable
            information that you can count on.
          </p>
          <p>
            Thank you for choosing Newsly as your trusted source for news and
            information. We're excited to have you join our community, and we
            look forward to keeping you informed and engaged every step of the
            way.
          </p>
        </div>`);
};

let bookmarkPage;
const bookmarksPage = function () {
  removeCLickedClasses();
  addMainList();

  bookmarkBtn.classList.add("menu-clicked");

  const container = document.querySelector("#display");

  bookmarksPageHTML(container);

  bookmarkPage = document.querySelector("#bookmarked");
  const bookmarkBtns = document.querySelectorAll(".bookmarks-button");

  bookmarkBtns.forEach((el) =>
    el.addEventListener("click", function () {
      if (this.id === "bookmarked-categories") bookmarkedCategoriesHTML();
      if (this.id === "bookmarked-locations") bookmarkedLocationsHTML();
      if (this.id === "bookmarked-sources") bookmarkedSourcesHTML();
      if (this.id === "bookmarked-searches") bookmarkedSearchesHTML();
      if (this.id === "bookmarked-stories") bookmarkedStoriesHTML();
    })
  );
};
const bookmarksPageHTML = function (container) {
  return (container.innerHTML = `   <div id="bookmarks">
          <div id="bookmarks-top">
            <div id="bookmarks-title">
              <h1>Bookmarks</h1>
              <p>Check out your favorite categories</p>
            </div>
          </div>
          <div id="bookmarks-bottom">
            <div id="bookmarked-container">
              <button class="bookmarks-button" id="bookmarked-categories">
                CATEGORIES
              </button>
              <button class="bookmarks-button" id="bookmarked-locations">
                LOCATIONS
              </button>
              <button class="bookmarks-button" id="bookmarked-sources">
                SOURCES
              </button>
              <button class="bookmarks-button" id="bookmarked-searches">
                SEARCHES
              </button>
              <button class="bookmarks-button" id="bookmarked-stories">
                STORIES
              </button>
            </div>
            <div id="bookmarked">
              <div id="none-bookmarked">
                <img
                  src="https://s3.amazonaws.com/digitalgov/hcd-intro_w600.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>`);
};

const bookmarkedCategoriesHTML = function () {
  bookmarkPage.innerHTML = "";
  if (!loggedInAs.following || loggedInAs.following.length === 0) {
    bookmarkPage.innerHTML = ` <div id="none-bookmarked">
                <img
                  id="none-bookmarked-image"
                  src="https://lh3.googleusercontent.com/nuos3uRehQ6gjGOJeBVvbTBnKGRpFBNScAyr9f3Z9CEpd_Loi1zB39poSX9QbdIjTNevSt2o=rw"
                  alt=""
                />
                <p id="none-bookmarked-paragraph"
                  >When you follow a topic it will appear here. You'll also see
                  more related stories in the For You feed.</p
                >
              </div>`;
    return;
  }
  bookmarkPage.innerHTML = `<div id="bookmarked-wrapper"></div>`;
  const bookmarkedContainer = document.querySelector("#bookmarked-wrapper");

  bookmarkedContainer.innerHTML += `${loggedInAs.following
    .map(
      (el) =>
        `<div class="bookmarked-category">
        <div class="bookmarked-category-left"><i class="fa-solid fa-comments lts-icon" aria-hidden="true"></i>
        </div>
        <div class="bookmarked-category-right">${el}</div>
        </div>`
    )
    .join("")}`;
};
const bookmarkedLocationsHTML = function () {
  bookmarkPage.innerHTML = "";
  if (
    !loggedInAs.followedLocation ||
    loggedInAs.followedLocation.length === 0
  ) {
    bookmarkPage.innerHTML = ` 
              <div id="none-bookmarked">
                <img
                  id="none-bookmarked-image"
                  src="https://lh3.googleusercontent.com/SOCn77ylz-ppK_80GxYfcNeHebloX7Vx9IvKbGzL6Aken01llMjZYjKoPTsvSTkGkBc1rwL2=rw"
                  alt=""
                />
                <p id="none-bookmarked-paragraph"
                  >When you follow a location it will appear here.</p
                >
              </div>`;
    return;
  }
  bookmarkPage.innerHTML = `<div id="bookmarked-wrapper"></div>`;
  const bookmarkedContainer = document.querySelector("#bookmarked-wrapper");

  bookmarkedContainer.innerHTML += `${loggedInAs.followedLocation
    .map(
      (el) =>
        `<div class="bookmarked-category">
        <div class="bookmarked-category-left"><i class="fa-solid fa-location-dot lts-icon" aria-hidden="true"></i>
        </div>
        <div class="bookmarked-category-right">${el}</div>
        </div>`
    )
    .join("")}`;
};
const bookmarkedSourcesHTML = function () {
  bookmarkPage.innerHTML = "";
  if (!loggedInAs.followedSources || loggedInAs.followedSources.length === 0) {
    bookmarkPage.innerHTML = `  
              <div id="none-bookmarked">
                <img
                  id="none-bookmarked-image"
                  src="https://lh3.googleusercontent.com/tFGfZ19wiRAvJsi5LeFL42_k_gV7bXV6dj3aKnatkcPRWKpu2fHUp367Awcdd7JceiE_bzBc=rw"
                  alt=""
                />
                <p id="none-bookmarked-paragraph"
                  >When you follow a source it will appear here. You'll also see more stories from that source in the For You feed.</p
                >
              </div>`;
    return;
  }
  bookmarkPage.innerHTML = `<div id="bookmarked-wrapper"></div>`;
  const bookmarkedContainer = document.querySelector("#bookmarked-wrapper");

  bookmarkedContainer.innerHTML += `${loggedInAs.followedSources
    .map(
      (el) =>
        `<div class="bookmarked-category">
        <div class="bookmarked-category-left"><i class="fa-solid fa-hashtag lts-icon" aria-hidden="true"></i>
        </div>
        <div class="bookmarked-category-right">${el}</div>
        </div>`
    )
    .join("")}`;
};
const bookmarkedSearchesHTML = function () {
  bookmarkPage.innerHTML = "";
  if (
    !loggedInAs.followedSearches ||
    loggedInAs.followedSearches.length === 0
  ) {
    bookmarkPage.innerHTML = `  <div id="none-bookmarked">
                <img
                  id="none-bookmarked-image"
                  src="https://lh3.googleusercontent.com/o_tai07eFNo8w2jfrZY_vh2Mv3DnrgXM1Ven6HBYn4vFxe949KwJgvAhYdq2Hmr4C_5jUbkkn84=rw"
                  alt=""
                />
                <p id="none-bookmarked-paragraph"
                  >Your saved searches will appear here.</p
                >
              </div>`;
    return;
  }

  bookmarkPage.innerHTML = `<div id="bookmarked-wrapper"></div>`;
  const bookmarkedContainer = document.querySelector("#bookmarked-wrapper");

  bookmarkedContainer.innerHTML += `${loggedInAs.followedSearches
    .map(
      (el) =>
        `<div class="bookmarked-category">
        <div class="bookmarked-category-left"><i class="fa-solid fa-magnifying-glass lts-icon" aria-hidden="true"></i>
        </div>
        <div class="bookmarked-category-right">${el}</div>
        </div>`
    )
    .join("")}`;
};
const bookmarkedStoriesHTML = function () {
  bookmarkPage.innerHTML = "";
  if (!loggedInAs.followedStories || loggedInAs.followedStories.length === 0) {
    bookmarkPage.innerHTML = ` 
              <div id="none-bookmarked">
                <img
                  id="none-bookmarked-image"
                  src="https://lh3.googleusercontent.com/7Iv4pkYA_hqsvlyo6XNy3UU0tUYgBR9rGrDHekm8-6cHO14jbUrOu8dCU86to2kzYoRVHJn0Ow=s0-rw"
                  alt=""
                />
                <p id="none-bookmarked-paragraph"
                  >Your saved stories will appear here.</p
                >
              </div>`;
    return;
  }

  bookmarkPage.innerHTML = `<div id="bookmarked-wrapper"></div>`;
  const bookmarkedContainer = document.querySelector("#bookmarked-wrapper");

  bookmarkedContainer.innerHTML += `${loggedInAs.followedStories
    .map(
      (el) =>
        `<div class="bookmarked-category">
        <div class="bookmarked-category-left"><i class="fa-solid fa-location-dot lts-icon" aria-hidden="true"></i>
        </div>
        <div class="bookmarked-category-right">${el}</div>
        </div>`
    )
    .join("")}`;
};
