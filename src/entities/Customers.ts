import {Entity , BaseEntity , Column , PrimaryGeneratedColumn , OneToOne ,OneToMany}from "typeorm"
import {IsInt , Min, Length} from "class-validator"
import {CustomerDetails} from "./CustomerDetails"
import {Orders} from "./Orders" 

@Entity('Customers')
export class Customers extends BaseEntity {

    @PrimaryGeneratedColumn()
    customerID !:number

    @Column({nullable:false ,type:"varchar"})
    @Length(2,20 ,{message:`must be a letters between 2 and 20`})
    firstName !:string 

    @Column("varchar",{nullable:false})
    @Length(2,20 ,{message:`must be a letters between 2 and 20`})
    lastName !:string 

    @OneToOne(()=>CustomerDetails ,(customerDetails)=>customerDetails.customer )
    customerDetails !:CustomerDetails

    @OneToMany(()=>Orders , (orders)=>orders.customer )
    orders !:Orders[]
}