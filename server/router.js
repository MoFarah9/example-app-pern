const express = require('express')
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
    res.json(result.rows[0])
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})
