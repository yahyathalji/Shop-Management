import dotenv from 'dotenv';

dotenv.config();

module.exports ={
    development :{
        port : process.env.PORT ,
        database :process.env.DEV_DB_DATABASE,
        username: process.env.DEV_DB_USERNAME,
        password : process.env.DEV_DB_PASSWORD,
        dilaect : process.env.DEV_DIALECT,
        logging :true
    }
}