const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Conectar ao MongoDB usando o link fornecido
    const conn = await mongoose.connect(
      "mongodb+srv://matheusaraujo:gNHw7ygg0Kp6HyLb@cluster0.pvwb5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Sair com erro
  }
};

module.exports = connectDB;
