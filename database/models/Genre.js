module.exports = (sequelize, DataTypes) => {
  const alias = "Genre";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ranking: {
      type: DataTypes.INTEGER,
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  };

  const config = {
    tableName: "genres",
    timestamps: true,
    underscored: true,
  };
  const Genre = sequelize.define(alias, cols, config);
  Genre.associate = (models) => {
    Genre.hasMany(models.Movie, {
      as: 'movies',
      foreignKey: 'genre_id',
    });
  }
  return Genre;
}