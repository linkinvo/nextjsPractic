'use strict';
const times = require('lodash/times');
const faker = require('faker')
const { QueryTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
    // const reviews = await queryInterface.sequelize.query("SELECT * FROM `reviews`", { type: QueryTypes.SELECT });
    const items = [];

    users.map(user => {
      times(10).map(i => {
        const item = {
          userId: user.id,
          img: 'http://placebeard.it/g/640x480/' + i,
          beds: faker.datatype.number(),
          baths: faker.datatype.number(),
          price: faker.finance.amount(),
          description: faker.commerce.productDescription(),
        //  reviews_id: reviews.id,
          rating: 4,
          createdAt : Math.floor(new Date().getTime()/1000.0),
          updatedAt : Math.floor(new Date().getTime()/1000.0)
          // updatedAt : Date.now() / 1000
        };
        items.push(item);
      })
    })
    
    return queryInterface.bulkInsert('properties', items);

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('properties', null, {});
  }
};