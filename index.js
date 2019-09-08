const express = require('express');
const bodyParser = require('body-parser');
var cors = require("cors");
const app = express();
const db = require('./queries');
const aws = require('aws-sdk');

app.use(cors());
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// API Endpoints
app.get('/api', (request, response) => {
  response.json({ info: 'Hello boss, this is the recipe API. Enjoy the feast!' })
});

app.get('/api/recipes', db.getRecipes);
app.post('/api/create', db.createRecipe);
app.delete('/api/delete', db.deleteRecipe);
app.get('/api/searchName', db.searchName);
app.get('/api/searchCategory', db.searchCategory);

app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening ${process.env.PORT}`)
});

aws.config.region = 'us-east-1';

const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME;
