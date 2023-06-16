const addBtn = $('#addBtn')

// $(addBtn).click(post())

// async function post() {
//     const newSong = 
//     fetch
// }

$(addBtn).on('click', getAll)

async function getAll(e) {
    e.preventDefault()
    fetch("song_info")
    .then((res) => res.json())
    .then((data) => {
      console.log('Song Info:', data);
    });
  }