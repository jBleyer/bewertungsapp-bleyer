"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Project.belongsTo(models.Team, { foreignKey: "teamId" });

      //Gegenrichtung
      Project.hasMany(models.Evaluation, { foreignKey: "projectId" });
    }
  }
  Project.init(
    {
      //Optionale Validierung
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 },
      },
      teamId: DataTypes.INTEGER,
      titel: DataTypes.STRING,
      beschreibung: DataTypes.STRING,
      praesentiertAm: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: "Project",
    },
  );
  return Project;
};
