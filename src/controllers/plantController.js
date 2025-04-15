const Plant = require('../models/plantModels');

// 🔸 Crear nueva planta
exports.crearPlanta = async(req, res) => {
    try {
        const { nombre, tipo, frecuenciaRiego, ultimoRiego, descripcion, luzRequerida, temperaturaIdeal, humedadIdeal, notas } = req.body;

        // Verificamos que venga el usuario desde el token (lo mete el authMiddleware)
        const usuario = req.userId;

        const nuevaPlanta = new Plant({
            nombre,
            tipo,
            frecuenciaRiego,
            ultimoRiego,
            descripcion,
            luzRequerida,
            temperaturaIdeal,
            humedadIdeal,
            notas,
            usuario
        });

        const plantaGuardada = await nuevaPlanta.save();
        res.status(201).json(plantaGuardada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la planta', error: error.message });
    }
};

// 🔹 Obtener todas las plantas del usuario logueado
exports.obtenerPlantas = async(req, res) => {
    try {
        const plantas = await Plant.find({ usuario: req.userId }); // Solo las del usuario
        res.json(plantas);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener plantas', error: error.message });
    }
};

// 🔹 Obtener una planta por ID (si es del usuario)
exports.obtenerPlantaPorId = async(req, res) => {
    try {
        const planta = await Plant.findOne({ _id: req.params.id, usuario: req.userId });
        if (!planta) return res.status(404).json({ mensaje: 'Planta no encontrada' });
        res.json(planta);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar la planta', error: error.message });
    }
};

// 🔸 Actualizar una planta
exports.actualizarPlanta = async(req, res) => {
    try {
        const plantaActualizada = await Plant.findOneAndUpdate({ _id: req.params.id, usuario: req.userId },
            req.body, { new: true }
        );

        if (!plantaActualizada) return res.status(404).json({ mensaje: 'Planta no encontrada' });
        res.json(plantaActualizada);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar planta', error: error.message });
    }
};

// 🔻 Eliminar una planta
exports.eliminarPlanta = async(req, res) => {
    try {
        const plantaEliminada = await Plant.findOneAndDelete({ _id: req.params.id, usuario: req.userId });
        if (!plantaEliminada) return res.status(404).json({ mensaje: 'Planta no encontrada' });
        res.json({ mensaje: 'Planta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar planta', error: error.message });
    }
};