const router = require("express").Router();
const user = require("../models/User");
const bcrypt = require("bcrypt");

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userid === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  } else {
    return res.status(403).json("You can only update your account!");
  }
});

//DELETE USER
//GET A USER
//FOLLOW A USER
//UNFOLLOW A USER

module.exports = router;
