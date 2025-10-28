const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const cron = require('node-cron');
const axios = require('axios'); // <-- Importamos Axios

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('API Running');
});

app.get('/ping', (req, res) => {
  res.status(200).send('Pong');
});

// Cron-job de prueba: llama al endpoint /ping cada minuto
cron.schedule('* * * * *', async () => {
  try {
    const response = await axios.get(`https://cron-job-c9zm.onrender.com/ping`);
    console.log('🔄 Cron ejecutado:', new Date().toLocaleString(), '| Response:', response.data);
  } catch (err) {
    console.error('❌ Error en cron:', err.message);
  }
});

// Connect to DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
