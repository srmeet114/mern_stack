const rideModel = require('../models/ride.model');
const mapService = require('../services/map.service');
const crypto = require('crypto');

async function getFare(pickup,destination) {
    
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup,destination);

    const baseFare = {
        auto:30,
        car:50,
        moto:20
    };
    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };
    const perMinuTeRate = {
        auto:2,
        car:3,
        moto:1.5
    }

    const fare = {
        auto:baseFare.auto + ((distanceTime.distance.value/1000) * perKmRate.auto) + ((distanceTime.duration.value/60) * perMinuTeRate.auto),
        car:baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value/60) * perMinuTeRate.car),
        moto:baseFare.moto + ((distanceTime.distance.value/1000) * perKmRate.moto) + ((distanceTime.duration.value/60) * perMinuTeRate.moto)
    }

    return fare;

}

module.exports.getFare = getFare;

function getOtp(num){
    const otp = crypto.randomInt(0, Math.pow(10, num)).toString().padStart(num, '0');
    return otp;
}

module.exports.createRide = async ({
    user,pickup,destination,vehicleType
})=>{
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup,destination);

    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp:getOtp(6),
        fare: fare[vehicleType]
    });
    return ride;
};