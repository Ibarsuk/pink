var form = document.querySelector('.page-main__contest-form');
var formSubmit = form.querySelector('.contest-form__submit-button');
var pageSuccessPopup = document.querySelector('.page-success');
var pageSuccessClose = pageSuccessPopup.querySelector('.page-success__close');
var pageErrorPopup = document.querySelector('.page-error');
var pageErrorClose = pageErrorPopup.querySelector('.page-error__close');

formSubmit.addEventListener("click", function(evt) {
  if (!form.checkValidity()) {
    pageErrorPopup.classList.remove('hidden');
    return;
  }
  evt.preventDefault();
  pageSuccessPopup.classList.remove('hidden');
  formSubmit.disabled = true;
});

pageSuccessClose.addEventListener("click", function(evt) {
  pageSuccessPopup.classList.add('hidden');
});

pageErrorClose.addEventListener("click", function(evt) {
  pageErrorPopup.classList.add('hidden');
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27 && !pageSuccessPopup.classList.contains('hidden')) {
      pageSuccessPopup.classList.add('hidden');
    }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27 && !pageErrorPopup.classList.contains('hidden')) {
      pageErrorPopup.classList.add('hidden');
    }
});
