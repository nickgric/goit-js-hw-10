import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryNameInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

countryNameInput.addEventListener(
  'input',
  debounce(onCountryNameInput, DEBOUNCE_DELAY)
);

function onCountryNameInput() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
  if (countryNameInput.value.trim() === '') {
    return;
  }
  fetchCountries(countryNameInput.value).then(data => {
    console.log(data);
    if (data.length === 1) {
      oneCountryMarkup(data);
      return;
    }
    severalCountriesMarkup(data);
  });
}

function oneCountryMarkup(data) {
  console.log(data);
  data.forEach(country => {
    countryInfo.insertAdjacentHTML(
      'beforeend',
      `<ul class="country-list">
      <li class="country-list-item">${
        country.name.official
      }<p><img class="country-list-item-image" width="20" src="${
        country.flags.png
      }" alt="${country.name.official}"></li>
      <li class="country-list-item">
        <ul class="country-list">
          <li>🚩 Capital: ${country.capital}</li>
          <li>👨‍👩‍👧‍👦 Population: ${country.population}</li>
          <li>😄 Languages: ${Object.values(country.languages)}</li>
        </ul>
      </li>
      </ul>`
    );
  });
}

function severalCountriesMarkup(data) {
  let number = 1;
  data.forEach(country => {
    countryList.insertAdjacentHTML(
      'beforeend',
      `<li class="country-list-item"><p>${number}. ${country.name.official}<p><img class="country-list-item-image" width="20" src="${country.flags.png}" alt="${country.name.official}"></li>`
    );
    number = number + 1;
  });
}
