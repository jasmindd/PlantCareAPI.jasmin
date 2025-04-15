const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "El nombre de la planta es obligatorio"],
        trim: true
    },
    tipo: {
        type: String,
        required: [true, "El tipo de planta es obligatorio"],
        enum: ["Interior", "Exterior", "Suculenta", "Floral"]
    },
    frecuenciaRiego: {
        type: String,
        required: true,
        enum: ["Diario", "Semanal", "Quincenal", "Mensual"]
    },
    ultimoRiego: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    descripcion: {
        type: String,
        default: ""
    },
    luzRequerida: {
        type: String,
        required: [true, "La cantidad de luz requerida es obligatoria"]
    },
    temperaturaIdeal: {
        type: String,
        default: ""
    },
    humedadIdeal: {
        type: String,
        default: ""
    },
    notas: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Plant", PlantSchema);