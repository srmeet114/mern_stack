const { validationResult } = require('express-validator');
const { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestions } = require('../services/map.service');

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  const address = req.query.address;

  try {
    const coordinates = await getAddressCoordinate(address);
    return res.status(200).json({ coordinates });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch coordinates', error: error.message });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const result = await getDistanceTime(origin, destination);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch distance and time', error: error.message });
  }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: error.array()})
    }
    const { input } = req.query;

    const suggestions = await getAutoCompleteSuggestions(input);

    res.status(200).json(suggestions);

  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch suggestions', error: error})
  }
}