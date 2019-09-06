const express = require('express')
const bodyParser = require('body-parser')
var cors = require("cors")
const app = express()
const port = 3000
const db = require('./queries')


app.use(cors())

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Hello boss, this is the recipe API. Enjoy the feast!' })
})

app.get('/recipes', db.getRecipes)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
