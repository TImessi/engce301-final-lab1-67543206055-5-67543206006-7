require('dotenv').config();
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`[task-service] Running on port ${PORT}`));