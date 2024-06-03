import express from 'express';

import dotenv from 'dotenv';
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use(notFound);
app.use(errorHandler);
connectDB();

app.get('/', (req, res) => {
    res.send('API server is running....');
});

app.listen(port, () => console.log(`Server running on port ${port}`));