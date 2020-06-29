const express = require("express");
const router = express.Router();
// Universal avatar
const gravatar = require("gravatar");
// Hash password
const bcrypt = require("bcryptjs");
// Validation
const { check, validationResult } = require("express-validator");
// JESON WEB TOKEN
const jwt = require("jsonwebtoken");
//Config
const config = require("config");

// Get User model
const User = require("../../models/User");

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
  async (req, res) => {
    // We can send data and get access to it with req.body
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
      // See if user exists (unique users)
      let user = await User.findOne({ email });

      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password

      //ustawienie sposobu kodowania hasla
      const salt = await bcrypt.genSalt(10);
      // obietnica przyjmuje 2 rzeczy haslo i kodowanie hasla
      user.password = await bcrypt.hash(password, salt);

      //Zapisanie w bazei danych
      await user.save();

      // Return JWT
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
