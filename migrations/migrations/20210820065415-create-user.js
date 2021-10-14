'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`

    CREATE TABLE users (
      id int(11) NOT NULL AUTO_INCREMENT,
      firstName varchar(255) DEFAULT NULL,
      lastName varchar(255) DEFAULT NULL,
      password varchar(255) DEFAULT NULL,
      role enum('ADMIN','CLIENT') DEFAULT NULL,
      phone varchar(255) DEFAULT NULL,
      email varchar(255) DEFAULT NULL,
      userToken varchar(1000) DEFAULT NULL,
      createdAt bigint(20) NOT NULL,
      updatedAt bigint(20) NOT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    `);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};