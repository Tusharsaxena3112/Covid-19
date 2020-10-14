let url = "https://api.rootnet.in/covid19-in/hospitals/medical-colleges"
fetch(url)
.then((res)=>{
    return res.json();
})
.then(data=>{
    console.log(data)
})
