'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Courses', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      unit: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // await queryInterface.addIndex('Courses', ['code']);
    const [results, metadata] = await queryInterface.sequelize.query(
      "SELECT indexname FROM pg_indexes WHERE tablename = 'Courses' AND indexname = 'courses_code'"
    );

    if (results.length === 0) {
      // If the index doesn't exist, create it
      await queryInterface.addIndex('Courses', ['code'], {
        name: 'courses_code',
        unique: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Courses');
    await queryInterface.removeIndex('Courses', 'courses_code');

  }
};