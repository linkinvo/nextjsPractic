if (typeof document !== "undefined") {
  throw new Error(
    "Do not import `config.js` from inside the client-side code."
  );
}

module.exports = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",

  db: {
    username: "nextjs",
    password: "nextjs",
    database: "nextjs",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
};
