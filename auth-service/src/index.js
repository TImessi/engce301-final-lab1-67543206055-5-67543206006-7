require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/api/auth/health', (_, res) => res.json({ status:'ok', service:'auth-service' }));

app.listen(PORT, () => console.log(`[auth-service] Running on port ${PORT}`));