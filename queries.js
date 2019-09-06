
const { pool } = require('./config')

const API_KEY = 'miloislife';

const getRecipes = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : 'MATE! Key value is incorrect...'})
	} else {
		pool.query('SELECT * FROM recipes ORDER BY id ASC', (error, results) => {
			if (error) {
				throw error
			}
			response.status(200).json(results.rows)
		})
	}
}

const createRecipe = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : 'MATE! Key value is incorrect...'})
	} else {
		const { name, category, ingredients } = request.body;
		pool.query('INSERT INTO recipes (name, category, ingredients) VALUES ($1, $2, $3)', [name, category, ingredients], (error, results) => {
    if (error) {
			console.log(error);
      throw error;
    }
		console.log(results);
    response.status(201).json({ 'Recipie' : request.body});
  })
	}
}

const deleteRecipe = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : 'MATE! Key value is incorrect...'})
	} else {
		const { name } = request.body;
		pool.query('DELETE FROM recipes WHERE name = "$1"', [name], (error, results) => {
    if (error) {
			console.log(error);
      throw error;
    }
    response.status(201).send('Recipe Deleted');
  })
	}
}



// delete Recipe
// alter Recipes
// specified get Recipes


module.exports = {
	getRecipes,
	createRecipe
}
