"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert("Jurors", [
      {
        name: "M. Huber",
        email: "m.huber@schule.at",
        createdAt: now,
        updatedAt: now,
      },
      {
        name: "S. Novak",
        email: "s.novak@schule.at",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete("Jurors", null, {});
  },
};
