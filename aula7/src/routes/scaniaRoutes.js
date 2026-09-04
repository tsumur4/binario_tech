const express = require('express');
const router = express.Router();
const scaniaController = require('../controllers/scaniaController');
const validaVin = require('../middlewares/validaVin'); // Importação do middleware

// Aplicação do middleware exclusivamente na rota POST
router.post('/', validaVin, scaniaController.adicionarCaminhao);

// Demais rotas
router.get('/', scaniaController.listarFrota);
router.get('/:id', scaniaController.buscarPorId);
router.put('/:id', scaniaController.atualizarCaminhao);
router.delete('/:id', scaniaController.deletarCaminhao);

module.exports = router;
