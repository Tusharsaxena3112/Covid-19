let appData = [],countryData=[];
function fetchWorldData() {
  let url = `https://covid19.mathdro.id/api/`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      appData.push(data["confirmed"]["value"]);
      appData.push(data["recovered"]["value"]);
      appData.push(data["deaths"]["value"]);
      appendData(data);
    });
}

function appendData(data) {
  var totalcases = document.querySelector(".overall-confirmed .value");
  var recoveredCases = document.querySelector(".overall-recovered .value");
  let totaldeaths = document.querySelector(".overall-deaths .value");
  totalcases.innerHTML = data["confirmed"]["value"];
  recoveredCases.innerHTML = data["recovered"]["value"];
  totaldeaths.innerHTML = data["deaths"]["value"];
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
      countryData.push(data["confirmed"]["value"]);
      countryData.push(data["recovered"]["value"]);
      countryData.push(data["deaths"]["value"]);
      appendCountryData(data);
    });
}
fetchCountryData(userCountry);

function appendCountryData(data) {
  var country_total_cases = document.querySelector(".total-cases .value");
  var country_recovered_cases = document.querySelector(
    ".recovered-cases .value"
  );
  var country_deaths = document.querySelector(".total-deaths .value");
  var countryElement = document.querySelector(".country .name");
  countryElement.innerHTML = userCountry;
  country_total_cases.innerHTML = data["confirmed"]["value"];
  country_recovered_cases.innerHTML = data["recovered"]["value"];
  country_deaths.innerHTML = data["deaths"]["value"];
}

// const bar = document.getElementById("axes-line-chart").getContext("2d");
//   let bar_chart = new Chart(bar, {
//     type: 'bar',
//     data: {
//       labels:['Confirmed','Recovered','Deaths'],
//       datasets: [
//         {
//           data: countryData,
//         },
//       ],
//     },
//     options = {
//       scales: {
//           xAxes: [{
//               gridLines: {
//                   offsetGridLines: true
//               }
//           }]
//       }
//   }
// });

const bar = document.getElementById("axes-line-chart").getContext("2d");
let myCountryChart = new Chart(bar, {
  type: "pie",
  data: {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {
        label: "",
        data: countryData,
        backgroundColor: ["#311cfd", "#31fb2a", "#fb0c2a"],
        borderWidth: 3,
      },
    ],
  },
});



