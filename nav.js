// Get elements
const burgerMenu = document.querySelector(".burger-menu");
const navbar = document.querySelector("header nav");
const navbarLinks = document.querySelectorAll(".navbar a");

// Toggle the menu visibility when burger icon is clicked
burgerMenu.addEventListener("click", function () {
  navbar.classList.toggle("active"); // Toggle the active class to show/hide the menu
});

// Close the menu when a navbar link is clicked
navbarLinks.forEach((link) => {
  link.addEventListener("click", function () {
    navbar.classList.remove("active"); // Close the menu after clicking on a link
  });
});

// Close the menu when clicking outside of the navbar
document.addEventListener("click", function (e) {
  if (!navbar.contains(e.target) && !burgerMenu.contains(e.target)) {
    navbar.classList.remove("active"); // Close the menu when clicking outside
  }
});

// Close the menu when scrolling
window.addEventListener("scroll", function () {
  navbar.classList.remove("active"); // Close the menu when scrolling
});
