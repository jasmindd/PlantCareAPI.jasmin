const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Rutas protegidas con el middleware verifyToken
router.post("/", verifyToken, plantController.crearPlanta);
router.get("/", verifyToken, plantController.obtenerPlantas);
router.get("/:id", verifyToken, plantController.obtenerPlantaPorId);
router.put("/:id", verifyToken, plantController.actualizarPlanta);
router.delete("/:id", verifyToken, plantController.eliminarPlanta);

module.exports = router;
