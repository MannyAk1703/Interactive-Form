//Variables defined from the HTML file
//Name and email constants
const form = document.querySelector("form");
const userName = document.querySelector("#name");
const nameHint = document.querySelector("#name-hint");
const userEmail = document.querySelector("#email");
const userTitle = document.getElementById("title");
const jobRoleOther = document.querySelector(".other-job-role");

//Shirt Constant
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
const design = shirtDesign.options;
const color = shirtColor.options;

//Register Constants
const checkBox = document.querySelector(".activities-box");
const activitiesCost = document.querySelector("#activities");
const sum = document.querySelector("#activities-cost");
const checkBoxes = document.querySelectorAll("input[type=checkbox]");
let totalCost = 0;

//Payment Cinstant
const userPayment = document.querySelector("#payment");
const paymentMethod = document.querySelector(".payment-methods").children;
const paypal = document.querySelector(".paypal");
const bitcoin = document.querySelector(".bitcoin");
const creditCardDiv = document.querySelector("#credit-card");
const cardNumber = document.querySelector("#cc-num");
const zip = document.querySelector("#zip");
const cvv = document.querySelector("#cvv");

//Display 'Other job role' input when Others is selected in job role
userName.focus();
jobRoleOther.style.display = "none";
userTitle.addEventListener("change", (e) => {
  const selected = e.target;
  console.log(selected.value);

  if (selected.value === "other") {
    jobRoleOther.style.display = "block";
  } else {
    jobRoleOther.style.display = "none";
  }
});

//Display only certain shirt colors when design selected
shirtColor.disabled = true;
shirtDesign.addEventListener("change", (e) => {
  const selected = e.target;

  if (selected.value === "js puns" || "heart js") {
    shirtColor.disabled = false;
  }

  for (let i = 0; i < color.length; i++) {
    const value = selected.value;
    const dataTheme = color[i].getAttribute("data-theme");
    console.log(dataTheme);
    if (dataTheme === value) {
      color[i].hidden = false;
    } else {
      color[i].hidden = true;
    }
  }
});

//Dispaly selected activities cost
activitiesCost.addEventListener("change", (e) => {
  const clicked = e.target;
  let clickedCost = clicked.getAttribute("data-cost");
  clickedCost = Number(clickedCost);
  if (clicked.checked) {
    totalCost += clickedCost;
  } else {
    totalCost -= clickedCost;
  }
  sum.textContent = `Total: $${totalCost}`;
});

//Payment selection

userPayment.options[1].selected = true;
paypal.style.display = "none";
bitcoin.style.display = "none";
userPayment.addEventListener("change", (e) => {
  const selected = e.target;

  for (let i = 2; i < paymentMethod.length; i++) {
    paymentMethod[i].style.display = "none";
    if (selected.value === paymentMethod[i].className) {
      paymentMethod[i].style.display = "block";
    }
  }
});

//Constants for Validation
cardNumber.maxLength = 16;
zip.maxLength = 5;
cvv.maxLength = 3;

// Validation functions: check appropriate fields
const nameValidator = () => {
  const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(
    userName.value
  );
  return nameIsValid;
};
const emailValidator = () => {
  const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail.value);
  return emailIsValid;
};
const registerValidator = () => {
  const registerIsValid = totalCost > 0;
  return registerIsValid;
};
const cardNumberValidator = () => {
  const cardNumberIsValid = /^[0-9]{13,16}$/g.test(cardNumber.value);
  return cardNumberIsValid;
};
const zipValidator = () => {
  const zipIsValid = /^\d{5}$/.test(zip.value);
  return zipIsValid;
};
const cvvValidator = () => {
  const cvvIsValid = /^\d{3}$/.test(cvv.value);
  return cvvIsValid;
};

// isInvalid and isValid change classes and appearance on appropriate fields
function isInvalid(element) {
  const parEl = element.parentElement;
  parEl.classList.add("not-valid");
  parEl.classList.remove("valid");
  parEl.lastElementChild.style.display = "block";
}
function isValid(element) {
  const parEl = element.parentElement;
  parEl.classList.add("valid");
  parEl.classList.remove("not-valid");
  parEl.lastElementChild.style.display = "none";
}

// Adds and Removes .focus class for checkbox parents
checkBoxes.forEach((e) => {
  e.addEventListener("focus", (e) => {
    e.target.parentElement.classList.add("focus");
  });
  e.addEventListener("blur", (e) => {
    const active = document.querySelector(".focus");
    if (active) {
      active.classList.remove("focus");
    }
  });
});

// validates userNamee on keyup.
userName.addEventListener("keyup", (e) => {
  if (!nameValidator()) {
    if (userName.value.length > 0) {
      nameHint.innerHTML = "Name cannot contain numbers or punctuation";
    } else if (userName.value.length === 0) {
      nameHint.innerHTML = "Name field cannot be left blank";
    }
    isInvalid(userName);
  } else {
    isValid(userName);
  }
});

// validates email on keyup.
email.addEventListener("keyup", (e) => {
  if (!emailValidator()) {
    isInvalid(userEmail);
  } else {
    isValid(userEmail);
  }
});

// validates register on change.
activitiesCost.addEventListener("change", (e) => {
  const selected = e.target;
  const clickedType = e.target.getAttribute("data-day-and-time");

  // disable and style change for ineligable selections, based on time-slot conflict
  for (let i = 0; i < checkBoxes.length; i++) {
    const checkBoxType = checkBoxes[i].getAttribute("data-day-and-time");
    if (checkBoxType === clickedType && checkBoxes[i] !== selected) {
      if (selected.checked) {
        checkBoxes[i].disabled = true;
        checkBoxes[i].parentElement.style.backgroundColor = "gray";
      } else {
        checkBoxes[i].disabled = false;
        checkBoxes[i].parentElement.style.backgroundColor = "";
      }
    }
  }

  if (!registerValidator()) {
    const parEl = activitiesCost;
    parEl.classList.add("not-valid");
    parEl.classList.remove("valid");
    e.preventDefault();
    document.querySelector("#activities-hint").style.display = "block";
  } else {
    const parEl = activitiesCost;
    parEl.classList.add("valid");
    parEl.classList.remove("not-valid");
    document.querySelector("#activities-hint").style.display = "none";
  }
});

// validates cardNumber on keyup
cardNumber.addEventListener("keyup", (e) => {
  if (!cardNumberValidator()) {
    isInvalid(cardNumber);
    e.preventDefault();
  } else {
    isValid(cardNumber);
  }
});

// validates zip on keyup
zip.addEventListener("keyup", (e) => {
  if (!zipValidator()) {
    isInvalid(zip);
    e.preventDefault();
  } else {
    isValid(zip);
  }
});

// validates cvv on keyup
cvv.addEventListener("keyup", (e) => {
  if (!cvvValidator()) {
    isInvalid(cvv);
    e.preventDefault();
  } else {
    isValid(cvv);
  }
});
