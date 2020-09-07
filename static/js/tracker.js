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
});

// function fetchData(userCountry)
// {
//     // fetch('https://covid19.mathdro.id/api/', {
// 	// 	"method": "GET",
// 	// 	// "headers": {
// 	// 	// 	"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
// 	// 	// 	"x-rapidapi-key": "7e269ec140msh8a5df9cfc21b4b4p1c1e3ejsn9aba26afc6e0"
// 	// 	// }
// 	// }).then(
//     //     response=>{
//     //         console.log(response.json())}
//     // ).then(data=>{
//     //     console.log(data);
//     // })
   
// }
async function fetchData(userCountry) {
    let url = `https://covid19.mathdro.id/api/countries/${userCountry}`;
    await fetch(url)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data);
    })
}

fetchData(userCountry);

