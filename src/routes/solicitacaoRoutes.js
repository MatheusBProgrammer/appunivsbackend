const express = require("express");
const router = express.Router();
const {
  createSolicitacao,
  updateSolicitacaoStatus,
  getSolicitacoes,
} = require("../controllers/solicitacaoController");

// Rota para criar uma nova solicitação de manutenção
router.post("/", createSolicitacao);

// Rota para atualizar o status de uma solicitação
router.put("/:id", updateSolicitacaoStatus);

// Rota para listar todas as solicitações
router.get("/", getSolicitacoes);

module.exports = router;
