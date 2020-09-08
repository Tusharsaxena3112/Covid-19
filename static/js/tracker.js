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
    total_confirmed_world=0;
    total_recovered_world=0;
    total_deaths_world=0;
    data_world={};

//   Getting Location of User

let countryCode = geoplugin_countryCode();
let userCountry;

country_list.forEach(country => {
    if (country.code == countryCode) {
        userCountry = country.name;
    }
});
async function fetchCountryData(userCountry) {
    let url = `https://covid19.mathdro.id/api/countries/${userCountry}`;
    await fetch(url)
    .then(res=>{
        return res.json();
    })
    .then(data=>{
        console.log(data);
    })
}

// fetchCountryData(userCountry);

function fetchWorldData() {
    let url = `https://covid19.mathdro.id/api/`;
     fetch(url)
    .then(res=>{
        return res.json();
    }).then(data=>{
        total_confirmed_world = data['confirmed']['value'];
        total_recovered_world=data['recovered']['value'];
        total_deaths_world=data['deaths']['value'];
        appData.push(total_confirmed_world);
        appData.push(total_recovered_world);
        appData.push(total_deaths_world);
    })
}
fetchWorldData(setTimeout=3000);
console.log(appData)
const ctx = document.getElementById('chart-container').getContext('2d')
let myChart = new Chart(ctx,{
    type:'pie',
    data:{
        labels:['Confirmed','Recovered','Deaths'],
        datasets:[
            {
             label:'',
             data:appData,
             backgroundColor:['blue','green','red'],
             borderWidth:1   
            }
        ]
    }
})