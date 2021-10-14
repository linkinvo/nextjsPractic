'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await  queryInterface.sequelize.query(`
    
    CREATE TABLE reviews (
      id int(11) NOT NULL AUTO_INCREMENT,
      feedback text NOT NULL,
      createdAt bigint(20) NOT NULL,
      userId int(11) NOT NULL,
      propertiId int(11) NOT NULL,
      updatedAt bigint(20) NOT NULL,
      PRIMARY KEY (id),
      KEY idx_created_at (createdAt),
      KEY fk_reviews_users_idx (userId),
      CONSTRAINT fk_reviews_users FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE NO ACTION
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

    `);
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('reviews');
  }
};
