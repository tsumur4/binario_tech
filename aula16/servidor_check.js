const express = require('express');
const app = express();
const PORT = 3019;

app.use(express.json());

app.get('/api/v1/status-servidor', (req, res) => {
	res.json({
		status: "ONLINE",
		ambiente: "Servidor local de prova - binario tech",
		usuario: process.env.USER || "aluno",
		dataCheck: new Date()
	});
});

app.listen(PORT, () => {
	console.log(`[BINARIO TECH] servidor de validação da aula 16 ativo na porta ${PORT} no cloushell`);
});
