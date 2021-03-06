const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const apiDashboardRouter = require('./Routers/ApiDashboard');
const serverless = require("serverless-http")
const app = express();
dotenv.config({
    path: "./config.env"
})

app.use(morgan("dev"));
app.use(express.json());

//Swagger documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./OpenApiDocumentation/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req,res) => {
    res.send("Hello from Aniket");
})

//API Dashboard
app.use("/mustang", apiDashboardRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server started on port "+PORT))
exports.handler = serverless(app);
//module.exports = app;