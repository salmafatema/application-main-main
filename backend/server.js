require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const setupSwagger = require("./swagger"); // Import Swagger setup

const authRoutes = require("./routes/authenticationRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const otherStaysRoutes = require("./routes/otherStaysRoutes");
const featuredRoutes = require('./routes/featuredRoutes');
const popularRoutes = require('./routes/popularRoutes');



const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/api/featured', featuredRoutes);
app.use('/api/popular-stays', popularRoutes);
app.use('/api/other-stays', otherStaysRoutes);

// Initialize Swagger
setupSwagger(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));