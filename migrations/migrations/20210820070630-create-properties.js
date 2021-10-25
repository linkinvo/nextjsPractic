'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await  queryInterface.sequelize.query(`
      CREATE TABLE properties (
        id int(11) NOT NULL AUTO_INCREMENT,
        img varchar(255) NOT NULL,
        description varchar(255) DEFAULT NULL,
        rating int(11) NOT NULL,
        price int(11) NOT NULL,
        beds int(11) NOT NULL,
        baths int(11) NOT NULL,
        userId int(11) NOT NULL,
        createdAt int(11),
        updatedAt int(11),
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `);
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('properties');
  }
};
