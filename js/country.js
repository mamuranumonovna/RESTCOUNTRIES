const modeSwitch = document.getElementById('modeSwitch');
const body = document.body
const store = localStorage.getItem('mode');
const loader = document.querySelector('.loader');
const darktext = document.querySelector('.nav_dark')
if (store === 'dark') {
  body.classList.add('change_color');
  modeSwitch.checked = true;
  darktext.textContent = 'light Mode'
}
else{
  body.classList.remove('change_color');
  modeSwitch.checked = false;
  darktext.textContent = 'dark Mode'
}
function formatPopulation(population) { if (population >= 1000000000) { return (population / 1000000000).toFixed(1) + 'B'; } else if (population >= 1000000) { return (population / 1000000).toFixed(1) + 'M'; } else if (population >= 1000) { return (population / 1000).toFixed(1) + 'K'; } else { return population; } }
 
modeSwitch.addEventListener('change', () => {
  if(modeSwitch.checked){
    body.classList.add('change_color');
    localStorage.setItem('mode','dark')
    modeSwitch.checked = true;
    darktext.textContent = 'light Mode'

  }
  else{
    body.classList.remove('change_color');
    modeSwitch.checked = false;
    localStorage.setItem('mode','light')
    darktext.textContent = 'dark Mode'
  }
});
 
 function goBack() {
    window.location.href = 'index.html';
  }

  function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  }

  

  async function fetchCountryData(countryName) {
    try {
      const response = await fetch('https://restcountries.com/v3.1/name/' + countryName);
      const data = await response.json();
      loader.classList.add('none')
      const country = data[0];
      const flag = country.flags.svg;
      const nativeName=country.altSpellings&&country.altSpellings[1];
      const name = country.name.common;
      const population = country.population;
      const region=country.region;
      const subregion=country.subregion;
      const capital = country.capital && country.capital[0];
      const domain=country.tld&&country.tld[0];
      const currency = country.currencies && country.currencies[Object.keys(country.currencies)[0]].name;
      const borders=country?.borders;


      document.getElementById('flag').innerHTML = `<img src="${flag}" alt="Flag">`;
      document.getElementById('countryName').textContent = name;
      document.getElementById('nativeName').textContent ='Native Name: '+ nativeName;
      document.getElementById('population').textContent = 'Population: ' + formatPopulation(population);
      document.getElementById('region').textContent='Region: '+region;
      document.getElementById('subregion').textContent='Sub Region: '+subregion;
      document.getElementById('capital').textContent = "Capital: " + capital;
      document.getElementById('domain').textContent = "Top Level Domain: " + domain;
      document.getElementById('currency').textContent = "Currency: " + currency;
      document.querySelector('.text').textContent = 'Border Countries:'
      const borConatiner = document.getElementById('border');
      borConatiner.textContent = ''
      if(borders && borders.length > 0){
        borders.forEach((border) => {
          const borderButton = document.createElement('button');
          borderButton.textContent = border;
          borderButton.addEventListener('click', async()=> {
            const borderResponse = await fetch('https://restcountries.com/v3.1/alpha/' + border)
            const borderData = await borderResponse.json()
            const borderCountry = borderData[0];
            fetchCountryData(borderCountry.name.common);
            
          })
          borConatiner.appendChild(borderButton)
        })
      }else{
        const borderText = document.createElement('span')
        borderText.classList.add('err')
        borderText.textContent = 'N/A'
        borConatiner.appendChild(borderText)
      }



    } catch (error) {
      console.log(error);
    }
  }

  const countryName = getQueryParam('country');
  if (countryName) {
    fetchCountryData(countryName);
  }