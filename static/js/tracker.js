let country = document.querySelector(".country .name");
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

country_list.forEach((country) => {
  if (country.code == countryCode) {
    userCountry = country.name;
  }
});
async function fetchCountryData(userCountry) {
  let url = `https://covid19.mathdro.id/api/countries/${userCountry}`;
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    });
}
function fetchWorldData() {
  let url = `https://covid19.mathdro.id/api/`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      total_confirmed_world = parseInt(data["confirmed"]["value"]);
      total_recovered_world = parseInt(data["recovered"]["value"]);
      total_deaths_world = parseInt(data["deaths"]["value"]);
      appData.push(total_confirmed_world);
      appData.push(total_recovered_world);
      appData.push(total_deaths_world);
    });
}
fetchWorldData();
console.log(appData[0]);
//Adding Pie Chart
const ctx = document.getElementById("chart-container").getContext("2d");
let myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        label: "",
        data: appData,
        backgroundColor: ["#311cfd", "#31fb2a", "#fb0c2a"],
        borderWidth: 1,
      },
    ],
  },
});
function updateStats(){
    // console.log(total_confirmed_world)
    // country.innerHTML = userCountry;
    // totalcases.innerHTML = 235465768 || 0;

    

}
updateStats();