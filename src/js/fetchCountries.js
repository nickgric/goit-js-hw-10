import { Notify } from 'notiflix';

Notify.init({
  fontSize: '16px',
  useIcon: false,
  position: 'center-bottom',
  width: '400px',
  clickToClose: true,
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
  return fetch(`https://restcountries.com/v3.1/name/${countryName.trim()}?fields=name,capital,population,flags,languages
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
      return data;
    })
    .catch(error => {
      Notify.failure('😫 No countries found...');
      console.log(error);
    });
}
