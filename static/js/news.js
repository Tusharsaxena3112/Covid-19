const api_url = "https://cryptic-ravine-96718.herokuapp.com/";

async function getapi(url){
    const response = await fetch(url);

    var data = await response.json();
    console.log(data);
    if(response){
        hideloader();
    }
    show(data);
}

getapi(api_url);