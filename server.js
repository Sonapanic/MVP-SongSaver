import express from 'express'
import pg from 'pg'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT
const { Pool } = pg

new Pool ({
    connectionString: process.env.DATABASE_URL
})

const app = express()
app.use(express.json())
app.use(express.static('Public'))















app.listen(port, () => {
    console.log('SongSaver is up on', port)
})