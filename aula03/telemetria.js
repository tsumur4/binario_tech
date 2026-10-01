const express = require('express');
const app = express();
const PORT = 3019;

app.use(express.json());

//rota scania
app.get('/api/v1/scania', (req, res) => {
	res.json({ montadora: "Scania", modelo: "R450", status: "OK", conexao: true, velocidade_media: 82  });
});

//rota mercedes
app.get('/api/v1/mercedes', (req, res) => {
        res.json({ montadora: "Mercedes-Bens", modelo: "Actros", status: "OK", conexao: true, velocidade_media: 78  });
});     

//rota VolksWagen
app.get('/api/v1/vw', (req, res) => {
	res.json ({ montadora: "VolksWagen", modelo: "Delivery", status: "ALERTA", conexao: false, velocidade_media: 0 });
});

app.get('/api/v1/volvo', (req, res) => {
        res.json ({ montadora: "Volvo", modelo: "FH 540", status: "OPERACIONAL", conexao: true, velocidade_media: 80 });
});

app.listen(PORT, () => {
	console.log(`[Binario Tech] Servidor de telemetria rodando em http://localhost:${PORT}`);
});



