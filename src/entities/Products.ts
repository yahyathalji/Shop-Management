import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { IsInt, Min, IsNotEmpty } from "class-validator";
import { Orders } from "./Orders";

@Entity('Products')
export class Products extends BaseEntity {
    @PrimaryGeneratedColumn()
    productID!: number;

    @Column("varchar", { nullable: false, unique: true })
    @IsNotEmpty()
    category!: string;

    @Column("int", { nullable: false })
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    price!: number;

    @Column({ nullable: false })
    @IsNotEmpty()
    @Min(0)
    quantity!: number;

    @ManyToMany(() => Orders, orders => orders.products, { onDelete: "CASCADE", onUpdate: "CASCADE" })
    orders!: Orders[];
}
