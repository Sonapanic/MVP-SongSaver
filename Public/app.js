const url = 'https://songsaver.onrender.com/song_info'
start()

// Get all route and initial page population
function start() { // Kicks off page loading
    initialize('Edit')
}
async function initialize() { // Populates the list container div with a table, and dynamically generates content based on the database
    const songs = await fetchSongs(url)
    $('.input').val('')
    $('<table class="table" id="songTable"> </table>').appendTo('#listContainer')
    $('<tbody id="tbody"></tbody>').appendTo('#songTable')
    tableData(songs, 'Edit')
    
}
async function tableData(obj, btn) { // Creates table data and appends it 
    for (let key in obj) {
        const songId = obj[key].id
        const title = obj[key].title
        const artist = obj[key].artist
        const genre = obj[key].genre
      
        const trId = `tr${title}`
        const $tr = $(`<tr id="${trId}"></tr>`)
        const buttonTd = $(`<td class="btnTd"></td>`)
        $tr.appendTo('#tbody')
       
        $(`<td>Title: ${title}</td>`).appendTo($tr)
        $(`<td>Artist: ${artist}</td>`).appendTo($tr)
        $(`<td>Genre: ${genre}</td>`).appendTo($tr)
        const buttons = makeBtns(btn)
        buttons.appendTo($tr)

        const editBtn = buttons.find('.editBtn');
        editBtn.on('click', async () => {
            $('#listContainer').empty()
            await singleSong(url, songId)
        })
        const deleteBtn = buttons.find('.deleteBtn')
        deleteBtn.on('click', async () => {
            await removeSong(url, songId)
            $('#listContainer').empty()
            initialize()
        })
    }
}
function makeBtns(btn1) { // Makes the buttons 
    const buttonTd = $('<td class="btnTd"></td>')
    
    if (btn1 === 'Edit') {
         $(`<button class="editBtn btn">Edit</button>`).appendTo(buttonTd)
         $('<button class="deleteBtn btn">Delete</button>').appendTo(buttonTd)
    } else {
        $('<button class="saveBtn btn">Save</button>').appendTo(buttonTd)
    }
    return buttonTd
}
async function fetchSongs(url) { // Handles the GET all request to the database
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const songs = await response.json()
        return(songs)
    } catch (err) {
        console.error(err)
    }
}




// Functions for adding new songs
$('#addBtn').on('click', post) // Event handler for making new songs
async function post(e) { // Adds a song to the list and repopulates it
    e.preventDefault()
    $('#listContainer').empty()
    await addSong(url)
    initialize('Edit')
}
async function addSong(url) { // Handles the actual POST request to the database
    const addition = {
        title: $('#titleInput').val(),
        artist: $('#artistInput').val(),
        genre: $('#genreInput').val()
    }
    try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addition)
            })
            if (!response.ok) {
                throw new Error('Response not ok')
            }
            const result = await response.json()
            console.log(result)
    } catch (err) {
        console.error(err)
    }
}




// Functions for modifying existing songs
async function modifySong(url, id) { // Handles the PUT request to the database
    const modification = {
        title: $('#editTitle').val(),
        artist: $('#editArtist').val(),
        genre: $('#editGenre').val()
    }
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modification)
        })
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const result = await response.json()
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}
async function singleSong(url, id) { // Isolates the selected song for editing
    try {
        const response = await fetch(`${url}/${id}`)
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const song = await response.json()
        prepareEdit(song, id)
    } catch (err) {
        console.error(err)
    }
}
async function prepareEdit(song, id) { // Sets up the listContainer with a form and a submit button for editing
    const { title, artist, genre } = song[0];
    const newForm = $('<form class="form" id="editForm"></form>');
    const formFields = `
      <input class="editInput input" type="text" id="editTitle" name="titleEdit" placeholder="${title}">
      <input class="editInput input" type="text" id="editArtist" name="artistEdit" placeholder="${artist}">
      <input class="editInput input" type="text" id="editGenre" name="genreEdit" placeholder="${genre}">
      <button type="submit" value="Save" id="saveBtn">Save</button>
    `;
    newForm.appendTo($('#listContainer'));
    newForm.append(formFields);
    $('#saveBtn').on('click', async (e) => {
        e.preventDefault()
        await modifySong(url, id) 
        $('#listContainer').empty()
        initialize()
    })
  }



  
// Function for deleting songs from the list
async function removeSong(url, id) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const result = await response.json()
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}