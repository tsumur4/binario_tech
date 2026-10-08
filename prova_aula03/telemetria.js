const express = require('express');
const app = express();
const PORT = 3019;

app.use(express.json());

app.get('/api/v1/scania', (req, res) => {
	res.json ({ montadora: "scania", modelo: "R440", status: "OK", conexao: true, velocidade_media: 67 
	});
});

app.get('/api/v1/mercedes', (req, res) => {
	res.json({ montadora: "mercedes", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 42 });
});

app.get('/api/v1/vw', (req, res) => {
	res.json ({ montadora: "Volkswagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0
	});
});

app.get('/api/v1/volvo', (req, res) => {
        res.json ({ montadora: "Volvo", modelo: "FH 540", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.listen(PORT, () => {
	console.log(`servidor rodando em: http://localhost:${PORT}`);
});
