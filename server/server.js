// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Middleware (must come first)
// const allowedOrigins = [
//   "https://contact-manager-pi-two.vercel.app/", // replace with your actual Vercel frontend URL
//   "http://localhost:5173", // for local dev
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


// // Routes (after middleware)
// const contactRoutes = require('./routes/contactRoutes');
// app.use('/api/contacts', contactRoutes);

// // Test route
// app.get('/', (req, res) => {
//   res.send('API is running...');
// });

// // Connect to MongoDB and start server
// const PORT = process.env.PORT || 5000;
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.log('MongoDB connection error:', err));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Allowed origins (update the Vercel link with your actual deployed frontend URL)
const allowedOrigins = [
  "http://localhost:5173",                  // Local development
  "https://contact-manager-pi-two.vercel.app"        // Replace with your actual deployed frontend URL
];

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api/contacts', contactRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log('MongoDB connection error:', err));
