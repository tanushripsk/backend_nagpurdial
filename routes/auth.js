const express = require("express");
const User = require("../modules/User");
const fetchuser = require("../fetch/Fetchuser");
const router = express.Router();
const Businesschat = require("../modules/Businesschat");
const Advertise = require("../modules/Advertise");
const { body, validationResult } = require("express-validator");
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
const jwt_key = "gayatrimam@123";

// createuser
router.post(
  "/createuser",
  [
    body("name", "enter valid name").isLength({ min: 3 }),
    body("email", "enter valid email").isEmail(),
    body("password", "enter password has min length is 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    var user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(404).json({ error: "sorry already exist" });
    }
    const salt = await bcryptjs.genSalt(10);
    secPass = await bcryptjs.hash(req.body.password, salt);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, jwt_key);
    console.log(authtoken);
    success = true;
    res.json({ success, authtoken });
  }
);

// contact form for businesschat
router.post(
  "/businesschat",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("number", "Enter number").isLength({ min: 12 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, number } = req.body;
    try {
      const businesschat = new Businesschat({
        name,
        number,
      });
      await businesschat.save();
      const data = { user: { id: businesschat.id } };
      const authtoken = jwt.sign(data, jwt_key);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


// advertised
router.post(
  "/advertise",
  [
    body("name", "Enter valid fullname").isLength({ min: 10 }),
    body("number", "Enter number").isLength({ min: 12 }),
    body("address", "Enter valid address").isLength({ min: 15 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, address, number } = req.body;
    try {
      const advertise = new Advertise({
        name,
        address,
        number,
      });
      await advertise.save();
      const data = { user: { id: advertise.id } };
      const authtoken = jwt.sign(data, jwt_key);
      res.json({ success: true, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//login 
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "min length is 8").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      var user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "sorry user not exist" });
      }
      const pass = await bcryptjs.compare(password, user.password);
      if (!pass) {
        success = false;
        return res.status(404).json({ error: "sorry user not exist" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_key);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);


// getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("internal server error");
  }
});

module.exports = router;
