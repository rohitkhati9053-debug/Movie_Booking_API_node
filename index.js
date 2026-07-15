const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();


const MovieRoutes=require("./routes/movie.routes")
const theatreRoutes=require("./routes/theatre.routes")

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MovieRoutes(app)   //invoking movie routes
theatreRoutes(app)   //invoking theatre routes
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
        // const createdMovie=await Movie.create({
        //     name:"Boogi Boogi",
        //     description:"comedy",
        //     casts:["akshay","kirti"],
        //     director:"farhas",
        //     trailerUrl:"https://boody.com",
        //     language:"Hindi",
        //     releaseDate:"18-01-2026",
        //     releaseStatus:"RELEASED"
        // })
        // console.log("createdMdie: ",createdMovie);
        

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