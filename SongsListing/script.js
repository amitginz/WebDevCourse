
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
    saveAndRender();
    //TO DO SAVE  AND RERENDER 

    form.reset();
});
//Save to Local storage and render UI table
function saveAndRender() {

    localStorage.setItem('playlist', JSON.stringify(songs));

    //TODO RELOAD UI    
    renderSongs();

}


//show the songs list in the website
function renderSongs() {
    list.innerHTML = ''; // Clear current list

    songs.forEach(song => {
        // Create table row
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${song.title}</td>
            <td><a href="${song.url}" target="_blank" class="text-info">Watch</a></td>
            <td class="text-end">
                <button class="btn btn-sm btn-warning me-2" onclick="editSong(${song.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteSong(${song.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        list.appendChild(row);
    });
}


//delete song from the list of song in the page
function deleteSong(id) {
    if (confirm('Are you sure?')) {
        // Filter out the song with the matching ID
        songs = songs.filter(song => song.id !== id);
        saveAndRender();
    }
}


function editSong(id) {

    const songToEdit = songs.find(song => song.id === id);


    document.getElementById('title').value = songToEdit.title;
    document.getElementById('url').value = songToEdit.url;
    document.getElementById('songId').value = songToEdit.id; // Set Hidden ID

    submitBtn.innerHTML = '<i class="fas fa-save"></i> Update';
    submitBtn.classList.replace('btn-success', 'btn-warning');
}

