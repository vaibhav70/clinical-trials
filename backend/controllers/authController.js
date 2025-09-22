const User = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT token (use fallback secret if not set)
    const secret = process.env.JWT_SECRET || 'fallback-secret-key';
    const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
    
    res.status(201).json({ 
      message: "User registered successfully!",
      token,
      user: { id: newUser._id, username: newUser.username, email: newUser.email }
    });
  } catch (err) {
    console.log('Registration error:', err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token (use fallback secret if not set)
    const secret = process.env.JWT_SECRET || 'fallback-secret-key';
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });
    res.json({ 
      message: "Login successful!",
      token, 
      user: { id: user._id, username: user.username, email: user.email } 
    });
  } catch (err) {
    console.log('Login error:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
