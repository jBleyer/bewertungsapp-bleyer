"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Evaluations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      projectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Projects", key: "id" },
      },
      criterionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Criteria", key: "id" },
      },
      jurorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Jurors", key: "id" },
      },
      score: { type: Sequelize.INTEGER, allowNull: false },
      comment: { type: Sequelize.STRING(500), allowNull: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });

    await queryInterface.addConstraint("Evaluations", {
      fields: ["projectId", "criterionId", "jurorId"],
      type: "unique",
      name: "unique_project_criterion_juror",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Evaluations");
  },
};
