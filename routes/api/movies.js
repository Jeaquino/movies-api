const express = require('express');
const router = express.Router();
const {getAllMovies,detail,store,movieDelete} = require('../../controllers/api/moviesController');

router
.get('/', getAllMovies)
.get('/detail/:id', detail)
.post('/create', store)
.delete('/deleteMovie/:id', movieDelete)


module.exports = router;