import mongoose from "mongoose";
import dotenv from "dotenv";
import users from './data/users.js';
import products from './data/products.js';
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData =async()=>{
    try{
       
        //remove exists data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        //start to insert data 
        const createUsers =await User.insertMany(users);

        const adminUser = createUsers[0]._id;

        const sampleProducts = products.map((product)=>{
            return { ...product,user:adminUser};
        });

        await Product.insertMany(sampleProducts);

        console.log('Data Imported !');
        process.exit();
    }catch(error){
        console.log(`${error}`);
        process.exit(1);
    }
} // importData

const destroyData=async()=>{
    try{
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        process.exit();
    }catch(error){
        console.log(`${error}`);
        process.exit(1);
    }

    
};

if(process.argv[2]=== '-d'){
    destroyData();
}else{
    importData();
}