var navButton = document.querySelector('.page-header__toggle');
var mainNav = document.querySelector('.main-nav');
var logoButton = document.querySelector('.page-header__logo-button');

window.onload = function () {
  mainNav.classList.remove('main-nav--opened');
}

navButton.addEventListener("click", function(evt) {
  mainNav.classList.toggle('main-nav--opened');
  logoButton.classList.toggle('page-header__logo-button--menu-open');
});
