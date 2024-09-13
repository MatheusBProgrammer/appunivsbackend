const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  nome_completo: {
    type: String,
    required: true,
  },
  setor: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  cargo: {
    type: String,
    required: true,
  },
  status_ativo: {
    type: Boolean,
    default: true,
  },
});

// Encriptar a senha antes de salvar
userSchema.pre("save", async function (next) {
  if (this.isModified("senha")) {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
