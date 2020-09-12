let country = document.querySelector(".country .name");


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
      console.log(data);
      appData.push(data['confirmed']['value']);
      appData.push(data['recovered']['value']);
      appData.push(data['deaths']['value']);
      appendData(data);
    });
}

function appendData(data){
  var totalcases = document.querySelector(".overall-confirmed .value");
  var recoveredCases = document.querySelector(".overall-recovered .value");
  let totaldeaths = document.querySelector(".overall-deaths .value");
  totalcases.innerHTML = data['confirmed']['value']; 
  recoveredCases.innerHTML = data['recovered']['value'];
  totaldeaths.innerHTML  = data['deaths']['value'];
  
}
fetchWorldData();

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
        borderWidth: 3,
      },
    ],
  },
});
