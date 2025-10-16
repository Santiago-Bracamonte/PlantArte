const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User'); 
const bcrypt = require('bcryptjs');
const { products, users } = require('./seed');

dotenv.config({ path: './config/.env' });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conectado...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Datos existentes eliminados.');
    const hashedUsers = await Promise.all(users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
    }));


    await Product.insertMany(products);
    await User.insertMany(hashedUsers);
    console.log('Datos importados con éxito.');
    process.exit(); 
  } catch (err) {
    console.error('Error al importar datos:', err);
    process.exit(1);
  }
};

importData();