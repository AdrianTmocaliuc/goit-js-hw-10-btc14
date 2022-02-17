import { Notify } from 'notiflix';
const debounce = require('lodash.debounce');
import './css/styles.css';
import { fetchCountries } from './service/fetchCountries';
import { refs } from './service/refs';
import { renderListMarkup, renderCountryMarkup } from './service/markup';

const DEBOUNCE_DELAY = 300;

function clearAll() {
  refs.list.innerHTML = '';
  refs.info.innerHTML = '';
}

refs.input.addEventListener('input', debounce(searchCountries, 300));

function searchCountries(e) {
  const inputText = e.target.value.trim();

  if (inputText === '') clearAll();

  fetchCountries(inputText)
    .then(res => {
      if (res.length > 10) {
        clearAll();
        return Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (2 <= res.length && res.length <= 10) {
        clearAll();
        return renderListMarkup(res);
      } else {
        clearAll();

        return renderCountryMarkup(res);
      }
    })
    .catch(err => {
      clearAll();
      Notify.failure(err.message);
    });
}
