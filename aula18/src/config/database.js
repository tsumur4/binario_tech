const mongoose = require('mongoose');

const conectarBanco = async () => {
  try {
	  await mongoose.connect('mongodb://127.0.0.1:27017/binario_tech_prova');
    console.log('MongoDB conectado com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
  }
};

module.exports = conectarBanco;
