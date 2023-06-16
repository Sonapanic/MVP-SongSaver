const addBtn = $('#addBtn')
const url = 'https://songsaver.onrender.com'

// const localUrl = 'localhost:10000/song_info/'

// $(addBtn).click(post())

// async function post() {
//     const newSong = 
//     fetch
// }

$(addBtn).on('click', getAll)

function getAll(e) {
    e.preventDefault()
    fetchSongs(url)
}

async function fetchSongs(url) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Response not ok')
        }
        const songs = await response.json()
        console.log(songs.rows)
    } catch (err) {
        console.error(err)
    }
}