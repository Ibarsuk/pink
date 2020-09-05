var navButton = document.querySelector('.page-header__toggle');
var mainNav = document.querySelector('.main-nav');
var logoButton = document.querySelector('.page-header__logo-button');

window.onload = function () {
  mainNav.classList.remove('main-nav--opened')
}

navButton.addEventListener("click", function(evt) {
  if (mainNav.classList.contains('main-nav--opened')) {
    mainNav.classList.remove('main-nav--opened');
    logoButton.classList.remove('page-header__logo-button--menu-open')
  } else {
    mainNav.classList.add('main-nav--opened');
    logoButton.classList.add('page-header__logo-button--menu-open')
  }
});
