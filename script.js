const countriesContainer = document.getElementById("countries-container");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");

let countries = [];

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries = await response.json();
        displayCountries(countries); 
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

function displayCountries(countries) {
    countriesContainer.innerHTML = ""; 
    countries.forEach(country => {
        const card = document.createElement("div");
        card.classList.add("country-card");
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        card.addEventListener("click", () => {
            window.location.href = `country.html?name=${country.name.common}`;
        });
        countriesContainer.appendChild(card);
    });
}

function search() {
    const searchValue = searchInput.value.toLowerCase().trim();
    const filteredCountries = countries.filter(country => {
        return country.name.common.toLowerCase().includes(searchValue); 
    });
    displayCountries(filteredCountries); 
}

function filterCountries() {
    const filterValue = filterSelect.value;
    if (filterValue === "") {
        displayCountries(countries); 
    } else {
        const filteredCountries = countries.filter(country => country.region === filterValue);
        displayCountries(filteredCountries); 
    }
}

searchInput.addEventListener("input", search); 
filterSelect.addEventListener("change", filterCountries); 

fetchCountries();
