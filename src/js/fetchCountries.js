import { Notify } from 'notiflix';

Notify.init({
  fontSize: '16px',
  useIcon: false,
  success: {
    background: '#419527',
    notiflixIconColor: 'white',
  },
  failure: {
    background: '#c03e41',
    notiflixIconColor: 'white',
  },
  warning: {
    background: '#a95ba4',
    notiflixIconColor: 'white',
  },
  info: {
    background: '#3f167d',
    notiflixIconColor: 'white',
  },
});

export function fetchCountries(countryName) {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fields=name.official,capital,population,flags.svg,languages
  `)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.length > 10) {
        Notify.warning('🤓 To many countries found...');
        return;
      }
      if (data.length > 1) {
        Notify.info(`🤨 ${data.length} countries found!`);
      }
      if (data.length === 1) {
        Notify.success(`😎 Only one countrie found!!!`);
      }
      let name;
      let capital;
      let population;
      let flag;
      let languages;
    })
    .catch(error => {
      Notify.failure('😫 No countries found...');
    });
}
