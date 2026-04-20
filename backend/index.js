require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Adjust for frontend URL
app.use(cookieParser());

app.get('/', (req,res)=> {
    res.send('Api is running');
});

// Connect to MongoDB
connectDB();

// Import routes
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const cryptoRoutes = require('./routes/crypto');

app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/crypto', cryptoRoutes);

app.listen(3000, () => console.log('Server running on port 3000'));

