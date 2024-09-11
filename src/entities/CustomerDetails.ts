import { BaseEntity, Entity , Column , PrimaryGeneratedColumn , OneToOne , JoinColumn } from 'typeorm';
import {IsPhoneNumber , IsDate , IsEmail,IsNotEmpty  } from "class-validator"
import {Customers} from "./Customers"

@Entity('CustomerDetails')
export class CustomerDetails extends BaseEntity{

    @PrimaryGeneratedColumn()
    customerID !:number

    @Column({nullable:false,type:'varchar' , length:150})
    @IsNotEmpty()
    address !:string

    @Column({nullable:false , type:'varchar' , length:10 ,unique:true})
    // @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber !:string
    
    @Column({nullable:false,unique:true})
    @IsNotEmpty()
    @IsEmail()
    email !: string
    
    @Column({nullable:false , type:Date})
    @IsNotEmpty()
    @IsDate()
    dateOfBirth!:Date

    @OneToOne( () =>Customers ,(customer)=>customer.customerDetails ,{ onDelete: "CASCADE" ,onUpdate:"CASCADE"})
    @JoinColumn()
    customer!:Customers

}