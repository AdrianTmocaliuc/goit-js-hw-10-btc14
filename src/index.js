import './css/styles.css';
const debounce = require('lodash.debounce');
import { fetchCountries } from './service/fetchCountries';

const DEBOUNCE_DELAY = 300;

// console.log(fetchCountries('peru'));

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(searchCountries, 300));

function searchCountries(e) {
  const inputText = e.target.value.trim();

  if (inputText === '') refs.list.innerHTML = '';

  fetchCountries(inputText)
    .then(res => {
      if (res.length > 10) {
        return console.log('Too many matches found. Please enter a more specific name.');
      } else if (2 <= res.length && res.length <= 10) {
        return renderListMarkup(res);
      } else {
        return console.dir(res);
      }
    })
    .catch(err => console.log(err.message));
}

function renderListMarkup(array) {
  //
  const countryMarkup = array
    .map(
      ({ flags, name }) =>
        `
    <li>
        <img src="${flags.svg}" alt="" style="width: 25px;">
        <p>${name.official}</p>
      </li>
    `,
    )
    .join('');
  return refs.list.insertAdjacentHTML('afterbegin', countryMarkup);
}
