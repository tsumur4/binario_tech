const express = require('express');
const cors = require('cors');
const scaniaRoutes = require('./src/routes/scaniaRoutes');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// LOgger de requisicoes
app.use((req, res, next) => {
	console.log(`[${new Date().toISOString()}] ${req.method} em ${req.url}`);
	next();
});

//agrupamento de rotas por montadora
app.use('/api/v1/telemetria/scania', scaniaRoutes);

//rota 404
app.use((req, res) => {
	res.status(404).json({ erro: "Modulo ou rota de telemetria nao encontrada." });
});

app.listen(PORT, () => {
	console.log(`[BInario Tech] Servidor modularizado ativo na porta ${PORT}`);
});

