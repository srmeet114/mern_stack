const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");
const mapService = require('../services/map.service')
const {sendMessageToSocketId} = require('../socket');
const rideModel = require("../models/ride.model");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { pickup, destination, vehicleType } = req.body;
    const userId = req.user._id;

    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log(pickupCoordinates);

    // Find captains in radius
    const captainsInRadius = await mapService.getCaptainsTheRedius(pickupCoordinates.ltd, pickupCoordinates.lng, 1000);

    const ride = await rideService.createRide({
      user: userId,
      pickup,
      destination,
      vehicleType,
    });
    
    res.status(201).json(ride);

    ride.otp =""

    const rideWithUser = await rideModel.findOne({_id : ride._id}).populate('user')

    captainsInRadius.map( captain =>{
      sendMessageToSocketId(captain.socketId,{
        event: 'new-ride',
        data: rideWithUser
      })
    })
    

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
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports.confirmRide = async(req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {rideId} = req.body;
  try{
    const ride = await rideService.confirmRide({rideId,captain:req.captain});
    sendMessageToSocketId(ride.user.socketId,{
      event: 'ride-confirmed',
      data:ride
    })
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports.startRide = async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const {rideId,otp} = req.params;
    const ride = await rideService.startRide({rideId,otp,captain:req.captain});
    console.log("🚀 ~ module.exports.startRide=async ~ ride:", ride)
    sendMessageToSocketId(ride.user.socketId,{
      event: 'ride-started',
      data:ride
    })
    return res.status(200).json(ride);
  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports.endRide = async(req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    const {rideId} = req.body
    const ride = await rideService.endRide({rideId,captain:req.captain});
    sendMessageToSocketId(ride.user.socketId,{
      event: 'ride-ended',
      data:ride
    })

    return res.status(200).json(ride);

  }catch (error) {
    return res.status(500).json({ message: error.message });
  }
}