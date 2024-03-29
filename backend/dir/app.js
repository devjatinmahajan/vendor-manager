"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const mongoose = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../", ".env") });
app.use(express_1.default.json());
app.use((req, res, next) => {
    console.log("Request is made");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/api", vendorRoutes_1.default);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "/frontend/dist")));
    app.get("*", (req, res, next) => {
        res.sendFile(path_1.default.join(path_1.default.resolve(), "/frontend/dist/index.html"));
    });
}
app.listen(process.env.PORT || 8080);
mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.9s9ex2a.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`)
    .then(() => {
    const server = app.listen(process.env.PORT || 8080);
});
