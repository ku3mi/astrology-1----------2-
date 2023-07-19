// перемещение блоков в первой секции

const widthMax = window.matchMedia('(min-width: 1024px)');
//   const widthMin = window.matchMedia('(max-width: 768px)');
const firstWrapper = document.querySelector('.first__about');
const firstAdvantagesWrapper = document.querySelector(
  '.first__advantages-moving'
);
const link = document.querySelector('.js-link');
// js-link

if (window.screen.width > 1024) {
  firstWrapper.append(firstAdvantagesWrapper);
  firstWrapper.append(link);
}

// Swiper client
const swiper = new Swiper('.swiper', {
  spaceBetween: 30,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

document.addEventListener('DOMContentLoaded', () => {
  let accordions = document.querySelectorAll('.js-accordion');
  accordions.forEach((element) => {
    let control = element.querySelector('.js-button-accordion');
    control.addEventListener('click', function () {
      let accordion = this.closest('.js-accordion');
      accordion.classList.toggle('open');

      let button = this.querySelector('span');
      button.classList.toggle('rotate');
    });
  });
});

// аккордион в консультации

//FAQ - accorderon
let faq = document.querySelectorAll('.js-faq');
faq.forEach((element) => {
  let control1 = element.querySelector('.js-button-faq');
  control1.addEventListener('click', function () {
    this.closest('.js-faq').classList.toggle('open');
  });
});

// Навигация
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav__menu');
const body = document.body;

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navMenu.classList.toggle('active');
  body.classList.toggle('noscroll');
});

// form
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const loading = document.getElementById('loading');

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();
    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      loading.classList.add('__sending');

      let response = await fetch('sendmail.php', {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        formPreview.innerHTML = '';
        form.reset();
        loading.classList.remove('__sending');
      } else {
        alert('Ошибка');
        loading.classList.remove('__sending');
      }
    } else {
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.__req');
    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);
      if (input.classList.contains('__email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (
        input.getAttribute('type') === 'checkbox' &&
        input.checked === false
      ) {
        formAddError(input);
        error++;
      } else {
        if (input.value === '') {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('__error');
    input.classList.add('__error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('__error');
    input.classList.remove('__error');
  }
});
