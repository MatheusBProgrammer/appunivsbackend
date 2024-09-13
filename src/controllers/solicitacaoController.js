const Solicitacao = require("../models/Solicitacao"); // Importando o modelo de solicitação

// Função para criar uma nova solicitação de manutenção
const createSolicitacao = async (req, res) => {
  try {
    const { usuario, setor, descricao_problema, prioridade } = req.body;

    // Cria uma nova solicitação
    const newSolicitacao = new Solicitacao({
      usuario,
      setor,
      descricao_problema,
      prioridade,
    });

    await newSolicitacao.save(); // Salvar no banco de dados

    res.status(201).json({
      message: "Solicitação criada com sucesso",
      solicitacao: newSolicitacao,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar solicitação", error });
  }
};

// Função para atualizar o status de uma solicitação
const updateSolicitacaoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, data_conclusao } = req.body;

    // Atualiza o status da solicitação
    const solicitacao = await Solicitacao.findByIdAndUpdate(
      id,
      { status, data_conclusao },
      { new: true }
    );

    if (!solicitacao) {
      return res.status(404).json({ message: "Solicitação não encontrada" });
    }

    res
      .status(200)
      .json({ message: "Status atualizado com sucesso", solicitacao });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar status da solicitação", error });
  }
};

// Função para listar todas as solicitações
const getSolicitacoes = async (req, res) => {
  try {
    const solicitacoes = await Solicitacao.find().populate(
      "usuario",
      "nome_completo setor"
    ); // Traz o usuário relacionado
    res.status(200).json(solicitacoes);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar solicitações", error });
  }
};

module.exports = {
  createSolicitacao,
  updateSolicitacaoStatus,
  getSolicitacoes,
};
