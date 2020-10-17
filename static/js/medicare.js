let url = "https://api.rootnet.in/covid19-in/hospitals/medical-colleges";

fetch(url)
.then((res)=>{
    return res.json();
})
.then(data=>{
    console.log(data.data.medicalColleges);
    add_data(data.data.medicalColleges);
    filter_data(data.data.medicalColleges);
})
 function filter_data(){

 }

function add_data(hospitals){
    var h = document.getElementById('hospital_section');
    hospitals.forEach(element => {
       h.innerHTML+= `
        <div class='hospital'>
            <h3 class='name'>${element.name}</h3>
            <h4 class='beds'>Beds:${element.hospitalBeds}</h4>
            <h4 class='beds'>City:${element.city}</h4>
            <h4 class='state'>${element.state}</h4>
        </div>
       `
    });

}
