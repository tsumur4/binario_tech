require('dotenv').config();
const express = require('express');
const cors = require('cors');
const conectarBanco = require('./src/config/database'); //[cite: 7]
const alertaRoutes = require('./src/routes/alertaRoutes'); //[cite: 7] Corrigido: importado como alertaRoutes

const app = express();
const PORT = process.env.PORT || 3000; //[cite: 7]

app.use(cors()); //[cite: 7]
app.use(express.json()); //[cite: 7]

// Rotas
app.use('/api/v1/alertas', alertaRoutes); //[cite: 7]

// Conectar ao banco de dados e iniciar servidor
conectarBanco().then(() => { //[cite: 7]
	app.listen(PORT, () => {
		console.log(`[Binario Tech] Servidor NoSQL ativo na porta ${PORT}`); //[cite: 7]
	});
});
