const hamburger = document.querySelector(".hamburger");
const hamburger_navMenu = document.querySelector(".hamburger_navMenu");

hamburger.addEventListener("click", () => {
    hamburger_navMenu.classList.toggle("show");
});



const search = document.querySelector(".search");
const searchBtn = document.querySelector(".searchBtn");
searchBtn.addEventListener("click", getUserInput);


function getUserInput() {
    form.submit();
}
