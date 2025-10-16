const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/users.routes'); 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/plantarte_db';
mongoose.connect(mongoUri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err.message));

app.use('/api/products', productRoutes); 
app.use('/api/auth', authRoutes); 
app.use('/api/users', usersRoutes); 


app.get('/', (req, res) => {
    res.send('API de PlantArte funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor de API en el puerto ${PORT}`);
});