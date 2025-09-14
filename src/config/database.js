import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practica-mongoose");
    console.log(' Conectamos con mongo');
  } catch (error) {
    console.error('No se pudo conectar a mongo:', error.message);
  }
};

export default connectDB;