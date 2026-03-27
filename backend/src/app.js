require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:4200', // أو '*'
    methods: ['GET','POST','PATCH','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/api', require('../src/routes/routes'));

app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

module.exports = app;