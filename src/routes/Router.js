const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const solicitacaoRoutes = require("./solicitacaoRoutes");

// Rotas de usuários (funcionários dos setores)
router.use("/users", userRoutes);

// Rotas de administradores (você e outros funcionários de TI)
router.use("/admins", adminRoutes);

// Rotas de solicitações de manutenção
router.use("/solicitacoes", solicitacaoRoutes);

module.exports = router;
