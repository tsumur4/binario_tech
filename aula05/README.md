Aula 05 — Middlewares e segurança básica
Preparação:

cd ~/binario_tech && mkdir -p aula05/routes aula05/middlewares && cd aula05
npm init -y
npm install express cors
Estrutura montada: middlewares/logger.js (log de método/rota/status/duração), middlewares/auth.js (exige o header X-API-KEY: binario-tech-secret-2026) e routes/motoristas.js, unidos no app.js com cors(), express.json(), o logger global e um handler 404 no final.

node app.js &
curl -s http://localhost:3013/api/v1/health | jq .
curl -s http://localhost:3013/api/v1/motoristas | jq .                                   # sem chave -> 401
curl -s -H "X-API-KEY: binario-tech-secret-2026" http://localhost:3013/api/v1/motoristas | jq .   # com chave -> 200
✅ já no código — logger, auth e a rota de motoristas com validação estão implementados.

Exercício 1 — conferir o log da rota /health

curl -s http://localhost:3013/api/v1/health | jq .
No terminal onde o servidor está rodando aparece uma linha assim:

[LOG 2026-08-07T13:12:00.000Z] GET /api/v1/health - Status: 200 (2ms)
Exercício 2 — routes/manutencoes.js

const express = require('express');
const router = express.Router();
let manutencoes = [];

router.get('/', (req, res) => res.status(200).json(manutencoes));
router.post('/', (req, res) => {
  const { veiculo, descricao, valor } = req.body;
  if (!veiculo || !descricao || !valor) {
    return res.status(400).json({ erro: "Campos obrigatórios ausentes." });
  }
  const nova = { id: manutencoes.length + 1, veiculo, descricao, valor };
  manutencoes.push(nova);
  res.status(201).json(nova);
});
module.exports = router;
✅ já no código — arquivo novo, não mexe em nada do que já existia.

Teste isolado (array próprio, manutencoes, separado do array de motoristas — não interfere nos outros exercícios):

curl -s -H "X-API-KEY: binario-tech-secret-2026" -X POST http://localhost:3013/api/v1/manutencoes \
  -H "Content-Type: application/json" \
  -d '{"veiculo":"SCA-0001","descricao":"Troca de oleo","valor":350}' | jq .
curl -s -H "X-API-KEY: binario-tech-secret-2026" http://localhost:3013/api/v1/manutencoes | jq .
Exercício 3 — registrar /api/v1/manutencoes com authMiddleware

Adicionar dentro de app.js, junto do outro app.use de rota já existente:

// ------- CÓDIGO ANTIGO (já existe) -------
const motoristasRouter = require('./routes/motoristas');
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);

// ------- CÓDIGO NOVO (adicionar aqui) -------
const manutencoesRouter = require('./routes/manutencoes');
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);
✅ já no código — a rota exige a mesma chave X-API-KEY das outras (mostrado no teste do exercício 2 acima).

Exercício 4 — middlewares/validaCnh.js

function validaCnh(req, res, next) {
  const { cnh } = req.body;
  if (!cnh || !/^\d{11}$/.test(cnh)) {
    return res.status(400).json({ erro: "A CNH deve conter exatamente 11 dígitos numéricos." });
  }
  next();
}
module.exports = validaCnh;
✅ já no código.

Exercício 5 — aplicar validaCnh no POST de motoristas e testar CNH inválida

Dentro de routes/motoristas.js, importar o middleware e encadeá-lo na rota já existente:

// ------- CÓDIGO ANTIGO (já existe) -------
const express = require('express');
const router = express.Router();

// ------- CÓDIGO NOVO (adicionar) -------
const validaCnh = require('../middlewares/validaCnh');

// ------- CÓDIGO ANTIGO (a linha do POST já existia, só ganha o novo middleware no meio) -------
router.post('/', validaCnh, (req, res) => { /* ... lógica de cadastro já existente ... */ });
curl -i -X POST http://localhost:3013/api/v1/motoristas \
  -H "X-API-KEY: binario-tech-secret-2026" -H "Content-Type: application/json" \
  -d '{"nome":"Teste","cnh":"123","categoria":"B"}'
Resultado esperado: 400 Bad Request. ✅ já no código.

Exercício 6 — rota inexistente → 404 padronizado

curl -s http://localhost:3013/api/v1/clientes | jq .
Resultado esperado: {"erro":"Endpoint nao encontrado no servidor Binario Tech."}.

Exercício 7 — script teste_seguranca.sh

3 tentativas sem chave (401) + 1 tentativa com chave válida (200), tudo salvo em audit_seguranca.log:

bash teste_seguranca.sh
cat audit_seguranca.log
✅ já no código.

Exercício 8 — encontrar e matar o processo

ps aux | grep node
kill -9 <PID>
