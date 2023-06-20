const url = 'https://songsaver.onrender.com/song_info/'
start()

// kicks off page loading
function start() {
    initialize('Edit')
}

// Populates the list container div with a table, and dynamically generates content based on the database
async function initialize(btn) {
    const songs = await fetchSongs(url)
    $('<table class="table" id="songTable"> </table>').appendTo('#listContainer')
    $('<tbody id="tbody"></tbody>').appendTo('#songTable')
    tableData(songs, btn)
    
}

// Creates table data and appends it 
function tableData(obj, btn) {
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
    }
}

function makeBtns(btn1) {
    const buttonTd = $('<td class="btnTd"></td>')
    
    if (btn1 === 'Edit') {
         $(`<button class="editBtn btn">Edit</button>`).appendTo(buttonTd)
         $('<button class="btn">Delete</button>').appendTo(buttonTd)
    } else {
        $('<button class="saveBtn btn">Save</button>').appendTo(buttonTd)
    }
    return buttonTd
}

// RESTful route event listeners
$('#addBtn').on('click', post)


async function post(e) {
    e.preventDefault()
    $('#listContainer').empty()
    await addSong(url)
    initialize('Edit')
}

async function fetchSongs(url) {
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

async function addSong(url) {
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

async function singleSong(url, id) {
    try {
        const response = await fetch(url + id)
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const song = await response.json()
        console.log(song)
        prepareEdit(song)
    } catch (err) {
        console.error(err)
    }
}


async function prepareEdit(song) {
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
  }
  