module.exports = (sequelize, DataTypes) => {
  const alias = "Actor";
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unsigned: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.DECIMAL(3,1)
    },
    favorite_movie_id: {
      type: DataTypes.INTEGER,
    }
  };

  const config = {
    tableName: "actors",
    timestamps: true,
    underscored: true,
  };
  const Actor = sequelize.define(alias, cols, config);
  Actor.associate = (models) => {
    Actor.belongsToMany(models.Movie, {
      as: 'movies',
      through: 'actor_movie',
      foreignKey: 'actor_id',
      otherKey: 'movie_id'
    });
  }
  return Actor;
};
