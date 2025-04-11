const { Movie } = require("../../database/models");
const moviesController = {
  getAllMovies: async (req, res) => {
    try {
      const { association } = req.query;
      
      let query;

      if (association) {
        query = {
          include: [
            { association: "genres" },
            { association: "actors_in_movie" },
          ],
        };
      }else{
        query = {}
      }

      query.attributes = {
        exclude: ["createdAt", "updatedAt"],
      };

      console.log(query);
      
      const movies = await Movie.findAll(query);

      if (movies.length === 0) {
        return res.status(404).json({
          meta: {
            status: 404,
            msg: "No se encontraron películas",
          },
        });
      }

      return res.json({
        meta: {
          status: 200,
          total: movies.length,
        },
        data: movies,
      });
    } catch (error) {
      console.error(error);
      res.status(404).json({
        meta: {
          status: 404,
          msg: "No se encontraron películas",
        },
      });
    }
  },
  detail: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id || isNaN(+id)) {
        return res.status(400).json({
          meta: {
            status: 400,
            msg: "El ID proporcionado no es válido, se debe proporcionar un número",
          },
        });
      }

      if (id < 1) {
        return res.status(400).json({
          meta: {
            status: 400,
            msg: "El ID proporcionado no es válido, se debe proporcionar un número mayor a 0",
          },
        });
      }

      const movie = await Movie.findByPk(id, {
        include: [
          { association: "genres" },
          { association: "actors_in_movie" },
        ],
      });

      if (movie) {
        res.json({
          meta: {
            status: 200,
          },
          data: movie,
        });
      } else {
        res.status(404).json({
          meta: {
            status: 404,
            msg: "No se encontró la película para el ID proporcionado",
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        meta: {
          status: 500,
          msg: "Error interno del servidor",
        },
      });
    }
  },
};

module.exports = moviesController;
