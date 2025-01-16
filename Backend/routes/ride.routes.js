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

router.post('/confirm',
    authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invaild ride id'),
    rideController.confirmRide
)

router.get('/start-ride/:rideId/:otp',
    authMiddleware.authCaptain,
    param('rideId').isMongoId().withMessage('Invaild ride id'),
    param('otp').isString().isLength({min:6,max:6}).withMessage('Invaild otp'),
    rideController.startRide
)



module.exports = router;