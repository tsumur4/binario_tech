const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middlewares/logger');
const authMiddleware = require('./middlewares/auth');
const motoristasRouter = require('./routes/motoristas');
const manutencoesRouter = require('./routes/manutencoes');

const app = express();
const PORT = 3019;

//middleware globais
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

//rota publica
app.get('/api/v1/health', (req, res) => {
	res.status(200).json({ status: "ONLINE", aplicacao: "Binario Tech API v2"
	});
});

//rotas protegidas por autenticacao
app.use('/api/v1/motoristas', authMiddleware, motoristasRouter);
app.use('/api/v1/manutencoes', authMiddleware, manutencoesRouter);

//middleware global de tratamento de erros 404 (rota nao encontrada)
app.use((req, res) => {
	res.status(404).json({ erro: "Endpoint nao encontrado no servidor Binario Tech."});
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de Middlewares ativo na porta ${PORT}`);
});
