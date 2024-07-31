'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CourseLecturers', 'CourseLecturers_courseCode_fkey');
    await queryInterface.addConstraint('CourseLecturers', {
      fields: ['courseCode'],
      type: 'foreign key',
      name: 'CourseLecturers_courseCode_fkey',
      references: {
        table: 'Courses',
        field: 'code'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('CourseLecturers', 'CourseLecturers_courseCode_fkey');
    await queryInterface.addConstraint('CourseLecturers', {
      fields: ['courseCode'],
      type: 'foreign key',
      name: 'CourseLecturers_courseCode_fkey',
      references: {
        table: 'Courses',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  }
};