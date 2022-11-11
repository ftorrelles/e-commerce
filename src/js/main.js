import "./mixitup.js";

const iconMenu = document.querySelector(".nav_toggle");
const menuNav = document.querySelector(".menu_nav");

console.log(iconMenu);
console.log(menuNav);

iconMenu.addEventListener("click", function () {
    // iconMenu.classList.toggle("bx-x");
    menuNav.classList.toggle("menu_nav-show");
});

const Cerrar = document.querySelectorAll('.menu_nav a[href^="#"]');

Cerrar.forEach((cerrar) => {
    cerrar.addEventListener("click", function () {
        // iconMenu.classList.remove("bx-grid-alt");
        menuNav.classList.remove("menu_nav-show");
    });
});
