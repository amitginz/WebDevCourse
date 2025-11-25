
//Get HTML DOM Element Reference
const form = document.getElementById('songForm');
const list = document.getElementById('songList');
const submitBtn = document.getElementById('submitBtn');

//if not exsist in localStorage get empty array else 
//get json text and convert it to object json
let songs = JSON.parse(localStorage.getItem('playlist')) || [];

//User click the add Button
form.addEventListener('submit', (e) => {
    //Don't submit the for to the server yet let me handle it here
    e.preventDefault();

    //read Forms Data
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;

    //TODO VALIDATE FIELDS
    //create JSON OBJ Based on URL title
    const song = {
        id: Date.now(),  // Unique ID
        title: title,
        url: url,
        dateAdded: Date.now()
    };


    songs.push(song);

    //TO DO SAVE  AND RERENDER 

    form.reset();
});





