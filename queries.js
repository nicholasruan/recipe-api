const Pool = require('pg').Pool
const pool = new Pool({
  user: 'nr',
  host: 'localhost',
  database: 'api',
  password: '1234',
  port: 5432,
})

const API_KEY = 'miloislife';

const getRecipes = (request, response) => {
	console.log(request.headers.key);
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

module.exports = {
	getRecipes
}
