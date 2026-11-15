'use strict';

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Articles', [
      {
        name: 'Introduction to Ahtanga',
        slug: 'introduction-to-ahtanga',
        image: 'ahtanga.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        published: new Date(),
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Morning vinyasa flow routine',
        slug: 'morning-vinyasa-flow-routine',
        image: 'morning.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        published: new Date(),
        author_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Secrets of a yoga teacher',
        slug: 'secrets-of-a-yoga-teacher',
        image: 'teacher.jpg',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        published: new Date(),
        author_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Articles', null, {});
  }
};
