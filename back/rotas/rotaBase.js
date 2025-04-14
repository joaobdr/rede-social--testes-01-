const fs = require('fs')
const express = require("express");
const router = express.Router();

const dados = async () => {
  const data = await fs.promises.readFile("files/db.json", "utf8");
  return JSON.parse(data);
};

router.get('/', async (req, res) => res.status(200).json({dados: await dados(),msg: "rota base"}));

module.exports = router;