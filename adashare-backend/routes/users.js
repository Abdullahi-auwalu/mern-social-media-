const router = require("express").Router();
const user = require("../models/User");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json("unable to update");
        //console.log(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account updated successfully");
    } catch (err) {}
    return res.status(500).json("unable to update");
    //console.log(err);
  } else {
    return res.status(403).json("You can only update your account!");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account deleted successfully");
    } catch (err) {}
    return res.status(500).json("unable to delete");
    //console.log(err);
  } else {
    return res.status(403).json("You can only delete your account!");
  }
});

//GET A USER
//FOLLOW A USER
//UNFOLLOW A USER

module.exports = router;
