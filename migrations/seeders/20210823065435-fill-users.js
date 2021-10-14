'use strict';

const users = [
  {
    firstName: 'Luke',
    lastName: 'Skywalker',
    role: 'ClIENT',
    phone: '+380955746522',
    email: 'lukeSk@gmail.com',
    password: 'helloworld',
    createdAt:  Date.now() / 1000,
    updatedAt:  Date.now() / 1000,
  },
  {
    firstName: 'Vika',
    lastName: 'Sky',
    role: 'ADMIN',
    phone: '+380978636522',
    email: 'vikaAd@gmail.com',
    password: '123477hi',
    createdAt:  Date.now() / 1000,
    updatedAt:  Date.now() / 1000,
  },
  {
    firstName: 'Dimon',
    lastName: 'Dvorik',
    role: 'CLIENT',
    phone: '+380978544328',
    email: 'dvorik.dimond@gmail.com',
    password: '1fub5hi',
    createdAt:  Date.now() / 1000,
    updatedAt:  Date.now() / 1000,
},
{
  firstName: 'Vladimir',
  lastName: 'Ilin',
  role: 'CLIENT',
  phone: '+380975563422',
  email: 'vladimirilin@gmail.com',
  password: '777hihello',
  createdAt:  Date.now() / 1000,
  updatedAt:  Date.now() / 1000,
},
{
  firstName: 'Olga',
  lastName: 'Petrova',
  role: 'CLIENT',
  phone: '+380977775940',
  email: 'petrova.O@gmail.com',
  password: '1ap11ax',
  createdAt:  Date.now() / 1000,
  updatedAt:  Date.now() / 1000,
},
]


module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', users);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
