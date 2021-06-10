const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

const app = express();
dotenv.config({
    path: "./config.env"
})

//connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.get("/mustang",(req,res) => {
    res.status(200).json({
        message: "hellp Mustang"
    })
})

app.post("/login",(req,res) => {
    res.status(200).json({
        message: "Login successful"
    })
})

app.get("/mustang/getTenants", async (req,res) => {
    
    try{
        const data = await connectDB.query("SELECT * from public.tenant");
        res.json(data);
    }catch(err){
        console.error(err.message);
    }
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started on port "+PORT))