const express = require("express");
const router = express.Router();

const Auth = require("../services/Auth");

router.get("/", async (req, res) => {
  let resultGet = await Auth.testGet();

  res.json({ code: 0, resultDB: resultGet });
});

module.exports = router;
