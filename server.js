import express from 'express'
import pg from 'pg'
import postgres from 'postgres'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT
const { Pool } = pg
const sql = postgres(process.env.DATABASE_URL)

const pool = new Pool ({
    connectionString: process.env.DATABASE_URL
    // user: 'postgres', 
    // password: 'a', 
    // database: 'song_saver',
    // host: 'localhost',
    // port: 5432
})

const app = express()
app.use(express.json())
app.use(express.static('Public'))


app.get('/song_info/', async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM song_info ORDER BY id ASC')
        res.status(200).json(response.rows)
    } catch (err) {
        console.error(err) 
        res.status(500).json('Internal Server Error')
    }
})


app.get('/song_info/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await sql`SELECT title, artist, genre FROM song_info WHERE id = ${id}`.then((data) => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.error(err) 
        res.status(500).json('Internal Server Error')
    }
})


app.post('/song_info', async (req, res) => {
    const { title, artist, genre } = req.body
    if (title && artist && genre) {
        try {
            const result = await sql`INSERT INTO song_info (title, artist, genre) VALUES (${title}, ${artist}, ${genre}) RETURNING *`.then((data) => {
                res.status(201).json(data)
            })
        } catch (err) {
            console.error(err) 
            res.status(500).json('Internal Server Error')
        }
    }
})


app.put('/song_info/:id', async (req, res) => {
    const { id } = req.params
    const { title, artist, genre } = req.body
    try {
        const result = await sql`UPDATE song_info SET title = ${title}, artist = ${artist}, genre = ${genre} WHERE id = ${id} RETURNING *`.then((data) => {
            res.status(200).json(data)
        })
    } catch (err) {
        console.error(err) 
        res.status(500).json('Internal Server Error')
    }
})


app.delete('/song_info/:id', async (req, res) => {
    const { id } = req.params
    try {
        const result = await pool.query(`DELETE FROM song_info WHERE id = ${id} RETURNING *`)
        res.status(201).json(result.rows)
    } catch (err) {
        console.error(err) 
        res.status(500).json('Internal Server Error')
    }
})


app.listen(port, () => {
    console.log('SongSaver is up on', port)
})