const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la planta es obligatorio"], // Mensaje personalizado
    trim: true // Elimina espacios en blanco al inicio/final
  },
  tipo: {
    type: String,
    required: [true, "El tipo de planta es obligatorio"],
    enum: ["Interior", "Exterior", "Suculenta", "Floral"] // Valores permitidos
  },
  frecuenciaRiego: {
    type: String,
    required: true,
    enum: ["Diario", "Semanal", "Quincenal", "Mensual"] // ← Solo permite estos valores
  },
  ultimoRiego: {
    type: Date,
    default: Date.now // Fecha actual por defecto
  },
  usuario: { // Relación con el modelo User (para JWT)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true }); // Añade createdAt y updatedAt automáticamente

module.exports = mongoose.model("Plant", PlantSchema);