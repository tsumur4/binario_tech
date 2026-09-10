const express = require('express');
const cors = require('cors');
const veiculosRoutes = require('./src/routes/veiculosRoutes');

const app = express();
const PORT = 3019;

app.use(cors());
app.use(express.json());

app.use('/api/v1/veiculos', veiculosRoutes);

app.use((req, res) => {
	res.status(404).json ({ erro: "Rota nao encontrada no servidor binario tech." });
	});

app.listen(PORT, () => { 
	console.log(`[Binario tech] Servidor com Banco SQLite ativo na porta ${PORT}`);
});
