const express = require("express");
const app = express();
const router = require("./routes/Router");
const connectDB = require("./db/mongodb"); // Importando a conexão do banco de dados

// Middlewares
app.use(express.json());

connectDB();

// Definição de rotas
app.use("/api", router);

module.exports = app;
