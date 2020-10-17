let url = "https://api.rootnet.in/covid19-in/hospitals/medical-colleges";
var d = [];
fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.data.medicalColleges.forEach(el=>{
        d.push(el);
    })
    add_data(data.data.medicalColleges);
  });

function filter_add() {
  var h = document.getElementById("hospital_section");
  var search_box = document.getElementById("hospital_id");
  var value = search_box.value;
  if (value!=' ') {
    h.innerHTML = '';
    d.forEach((element) => {
      if (value.toLowerCase() === element.city.toLowerCase()) {
        h.innerHTML += `
        <div class='hospital'>
            <h3 class='name'>${element.name}</h3>
            <h4 class='beds'>Beds:${element.hospitalBeds}</h4>
            <h4 class='beds'>City:${element.city}</h4>
            <h4 class='state'>${element.state}</h4>
        </div>
       `;
      }
    });
  }
}

function add_data() {
  var h = document.getElementById("hospital_section");
  d.forEach((element) => {
    h.innerHTML += `
        <div class='hospital'>
            <h3 class='name'>${element.name}</h3>
            <h4 class='beds'>Beds:${element.hospitalBeds}</h4>
            <h4 class='beds'>City:${element.city}</h4>
            <h4 class='state'>${element.state}</h4>
        </div>
       `;
  });
}
