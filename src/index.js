const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();
app.use(express.json());

// Importar rutas correctamente (según nombres reales de archivos)
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantRoutes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('🟢 Conectado a MongoDB');
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));
