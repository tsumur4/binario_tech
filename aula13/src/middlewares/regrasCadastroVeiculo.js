const { body } = require('express-validator');

const regrasCadastroVeiculo = [
  //exercicio1
  body('placa')
    .notEmpty().withMessage('A placa é obrigatória.')
    .isString()
    .toUpperCase(),

  //exercicio2
  body('anoFabricacao')
    .optional({ nullable: true, checkFalsy: true })
    .isInt({ min: 2000, max: new Date().getFullYear() })
    .withMessage(`O ano de fabricação deve ser um número inteiro entre 2000 e ${new Date().getFullYear()}.`)
];

module.exports = regrasCadastroVeiculo;
