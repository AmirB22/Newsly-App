const menuBtns = document.querySelectorAll("#menu ul li");
const display = document.querySelector("#display");

const loggedInAs = JSON.parse(localStorage.getItem("loggedInAs"));

console.log(loggedInAs);

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
              <div class="basic-info flex">
                <p class="basic-info-key flex wd40">Name</p>
                <p class="basic-info-value flex wd60 basic-name">
                  Add a name...<i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex">
                <p class="basic-info-key flex wd40">Date of Birth</p>
                <p class="basic-info-value flex wd60">
                  Add your date of birth...
                  <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex">
                <p class="basic-info-key flex wd40">Gender</p>
                <p class="basic-info-value flex wd60">
                  Add a gender...<i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="basic-info flex">
                <p class="basic-info-key flex wd40">Email</p>
                <p class="basic-info-value flex wd60">
                  ${loggedInAs.email} <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
            <div id="account-info">
              <h2>Account info</h2>
              <div class="account-info flex">
                <p class="wd40">Username</p>
                <p class="account-info-value flex wd60">
                  ${loggedInAs.username} <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
              <div class="account-info flex">
                <p class="wd40">Password</p>
                <p class="account-info-value flex wd60">
                  ********** <i class="fa-solid fa-angle-right"></i>
                </p>
              </div>
            </div>
          </div>
        </div>
         <div class="control-window flex">
            <i class="fa-solid fa-arrow-right-long"></i>
            <p class="nowrap">Hide window</p>
          </div>
        <div id="display-right" class="flex">
            
          <div class="workbench flex">
            <i class="fa-solid fa-wrench"></i>
            <p class="nowrap">This is where the magic happens.</p>
          </div>
        </div>`;

      const changeName = document.querySelector(".basic-name");

      const controlWindow = document.querySelector(".control-window");

      changeName.addEventListener("click", changeUsername);

      controlWindow.addEventListener("click", controlWindowHTML);
    } else display.innerHTML = "nigger";
  })
);
const changeUsername = function () {
  const changeContainer = document.querySelector("#display-right");
  changeContainer.innerHTML = ` <div id="change-name">
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
                    <input type="text" name="" />
                    <p id="first-name" class="input-text">First Name</p>
                  </div>
                  <div class="flex">
                    <input type="text" name="" />
                    <p id="last-name" class="input-text">Last Name</p>
                  </div>
                </div>
                <p>
                  By default, your name will be displayed in your profile
                  preview meaning other people will be able to see it, you can
                  choose to disable this.
                </p>
              </form>
              <div id="change-name-buttons-container">
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
          </div>`;
  const changeName = document.querySelector(".basic-name");

  const childArrow = changeName.lastElementChild;
  childArrow.style.transform = "rotate(180deg)";

  changeContainer.classList.add("display-change-name");
  changeContainer.classList.add("display-right-hidden");

  controlWindowHTML();

  const inputInnerText = document.querySelectorAll(".input-text");
  const inputs = document.querySelectorAll("#change-name-bottom input");

  const cancelBtn = document.querySelector("#change-name-cancel-button");

  cancelBtn.addEventListener("click", function () {
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
      el.addEventListener("focusout", function () {
        if (!this.value)
          this.nextElementSibling.classList.remove("input-text-focused");
      });
    })
  );
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
