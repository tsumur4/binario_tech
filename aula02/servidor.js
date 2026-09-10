const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

//Rota de status dabinario tech
app.get('/status',(req, res) => {
	res.json({
		servidor: "Biario Tech Core",
		status: "OPERACIONAL",
		montadoras_atendidas: ["Scania", "Mercedes", "VW"],
		uptime_segundos: process.uptime()
	});
});

 //Rota de informações da Montadora Scania 
app.get('/scania/info', (req, res) => {
	res.json({
		montadora: "Scania",
		foco: "Caminhoes pesados e Onibus",
		sistema_telemetria: "Ativo",
		unidades_conectadas: 1420
	});
});

app.get('/vw/info', (req, res) => {
	res.json({
		montadora: "Volkswagen",
		foco: "Veículos Comerciais e Leves",
		sistema_telemetria: "Ativo",
		unidades_conectadas: "2850"
	});
});

app.listen(PORT, () => {
	console.log(`Servidor rodando com sucesso na porta ${PORT}`);
});
