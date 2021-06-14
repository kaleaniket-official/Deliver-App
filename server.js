const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const apiDashboardRouter = require('./Routers/ApiDashboard');
const app = express();
dotenv.config({
    path: "./config.env"
})

//connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.use("/mustang", apiDashboardRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started on port "+PORT))