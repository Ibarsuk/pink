var form = document.querySelector('.page-main__contest-form');
var formSubmit = document.querySelector('.contest-form__submit-button');
var pageSuccessPopup = document.querySelector('.page-success');
var pageSuccessClose = document.querySelector('.page-success__close');
var pageErrorPopup = document.querySelector('.page-error');
var pageErrorClose = document.querySelector('.page-error__close');

formSubmit.addEventListener("click", function(evt) {
  if (form.checkValidity() === true) {
    evt.preventDefault();
    pageSuccessPopup.classList.remove('hidden');
    formSubmit.disabled = true;
  } else {
    pageErrorPopup.classList.remove('hidden');
  }

});

pageSuccessClose.addEventListener("click", function(evt) {
  pageSuccessPopup.classList.add('hidden');
});

pageErrorClose.addEventListener("click", function(evt) {
  pageErrorPopup.classList.add('hidden');
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27 && pageSuccessPopup.classList.contains('hidden') === false) {
      pageSuccessPopup.classList.add('hidden');
    }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27 && pageErrorPopup.classList.contains('hidden') === false) {
      pageErrorPopup.classList.add('hidden');
    }
});
