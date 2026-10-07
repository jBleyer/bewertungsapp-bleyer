"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert("Criteria", [
      {
        name: "Inhalt",
        maxScore: 10,
        weight: 1.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Präsentationstechnik",
        maxScore: 10,
        weight: 1.0,
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "Technische Umsetzung",
        maxScore: 10,
        weight: 1.5,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Criteria", null, {});
  },
};
