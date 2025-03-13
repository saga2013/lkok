function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

async function fetchCountryDetails() {
    const countryName = getQueryParam("name");
    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const country = await response.json();
        displayCountryDetails(country[0]); 
    } catch (error) {
        console.error("Error", error);
    }
}

function displayCountryDetails(country) {
    const countryDetailsContainer = document.getElementById("country-details");
    countryDetailsContainer.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common}">
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>Region: ${country.region}</p>
        <p>Languages: ${Object.values(country.languages || {}).join(", ")}</p>

`;
}

fetchCountryDetails();
