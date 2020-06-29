const express = require("express");
const router = express.Router();
// Validation
const { check, validationResult } = require("express-validator");

// @route  POST api/users
// @desc   Register user
// @access Public

router.post(
  "/",
  [
    // Check function  1st Co sprawdzamy? , 2nd Custom msg
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a passord with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    // We can send data and get access to it with req.body
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), error: true });
    }
    res.send("User route");
  }
);

module.exports = router;
