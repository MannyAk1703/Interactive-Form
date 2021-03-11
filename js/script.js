console.log("Test");

//Variables defined from the HTML file
const names = document.querySelector(".error-border");
const userTitle = document.getElementById("title");
const jobRoleOther = document.querySelector(".other-job-role");
const shirtDesign = document.getElementById("design");
const shirtColor = document.getElementById("color");
const design = shirtDesign.options;
const color = shirtColor.options;
//color.removeAttribute("data-theme");
//const get = color.getAttribute("data-theme");

//////REMEMBER THIS DOESNT WORK
names.focus = false;

console.log(names);
console.log(color);

//Function to display 'Other job role' input when Others is selected in job role
function hide() {
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
}

//Function to display only certain
function shirtInfo() {
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
}

//Running function
hide();
shirtInfo();
