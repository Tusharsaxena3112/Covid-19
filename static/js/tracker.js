let appData = [],countryData=[];
function fetchWorldData() {
  appData=[];
  let url = `https://covid19.mathdro.id/api/`;
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      appData.push(data["confirmed"]["value"]);
      appData.push(data["recovered"]["value"]);
      appData.push(data["deaths"]["value"]);
      createPieChart();
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
function createPieChart(){
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
}


//   Getting Location of User
let countryCode = geoplugin_countryCode();
let userCountry;
country_list.forEach((country) => {
  if (country.code == countryCode) {
    userCountry = country.name;
  }
});

async function fetchCountryData(userCountry) {
  countryData = []
  let url = `https://covid19.mathdro.id/api/countries/${userCountry}`;
  await fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      countryData.push(data["confirmed"]["value"]);
      countryData.push(data["recovered"]["value"]);
      countryData.push(data["deaths"]["value"]);
      createCountryChart();
      appendCountryData(userCountry,data);
    });
}
fetchCountryData(userCountry);

function appendCountryData(userCountry,data) {
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

function createCountryChart(){
const line = document.getElementById("line-chart").getContext("2d");
let myCountrylineChart = new Chart(line, {
  type: 'line',
  data: {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {label:'Country Data',
        data: countryData,
        borderColor:'black',
        borderWidth:'0.5',
        backgroundColor:'rgb(246, 254, 0,0.5)'
      },
    ],
  },
});
const bar = document.getElementById("bar-chart").getContext("2d");
let myCountryBarChart = new Chart(bar, {
  type: 'bar',
  data: {
    labels: ["Confirmed", "Recovered", "Deaths"],
    datasets: [
      {label:'Country Data',
        data: countryData,
        borderWidth:'1',
        borderColor:'black',
        backgroundColor:['rgb(14, 94, 253,0.4)','rgb(3, 249, 104,0.4)','rgb(252, 94, 104,0.4)']
      },
    ],
  },
});
}



