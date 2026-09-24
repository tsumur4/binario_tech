require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3019;

app.use(express.json());

// rota de status de serviço
app.get('/api/v1/telemetria/status', (req, res) => {
	res.json({
		servico: "serviço de Telemetria Binario Tech",
		status: "OPERACIONAL",
		uptime: process.uptime(),
		pid: process.pid,
		timestamp: new Date()
	});
});

// Rota para simular falha critica / crash da aplicação
app.get('/api/v1/telemetria/crash', (req, res) => {
	console.error(`[ALERTA] Falha critica simulada pelo PID ${process.pid}`);
	res.status(500).json({ mensagem: "Simulando falha grave no processo!" });
	setTimeout(() => {
		process.exit(1); // Encerra o processo Node forçadamene
	}, 1000);
});

app.listen(PORT, () => {
	console.log(`[binario tech] microserviço ativo na porta ${PORT} (PID: ${process.pid})`);
});
