// @desc        Entire DOM Element query
const submit = document.querySelector('button');
const pic_name = document.querySelector('input[type=text]');
const getFileInput = document.querySelector('input[type=file]');

const readerData = {};

// @desc        Input[Type=file]
// @event       change
getFileInput.onchange = function(ev){
    const reader = new FileReader(),
        file = getFileInput.files[0];
    console.log(file);
    
    // Read the raw data using FilerReader API
    reader.readAsDataURL(file);

    // @desc        reader
    // @event       load
    reader.onload = function(ev){
        if(ev.target.readyState === 2){
            readerData.picture_name = pic_name.value.trim();
            readerData.readyState = this.readyState;
            readerData.rawData =  this.result;
            readerData.size = file.size;
            readerData.type = file.type;
        }
    }
}

// @desc        Button
// @event       click
submit.onclick = async function(ev){
    ev.preventDefault();
    const { readyState } = readerData;
    const mimeType = ['image/jpeg', 'image/jpg', 'image/png'];

    if(pic_name.value !== '' && readyState === 2){
        if(mimeType.some(mime => mime === getFileInput.files[0].type)){
            // FETCH API Post to '/api/gallery'
            const response = await fetch('http://localhost:5000/api/gallery', 
            {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json',
                },
                referrer: 'http://localhost:3000',
                referrerPolicy: 'origin-when-cross-origin',
                body: JSON.stringify(readerData)
            }),
                message = await response.json();
                alert(message.status);
                console.log(message)
        }else{
            console.error('The image type provided is incorrect.');
        }
    }else{
        console.error('Invalid: Please fill in the blank space correctly.')
    }
}