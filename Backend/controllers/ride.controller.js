const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  
  try {
    const {  pickup, destination, vehicleType } = req.body;
    const userId = req.user._id;
    const ride = await rideService.createRide({
      user: userId,
      pickup,
      destination,
      vehicleType,
    });
    console.log("🚀 ~ module.exports.createRide= ~ ride:", ride)
    return res.json(ride);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { pickup, destination } = req.params; //req.body do not type
    const fare = await rideService.getFare(pickup, destination );
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};