// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../src/models/User');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    // Crea el usuario
    const user = new User({ email, password });
    await user.save();

    // Genera el token JWT (¡agrega esto!)
    const token = jwt.sign(
      { id: user._id },               // Payload (datos del usuario)
      process.env.JWT_SECRET,         // Clave secreta (defínela en .env)
      { expiresIn: '1h' }            // Tiempo de expiración
    );

    // Respuesta con token (modifica esto)
    res.status(201).json({
      success: true,
      message: "Usuario registrado",
      token: token  // ¡Ahora el token viene en la respuesta!
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};