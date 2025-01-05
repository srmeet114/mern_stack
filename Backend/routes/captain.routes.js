const captainController = require("../controllers/captain.controller");
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

router.post("/register",[
    body("email").isEmail().withMessage("Invalid email"),
    body("fullname.firstname").isLength({ min: 3 }).withMessage("Minimum 3 characters required"),
    body("password").isLength({ min: 6 }).withMessage("Minimum 6 characters required"),
    body("vehicle.color").isLength({ min: 3 }).withMessage("Minimum 3 characters required"),
    body("vehicle.plate").isLength({ min: 3 }).withMessage("Minimum 3 characters required"),
    body('vehicle.capacity').isNumeric().withMessage('Capacity must be a number'),
    body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
  ],
  captainController.registerCaptain
);

module.exports = router;