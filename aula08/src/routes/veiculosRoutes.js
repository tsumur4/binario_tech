const express = require('express');
const router = express.Router();
const veiculosController = require('../controllers/veiculosController');

router.get('/', veiculosController.listarTodos);
router.post('/', veiculosController.criar);

// Rota PATCH adicionada para atualizar o status do veículo por ID
router.patch('/:id/status', veiculosController.atualizarStatus);

module.exports = router;
