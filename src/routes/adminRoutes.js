const express = require("express");
const router = express.Router();
const {
  registerAdmin,
  getAdmins,
  loginAdmin,
} = require("../controllers/adminController");

// Rota para listar todos os administradores (para fins de teste)
router.get("/", getAdmins);

// Rota para registrar um novo administrador
router.post("/register", registerAdmin);

// Rota para login de administrador
router.post("/login", loginAdmin);

module.exports = router;
