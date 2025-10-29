const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Hardcoded JWT configuration - THIS WILL WORK FOR SURE
const JWT_CONFIG = {
  SECRET: '0847b4cd0c5b5566a3935e435524a31e638d4b3ffb05e6a318443644b1a87e55bce91ba9b9451a4097bb1c6d5282c90ade2646700e6c855da8b66a05abf8b701',
  EXPIRE: '30d'
};

const signToken = (id) => {
  return jwt.sign({ id }, JWT_CONFIG.SECRET, {
    expiresIn: JWT_CONFIG.EXPIRE
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    console.log('📝 Registration attempt for:', email);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const newUser = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'user'
    });

    console.log('✅ User created in database:', newUser.email);
    createSendToken(newUser, 201, res);

  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt for:', email);

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide email and password'
      });
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    // Check password
    const isPasswordCorrect = await user.correctPassword(password, user.password);
    
    if (!isPasswordCorrect) {
      console.log('❌ Incorrect password for:', email);
      return res.status(401).json({
        status: 'error',
        message: 'Incorrect email or password'
      });
    }

    console.log('✅ Login successful for:', email);
    createSendToken(user, 200, res);

  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { name, phone, address, emergencyContacts } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, address, emergencyContacts },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};