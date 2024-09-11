import {BaseEntity ,Entity , Column , PrimaryGeneratedColumn , OneToMany} from "typeorm"
import {IsNotEmpty ,IsDate} from "class-validator"
import {Orders} from "./Orders"


@Entity('Employees')
export class Employees extends BaseEntity {

    @PrimaryGeneratedColumn()
    employeeID !: number 

    @Column({nullable:false})
    @IsNotEmpty()
    firstName !:string


    @Column({nullable:false})
    @IsNotEmpty()
    lastName !:string

    @Column({type:'enum' , enum:['male','female'] , nullable:false})
    @IsNotEmpty()
    gender !: 'male' | 'female'

    @Column({nullable:false})
    @IsNotEmpty()
    @IsDate()
    birthDate !:Date

    @OneToMany(()=>Orders , (Orders)=>Orders.employee ,{ onDelete: "CASCADE" ,onUpdate:"CASCADE"})
    orders !:Orders[]
}