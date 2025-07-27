require("dotenv").config();

module.exports = { port: process.env.PORT, mongodUrl: process.env.MONGO_URL };
