const { Genre } = require("../../database/models");

const genresController = {
  getAll: async (req, res) => {
    try {
      const genres = await Genre.findAll({ attributes: ["name","id"] });
      return res.json({
        meta: {
          status: 200,
          total: genres.length,
        },
        data: genres,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Servio momentaneamente fuera de servicio" });
    }
  },
};

module.exports = genresController;
