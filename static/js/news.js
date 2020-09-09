const api_url = "https://cryptic-ravine-96718.herokuapp.com/";

async function getapi(url){
    const response = await fetch(url);

    var data = await response.json();
    console.log(data['news'][0]['title']);
     if(response){
         hideloader();
     }
     show(data);
}

getapi(api_url);

function hideloader(){
    document.getElementById('news').style.display = 'none';
}

function show(data){
    let tab =
        <tr>
            <th>img</th>
            <th>link</th>
            <th>title</th>
        </tr>;

    for (let r of data.list){
        tab += `<tr>
        <td>${r.img}</td>
        <td>${r.link}</td>
        <td>${r.title}</td>
        </tr>`
    }
    document.getElementById("news").innerHTML = tab;
}