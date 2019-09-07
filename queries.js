const { pool } = require('./config')

const API_KEY = 'miloislife';
const API_ERROR = 'API key is incorrect...';

const getRecipes = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : API_ERROR})
	} else {
		pool.query('SELECT * FROM recipes ORDER BY id ASC', (error, results) => {
			if (error) {
				throw error
			}
			response.status(200).json(results.rows)
		})
	}
}

// include error checking to see that the name is not null
const createRecipe = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : API_ERROR})
	} else {
		const { name, category, ingredients } = request.body;
		if (!name) {
			response.status(500).json({ 'error' : 'Name cannot be null'})
		} else {
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
}

// delete recipe
const deleteRecipe = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : API_ERROR})
	} else {
		const { name } = request.body;
		if (!name) {
			response.status(500).json({ 'error' : 'Name cannot be null'})
		} else {
			pool.query('DELETE FROM recipes WHERE name = $1', [name], (error, results) => {
		    if (error) {
					console.log(error);
		      throw error;
		    }
				if (results.rowCount === 0) {
					response.status(500).json({ 'error' : 'Unable to find recipe'})
				} else {
					response.status(201).json({ 'deletedItems' : results.rowCount});
				}
	  	})
		}
	}
}

// specified get Recipes
const searchRecipe = (request, response) => {
	if (request.headers.key !== API_KEY) {
		response.status(500).json({ 'error' : API_ERROR})
	} else {
		const { field, item } = request.body;
		if (!field || !item) {
			response.status(500).json({ 'error' : 'Field and item cannot be null'})
		} else {
			pool.query('SELECT * FROM recipes WHERE $1 = $2', [field, item], (error, results) => {
				if (error) {
					console.log(error);
		      throw error;
		    } else {
					response.status(201).send(results);
				}
				// if (results.rowCount === 0) {
				// 	response.status(500).json({ 'error' : 'Unable to find recipe'})
				// } else {

				// }
			})
		}
	}
}

// alter Recipes

module.exports = {
	getRecipes,
	createRecipe,
	deleteRecipe,
	searchRecipe
}
