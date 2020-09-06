let country = document.querySelector(".country name");
let totalcases = document.querySelector(".total-cases .value");
let newCases = document.querySelector(".total-cases .new-value");
let recoveredCases = document.querySelector(".recovered-cases value");
let newRecovered = document.querySelector(".recovered-cases .new-value");
let totaldeaths = document.querySelector(".total-deaths .value");
let newDeaths = document.querySelector(".total-deaths .new-value");

// App variables

let appData = [],
    cases = [],
    recovered = [],
    deaths = [],
    dates = [];

//   Getting Location of User

let countryCode = geoplugin_countryCode();
let userCountry;

country_list.forEach(country => {
    if (country.code == countryCode) {
        userCountry = country.name;
    }
    console.log(userCountry)
});