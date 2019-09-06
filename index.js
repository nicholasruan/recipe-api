const express = require('express')
const bodyParser = require('body-parser')
var cors = require("cors")
const app = express()
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

app.get('/recipes', db.getRecipes);
app.post('/create', db.createRecipe);
app.delete('/delete', db.deleteRecipe);

app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening ${process.env.PORT}`)
})
