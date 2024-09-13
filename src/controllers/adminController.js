const bcrypt = require("bcrypt");
const Admin = require("../models/Admin"); // Importando o modelo de administrador

// Função para registrar um novo administrador
const registerAdmin = async (req, res) => {
  try {
    const { nome_completo, email, senha, telefone } = req.body;

    // Verifica se o administrador já existe
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo administrador e salva no MongoDB
    const newAdmin = new Admin({
      nome_completo,
      email,
      senha: hashedPassword,
      telefone,
    });

    await newAdmin.save(); // Salvar no banco de dados

    // Ocultar a senha no retorno
    newAdmin.senha = undefined;

    res
      .status(201)
      .json({ message: "Admin registered successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error registering admin", error });
  }
};

// Função para login de administrador
const loginAdmin = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o administrador existe
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(senha, admin.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Ocultar a senha no retorno
    admin.senha = undefined;

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Função para obter todos os administradores (para fins de teste)
const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-senha"); // Não retorna a senha
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Error fetching admins", error });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdmins,
};
