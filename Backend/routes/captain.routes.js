const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Minimum 6 characters required"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Minimum 3 characters required"),
    body("vehicle.capacity")
      .isNumeric()
      .withMessage("Capacity must be a number"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captainController.registerCaptain
);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("PasswprdMust be at least 6 characters long"),
  ],
  captainController.loginCaptain
);

router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile)

router.get('/logout',authMiddleware.authCaptain,captainController.logoutCaptain)

module.exports = router;
