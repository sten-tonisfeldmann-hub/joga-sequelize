'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Authors', [
      {
        name: 'Anna Kivimäe',
        slug: 'anna-kivimae',
        email: 'anna@example.com',
        bio: 'Yoga õpetaja ja joogakooli juhendaja.',
        image: 'anna.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Marko Tamm',
        slug: 'marko-tamm',
        email: 'marko@example.com',
        bio: 'Vinyasa ja teadlikkuse treener.',
        image: 'marko.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Liis Laas',
        slug: 'liis-laas',
        email: 'liis@example.com',
        bio: 'Jooga ja meditatsiooni mentor.',
        image: 'liis.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
