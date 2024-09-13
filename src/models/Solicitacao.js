const mongoose = require("mongoose");

const solicitacaoSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  descricao_problema: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Aberta", "Em Andamento", "Concluída"],
    default: "Aberta",
  },
  prioridade: {
    type: String,
    enum: ["Baixa", "Média", "Alta"],
    default: "Média",
  },
  data_criacao: {
    type: Date,
    default: Date.now,
  },
  data_conclusao: {
    type: Date,
  },
});

module.exports = mongoose.model("Solicitacao", solicitacaoSchema);
