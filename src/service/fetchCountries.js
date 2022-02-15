const SEARCH_URL = 'https://restcountries.com/v3.1/name/';
const FIELDS_NEED = 'fields=name,capital,population,flags,languages';

function fetchCountries(name) {
  return fetch(`${SEARCH_URL}${name}?${FIELDS_NEED}`).then(response => {
    if (response.status === 404) {
      throw new Error('Oops, there is no country with that name');
    }
    return response.json();
  });
}

export { fetchCountries };
