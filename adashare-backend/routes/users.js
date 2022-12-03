const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("hey it's route");
});

module.exports = router;
