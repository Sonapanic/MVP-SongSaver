const addBtn = $('#addBtn')
const url = 'https://songsaver.onrender.com/song_info'

$(addBtn).on('click', post)

function getAll(e) {
    e.preventDefault()
    fetchSongs(url)
}
function post(e) {
    e.preventDefault()
    addSong(url)
}


async function fetchSongs(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const songs = await response.json()
        console.log(songs)
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
        const song = await response.json()
        console.log(song)
    } catch (err) {
        console.error(err)
    }
}