'use strict';

const eye = document.getElementById('eye');
const passwordType = document.querySelector('.container__password');

eye.addEventListener('click', () => {
    if (passwordType.type === 'password') {
        passwordType.type = 'text';
    } else {
        passwordType.type = 'password';
    }
});

const input = document.querySelectorAll('.container__input');
const warning = document.querySelectorAll('.warning');

const checked = document.querySelector('.container__checkbox');
const select = document.querySelector('.container__select');
const form = document.querySelector('.container__form');
const btn = document.querySelector('.container__btn');

const password = document.getElementById('password');
const email = document.getElementById('email');

form.addEventListener('change', () => {
    if (email.value.length === 0) {
        input[0].classList.add('error');
        warning[0].style.visibility = 'visible';
    } else {
        input[0].classList.remove('error');
        warning[0].style.visibility = 'hidden';
    }

    if (password.value.length === 0) {
        input[1].classList.add('error');
        warning[1].style.visibility = 'visible';
    } else {
        input[1].classList.remove('error');
        warning[1].style.visibility = 'hidden';
    }

    if (select.value === 'Country') {
        select.classList.add('error');
        warning[2].style.visibility = 'visible';
    } else {
        select.classList.remove('error');
        warning[2].style.visibility = 'hidden';
    }

    if (
        email.value.length === 0 ||
        select.value === 'Country' ||
        password.value.length === 0 ||
        !checked.checked
    ) {
        btn.style.backgroundColor = '#A2A2A2';
        btn.disabled = true;
    } else {
        btn.style.backgroundColor = '#0094FF';
        btn.disabled = false;
    }
});
