const bcrypt = require("bcrypt");
const User = require("../models/User"); // Importando o modelo de usuário

// Função para registrar um novo usuário
const registerUser = async (req, res) => {
  try {
    const { nome_completo, setor, email, senha, telefone, cargo } = req.body;

    // Verifica se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria o novo usuário e salva no MongoDB
    const newUser = new User({
      nome_completo,
      setor,
      email,
      senha: hashedPassword,
      telefone,
      cargo,
    });

    await newUser.save(); // Salvar no banco de dados

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Função para login
const loginUser = async (req, res) => {
  try {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Verifica se a senha está correta
    const isMatch = await bcrypt.compare(senha, user.senha);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Função para obter todos os usuários (para fins de teste)
const getUsers = async (req, res) => {
  try {
    const users = await User.find(); // Busca todos os usuários no banco de dados
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
