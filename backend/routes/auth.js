const express = require("express");
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'THis$WebsiteMy$Id'; 

// Route 1: Create a user using POST: "/api/auth/createuser" No Login Required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors, retun bad request and error detail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with this email exists
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ errors: "Sorry! User with this email already exists" });
      }
      // Create a new user
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt)
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      const data = {
        user: {
            id: user.id
        }
      }

      const authToken = jwt.sign(data, JWT_SECRET);

      res.json(authToken);
      //res.json(user);

    } catch (error) {
      // catch errors
      console.error(error.message);
      res.status(500).send("Internal Server Error: Please try again");
    }
  }
);

// Route 2: Authenticate a user using POST: "/api/auth/login" No Login Required
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    // if there are errors, retun bad request and error detail
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        // Check User email exists
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ success, error: "Please enter correct credentails"});
        }
        // Verify password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please enter correct credentails"});
        }
        // send payload to server for client authentication
        const data = {
            user: {
                id: user.id
            }
          }
        const authToken = jwt.sign(data, JWT_SECRET);
        success=true
        res.json({success,authToken});

    }catch (error) {
        // catch errors
        console.error(error.message);
        res.status(500).send("Internal Server Error: Please try again");
    }

  }
);

// Route 3: Get logged in user information using POST: "/api/auth/getuser" Login Required
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    // catch errors
    console.error(error.message);
    res.status(500).send("Internal Server Error: Please try again");
  }
});


module.exports = router;
