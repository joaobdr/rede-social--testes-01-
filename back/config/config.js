require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY,
  dbPath: "files/db.json",
};
