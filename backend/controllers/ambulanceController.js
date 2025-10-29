const Ambulance = require('../models/Ambulance');

exports.getAllAmbulances = async (req, res, next) => {
  try {
    const ambulances = await Ambulance.find().populate('driver', 'name phone');
    
    res.status(200).json({
      status: 'success',
      results: ambulances.length,
      data: {
        ambulances
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getAmbulance = async (req, res, next) => {
  try {
    const ambulance = await Ambulance.findById(req.params.id).populate('driver', 'name phone');
    
    if (!ambulance) {
      return res.status(404).json({
        status: 'error',
        message: 'Ambulance not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        ambulance
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateAmbulanceLocation = async (req, res, next) => {
  try {
    const { lat, lng, address } = req.body;
    
    const ambulance = await Ambulance.findByIdAndUpdate(
      req.params.id,
      {
        currentLocation: {
          coordinates: { lat, lng },
          address,
          lastUpdated: new Date()
        }
      },
      { new: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        ambulance
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};