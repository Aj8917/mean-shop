import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended :true}));

//cookie parser middleware 
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

const __dirname =path.resolve();
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


app.use(notFound);
app.use(errorHandler);
connectDB();

app.get('/', (req, res) => {
    res.send('API server is running....');
});

app.listen(port, () => console.log(`Server running on port ${port}`));