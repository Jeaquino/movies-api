let express = require('express');
let router = express.Router();

let moviesController = require('../controllers/moviesController')

//Aquí las rutas
router.get('/', moviesController.index);
router.get('/id/:id', moviesController.show);
router.get('/movienew', moviesController.create);
router.post('/create', moviesController.store);
router.get('/edit/:id', moviesController.edit);
router.put('/update/:id', moviesController.update);
router.get('/results', moviesController.search);
router.delete('/delete/:id', moviesController.destroy);
router.get('/searchByGenre/:id', moviesController.showByGenre);



module.exports = router;