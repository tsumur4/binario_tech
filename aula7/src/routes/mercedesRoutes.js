const express = require('express');
const router = express.Router();
const mercedesController = require('../controllers/mercedesController');
const validaVin = require('../middlewares/validaVin'); // Importação do middleware

router.get('/', mercedesController.listarFrota);
router.get('/:id', mercedesController.buscarPorId);
router.post('/', validaVin, mercedesController.adicionarCaminhao); // Aplicado no POST
router.put('/:id', mercedesController.atualizarCaminhao);
router.delete('/:id', mercedesController.deletarCaminhao);

module.exports = router;
