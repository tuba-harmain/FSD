const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const todoRouter = require("./routes/todoRoutes");

dotenv.config();

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.use ('/', todoRouter);

app.set("view engine", "ejs");

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, (error, data) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log("Connected to db!");
    app.listen(3000, () => console.log("Server Up and running"));
});
