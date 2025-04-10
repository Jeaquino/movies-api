const { Movie, Genre } = require("../database/models");
const { Op, DATE, where, Association } = require("sequelize");

let moviesController = {
  index: async function (req, res) {
    try {
      const movieList = await Movie.findAll();
      return res.render("movies", { title: "Movies", listaPelis: movieList });
    } catch (error) {
      return res.render("error", { error });
    }
  },
  show: async function (req, res) {
    const id = req.params.id;
    try {
      const movie = await Movie.findByPk(id, { 
        attributes: ["title", "rating","length"],
        include: [
          { association: "actors_in_movie" },
          { association: "genres" },
        ],
      });
      return res.send(movie);
    } catch (error) {
      return res.render("error", { error });
    }
  },
  create: function (req, res) {
    return res.render("movieNew", { title: "nueva película" });
  },
  search: async function (req, res) {
    const searchTerm = req.query.search;
    try {
      const movies = await Movie.findAll({
        where: {
          title: {
            [Op.like]: `%${searchTerm}%`,
          },
        },
      });
      return res.render("searchResults", {
        title: "Resultados de búsqueda",
        searchTerm,
        movies,
      });
    } catch (error) {
      return res.render("error", { error });
    }
  },
  store: async function (req, res) {
    let info = req.body;
    try {
      const movie = await Movie.create(info);
      console.log("registro de la peli", movie);
      req.session.lastMovie = info;
      res.cookie("lastMovie", info.title, { maxAge: 1000 * 60 * 5 });
      return res.redirect("/");
    } catch (error) {
      res.render("error", { error });
    }
  },
  edit: async function (req, res) {
    const id = req.params.id;
    try {
      let movie = await Movie.findByPk(id);
      let release_date =
        movie.release_date && movie.release_date.toISOString().split("T")[0];

      return res.render("movieEdit", {
        title: "Editar película",
        movie,
        release_date,
      });
    } catch (error) {
      return res.render("error", { error });
    }
  },
  update: async function (req, res) {
    const id = req.params.id;
    const info = req.body;
    try {
      const movie = await Movie.update(info, { where: { id } });
      //await movie.update(info);
      return res.redirect(`/movies/id/${id}`);
    } catch (error) {
      return res.render("error", { error });
    }
  },
  destroy: async function (req, res) {
    const id = req.params.id;
    try {
      await Movie.destroy({
        where: {
          id: 1,
        },
      });
      console.log("pelicula eliminada", movie);
      return res.redirect("/");
    } catch (error) {
      return res.render("error", { error });
    }
  },
  showByGenre: async function (req, res) {
    const id = req.params.id;
    try {
      const moviesByGenre = await Genre.findByPk(id, { include: "movies" });
      return res.send(moviesByGenre);
    } catch (error) {
      return res.render("error", { error });
    }
  },
};

module.exports = moviesController;
