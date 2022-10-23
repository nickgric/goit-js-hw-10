import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');

import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

const countryNameInput = document.querySelector('#search-box');

countryNameInput.addEventListener(
  'input',
  debounce(onCountryNameInput, DEBOUNCE_DELAY)
);

function onCountryNameInput() {
  if (countryNameInput.value === '') {
    return;
  }
  fetchCountries(countryNameInput.value);
}
