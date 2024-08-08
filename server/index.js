import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", routes)

mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(data => {
    console.log(`Mongodb connected to server: ${data.connection.host}`);
})
// .catch(error => {
//     console.log({ error });
//     process.exit(1);
// })

const server = app.listen(process.env.PORT, () => {
    console.log(`Server working on http://localhost:${process.env.PORT}`);
})

app.get("/", (req, res) => {
    res.status(200).send(
        "API is working fine"
    );
})

//Handling Uncaught Exceptions  (Undefined variable)
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);;
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

//Unhandled promise rejection   (If any connection string or any server related error)
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(() => {
        process.exit(1);
    })
})

