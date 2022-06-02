(async function(){
    const response = await fetch('http://localhost:5000/api/gallery');
    const res = await response.json();
    console.log(res)
})();