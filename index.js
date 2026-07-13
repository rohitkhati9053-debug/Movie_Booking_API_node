const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/home", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Fetched Home"
    });
});

// Database Connection
async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("✅ MongoDB Connected");

        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error("❌ MongoDB Connection Failed");
        console.error(err.message);
        process.exit(1);
    }
}

connectDB();