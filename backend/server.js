require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const trialRoutes = require('./routes/trials')
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Initialize passport with JWT strategy
try {
  require('./config/passport')(passport);
} catch (error) {
  console.log('Passport initialization error:', error.message);
}

app.use('/api/trials', trialRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('mongodb connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => res.send('backend is running'));

app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`));

