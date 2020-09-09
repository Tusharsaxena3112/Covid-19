const api_url = "https://cryptic-ravine-96718.herokuapp.com/";

let app_data =[]

async function getapi(url){
    const response = await fetch(url);

    var data = await response.json();
    console.log(data);
}

// console.log(app_data);
// function show(data){
//     let tab =
//         <tr>
//             <th>img</th>
//             <th>link</th>
//             <th>title</th>
//         </tr>;
//
//     for (let r of data.list){
//         tab += `<tr>
//         <td>${r.img}</td>
//         <td>${r.link}</td>
//         <td>${r.title}</td>
//         </tr>`
//     }
//     document.getElementById("news").innerHTML = tab;
// }