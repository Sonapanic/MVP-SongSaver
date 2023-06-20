const addBtn = $('#addBtn')
const url = 'https://songsaver.onrender.com/song_info'
// const localUrl = 'http://postgres:a@HOST:5432/song_saver/song_info'


function start() {
    initialize()
}

start()

async function initialize() {
    const songs = await fetchSongs(url)
    $('<table class="table" id="songTable"> </table>').appendTo('#listContainer')
    $('<tbody id="tbody"></tbody>').appendTo('#songTable')
    for (let key in songs) {
        tableData()
    }
}

function tableData() {
    $(`<tr id="tr${songs[key].title}></tr>`).appendTo('#tbody')
        let title = songs[key].title
        $(`<td>Title: ${title}</td>`).appendTo(`#tr${title}`)
        let artist = songs[key].artist
        $(`<td>Title: ${artist}</td>`).appendTo(`#tr${title}`)
        let genre = songs[key].genre
        $(`<td>Title: ${genre}</td>`).appendTo(`#tr${title}`)
}


// RESTful route event listeners
function getAll(e) {
    e.preventDefault()
    fetchSongs(url)
}
function getOne(e) {
    e.preventDefault()
    fetchSongs(url`1`)
}
function post(e) {
    e.preventDefault()
    addSong(url)
}
function put(e) {
    e.preventDefault()
    editSong(url)
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

async function editSong(url) {
    const modifiedSong = {
        title: $('#titleInput').val(),
        artist: $('#artistInput').val(),
        genre: $('#genreInput').val()
    }
    try {
        const response = fetch(url`${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedSong)
        })
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const result = (await response).json()
        console.log(result)
    } catch (err) {
        console.error(err)
    }
}