import { DataSource } from 'typeorm';
import { CustomerDetails } from "../entities/CustomerDetails";
import { Customers } from "../entities/Customers";
import { Employees } from "../entities/Employees";
import { Orders } from "../entities/Orders";
import { Products } from "../entities/Products";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "ShopManagementDB",
    entities: [CustomerDetails, Customers, Orders, Employees, Products],
    synchronize: false,
    dropSchema: false,
    logging: false,
});

export const initializeDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
};
