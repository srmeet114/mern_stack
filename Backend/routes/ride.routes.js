const express = require('express');
const router = express.Router();
const {body,param} = require('express-validator');
const rideController = require('../controllers/ride.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/create',
    authMiddleware.authUser,
    body('pickup').isString().isLength({ min:3}).withMessage('Invaild pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invaild destination address'),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage('Invaild vehicle type'),
    rideController.createRide
)

router.get('/get-fare/:pickup/:destination',
    authMiddleware.authUser,
    param('pickup').isString().isLength({min:3}).withMessage('Invaild Pickup'),
    param('destination').isString().isLength({min:3}).withMessage('Invaild Destination'),
    rideController.getFare
)

// router.get('/get-fare/:pickup/:destination', authMiddleware.authUser, rideController.getFare);


module.exports = router;