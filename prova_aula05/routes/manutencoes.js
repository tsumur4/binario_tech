const express = require('express');
const router = express.Router();

// Simulador de banco de dados
const manutencoes = [
  { id: 1, placa: 'XYZ-9876', descricao: 'Troca de óleo e filtros', Valor: 'R$300' }
];

// GET /api/v1/manutencoes
router.get('/', (req, res) => {
  res.status(200).json({
    sucesso: true,
    dados: manutencoes
  });
});

// POST /api/v1/manutencoes
router.post('/', (req, res) => {
  const { placa, descricao } = req.body;

  if (!placa || !descricao) {
    return res.status(400).json({
      error: 'Requisição Inválida',
      message: 'Os campos "placa" e "descricao" são obrigatórios.'
    });
  }

  const novaManutencao = {
    id: manutencoes.length + 1,
    placa,
    descricao,
    status: 'Pendente'
  };

  manutencoes.push(novaManutencao);

  res.status(201).json({
    sucesso: true,
    mensagem: 'Manutenção agendada com sucesso!',
    dados: novaManutencao
  });
});

module.exports = router;

