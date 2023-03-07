"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Coffees", [
      {
        name: "Colombian Supremo",
        year: 2021,
        caffine_content: 1.4,
        caffine_percentage: 1.1,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        name: "Ethiopian Yirgacheffe",
        year: 2022,
        caffine_content: 1.5,
        caffine_percentage: 2.2,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        name: "Sumatra Mandheling",
        year: 2023,
        caffine_content: 1.3,
        caffine_percentage: 3.3,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        name: "Kenya AA",
        year: 2022,
        caffine_content: 1.6,
        caffine_percentage: 4.4,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        name: "Guatemala Antigua",
        year: 2023,
        caffine_content: 1.2,
        caffine_percentage: 5.5,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Coffees', null, {})
  },
};
