'use strict';

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
    await queryInterface.bulkInsert('Posts', [
      {
        title: "Smooth and delicious",
        coffee: 1,
        text: "This Colombian Supremo is simply amazing. It has a smooth and delicious taste with just the right amount of caffeine. Definitely recommend!",
        rating: 4.5,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        title: "Bold and full-bodied",
        coffee: 2,
        text: "If you're looking for a coffee with a strong and bold flavor, look no further than this Ethiopian Yirgacheffe. It's full-bodied and has a great caffeine kick.",
        rating: 4.0,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        title: "The best coffee ever!",
        coffee: 3,
        text: "I've tried a lot of different coffees over the years, but this Sumatra Mandheling is by far the best. It's smooth, rich, and has just the right amount of caffeine. Highly recommend!",
        rating: 5.0,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        title: "Not my cup of tea... or coffee",
        coffee: 4,
        text: "I have to be honest, I didn't really enjoy this Kenya AA. It tasted a bit bitter and didn't have enough caffeine for my liking. Just not my cup of tea... or coffee.",
        rating: 2.0,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      {
        title: "A classic coffee",
        coffee: 5,
        text: "If you're a fan of classic coffee flavors, you'll love this Guatemala Antigua. It's smooth and balanced with a medium amount of caffeine. Great for any time of day.",
        "rating": 3.5,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Posts', null, {})
  }
};
