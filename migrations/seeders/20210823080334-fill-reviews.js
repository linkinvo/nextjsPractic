"use strict";
// const times = require("lodash/times");
const faker = require("faker");
const { QueryTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await queryInterface.sequelize.query(
      "SELECT * FROM `users`",
      { type: QueryTypes.SELECT }
    );
    const properties = await queryInterface.sequelize.query(
      "SELECT * FROM `properties`",
      { type: QueryTypes.SELECT }
    );
    const items = [];

    users.map((user) => {
      // times(1).map((i) => {
        let item = {
          userId: user.id,
          propertiId: properties.id,
          feedback: faker.commerce.productDescription(),
          createdAt: Date.now() / 1000,
          updatedAt: Date.now() / 1000,
        };
        properties.map((propertiesReviews) => {
            item = {
              ...item,
              ...{propertiId: propertiesReviews.id}
            };
            items.push(item);
          });
      // });
    });

    return queryInterface.bulkInsert("reviews", items);
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("reviews", null, {});
  },
};