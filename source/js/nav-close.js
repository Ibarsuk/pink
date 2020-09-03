let navButton = document.querySelector('.main-nav__toggle');
let mainNav = document.querySelector('.main-nav');

window.onload = function () {
  mainNav.classList.remove('main-nav--opened')
}

navButton.addEventListener("click", function(evt) {
  if (mainNav.classList.contains('main-nav--opened')) {
    mainNav.classList.remove('main-nav--opened')
  } else {
    mainNav.classList.add('main-nav--opened')
  }
});
