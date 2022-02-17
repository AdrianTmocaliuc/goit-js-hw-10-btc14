import { refs } from './refs';
export { renderCountryMarkup, renderListMarkup };

function renderListMarkup(array) {
  const countriesMarkup = array
    .map(
      ({ flags, name }) => `
    <li class="list__item">
        <img src="${flags.svg}" alt="" style="width: 25px;">
        <p>${name.official}</p>
      </li>
    `,
    )
    .join('');
  return refs.list.insertAdjacentHTML('afterbegin', countriesMarkup);
}

function renderCountryMarkup(obj) {
  const countryMarkup = obj.map(
    ({ flags, capital, name, population, languages }) => `
      <div class='country-info__head'>
      <img src="${flags.svg}" alt="${name.common}"> 
      <h2>${name.common}</h2>
      </div>
    <p><span class='country-info__key'>Capital:</span> ${capital}</p>
    <p><span class='country-info__key'>Population:</span> ${population}</p>
    <p><span class='country-info__key'>Languages:</span> ${Object.values(languages).join(
      ', ',
    )}</p>`,
  );
  refs.info.innerHTML = countryMarkup;
}
