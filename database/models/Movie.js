module.exports = (sequelize, DataTypes) => {
  const alias = "Movie";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.DECIMAL,
    },
    awards: {
      type: DataTypes.INTEGER,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    length: {
      type: DataTypes.INTEGER,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: "rols",
        },
        key: "id",
      },
      onDelete: "cascade",
    },
  };

  const config = {
    tableName: "movies",
    timestamps: true,
    underscored: true,
  };
  const Movie = sequelize.define(alias, cols, config);
  Movie.associate = (models) => {
    Movie.belongsTo(models.Genre, {
      as: "genres",
      foreignKey: "genre_id",
    });
    Movie.belongsToMany(models.Actor, {
      as: "actors_in_movie",
      through: "actor_movie",
      foreignKey: "movie_id",
      otherKey: "actor_id",
    });
  };
  return Movie;
};
