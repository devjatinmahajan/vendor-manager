import express, { Express } from "express";
const app: Express = express();
const mongoose = require("mongoose")
import dotenv from "dotenv"
import path from "path";
import vendorRouter from "./routes/vendorRoutes"

dotenv.config({ path: path.join(__dirname, "../", ".env") })
app.use(express.json());

app.use((req, res, next) => {
    console.log("In", process.env.MONGO_USER)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(vendorRouter)

app.listen(8000)

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9s9ex2a.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`
    )
    .then(() => {
        const server = app.listen(process.env.PORT || 8080);
    });