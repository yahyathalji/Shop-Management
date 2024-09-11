import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { IsDate, IsNotEmpty } from "class-validator";
import { Customers } from "./Customers";
import { Employees } from "./Employees";
import { Products } from "./Products";

@Entity('Orders')
export class Orders extends BaseEntity {
    @PrimaryGeneratedColumn()
    orderID!: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    orderTotal!: number;

    @Column("date", { nullable: false })
    @IsNotEmpty()
    @IsDate()
    orderDate!: Date;

    @ManyToOne(() => Customers, customer => customer.orders, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    customer!: Customers;

    @ManyToOne(() => Employees, employees => employees.orders)
    employee!: Employees;

    @ManyToMany(() => Products, products => products.orders)
    @JoinTable() 
    products!: Products[];
}
