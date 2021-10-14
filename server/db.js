import { Sequelize } from "sequelize";
import config from "../config";
const mysql2 = require("mysql2");


const db = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
      dialect: config.db.dialect,
      dialectModule: mysql2,
    }
  );

export default db;