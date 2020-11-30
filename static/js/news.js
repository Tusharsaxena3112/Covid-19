
 async function getapi(){
    
    url = "https://cryptic-ravine-96718.herokuapp.com/";
    await fetch(url)
    .then(res=>{
        // console.log(res.json());
        return res.json();
    })
    .then(data=>{
        console.log(data['news']);
        appendData(data['news']);
        
    })
}
getapi();






function appendData(data){
    var newsElement = document.getElementById('news');
    var loading = document.getElementById('gif');
    loading.classList.add('hidden');
    
    data.forEach(
        element => {
        newsElement.innerHTML += `
        <div class='news-item'>
        <div class='news-img'><img src='${element.img}' width="500px"/></div>
        <div class='news-title'>${element.title}....                                              </div>
        <div class='news-link'><a href="${element.link}" target="_blank" rel="noopener noreferrer">Read More</a></div>
        </div>`
    });
}