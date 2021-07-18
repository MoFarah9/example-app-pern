require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./router')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', router)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})
