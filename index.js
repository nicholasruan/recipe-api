const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const db = require('./queries');
const aws = require('aws-sdk');
const fs = require('fs');

app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

// render display page
app.get('/imguploadtest', (req, res) => res.render('imgupload.html'));

// render homepage
app.get('/', (req, res) => res.render('index.html'));

// API Endpoints
app.get('/api', (request, response) => {
  response.json({ info: 'Hello boss, this is the recipe API. Enjoy the feast!' })
});

const profile = require( './imageupload' );
app.use('/api', profile );
app.get('/api/recipes', db.getRecipes);
app.post('/api/create', db.createRecipe);
app.delete('/api/delete', db.deleteRecipe);
app.get('/api/searchName', db.searchName);
app.get('/api/searchCategory', db.searchCategory);

// TODO UPDATE RECIPE

app.listen(process.env.PORT || 3002, () => {
	if (process.env.PORT) {
		console.log(`Server listening ${process.env.PORT}`);
	} else {
		console.log(`Server listening 3002`)
	}
});

app.post('/api/imageUpload', (request, response) => {
	console.log(request.body);
	 response.send(request.body);
});
