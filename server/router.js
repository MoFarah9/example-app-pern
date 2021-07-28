const express = require('express')
const { upload } = require('./multerSetup')
const db = require('./db')

const router = express.Router()

module.exports = router

router.get('/articles', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM articles')
    res.json(result.rows)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/articles/:id', async (req, res) => {
  const { id } = req.params
  try {
    const result = await db.query('SELECT * FROM articles WHERE id = $1', [id])
    if (result.rowCount === 0) return res.sendStatus(404)
    res.json(result.rows[0])
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/articles', async (req, res) => {
  const { title, body } = req.body
  try {
    const query = 'INSERT INTO articles(title, body) VALUES($1, $2) RETURNING *'
    const values = [title, body]
    const result = await db.query(query, values)
    res.json(result.rows[0])
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.status(400).send({ message: req.fileValidationError })
    } else if (!req.files?.length) {
      console.log(err)
      return res.status(400).json({ message: 'Please select files to upload' })
    } else if (err) {
      console.log(err)
      return res.sendStatus(500)
    }

    const files = req.files.map(({ location, originalname }) => ({
      location,
      originalname,
    }))
    res.json({ files })
  })
})
