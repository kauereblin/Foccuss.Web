require('dotenv').config();
const express = require('express');
const cors = require('cors');
const appRoutes = require('./routes/appRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', appRoutes);

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
