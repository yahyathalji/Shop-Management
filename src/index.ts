import express from "express";
import { initializeDB } from "./database/db";
import { notFound ,errorHandler } from "./middleware/httpErrors"; "./middleware/httpErrors"
import customerRoute from "./routes/customer Routes/customerRoutes";
import employeeRoute from "./routes/employee Routes/employeeRoutes";
import productRoute from "./routes/product Routes/productRoute";
import orderRoute from "./routes/order Routes/orderRoutes";

const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define routes
app.use("/api/customer", customerRoute);
app.use("/api/employee", employeeRoute);
app.use("/api/order", orderRoute);
app.use("/api/product", productRoute);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await initializeDB(); 
    console.log(`Server is listening on port ${port}`);
});
