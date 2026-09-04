function validaCnh(req, res, next) {
	const { cnh } = req.body;
	const cnhTexto = String(cnh || '').trim();

	// Expressão regular que verifica se há exatamente 11 dígitos numéricos
	const cnhValida = /^\d{11}$/.test(cnhTexto);

	if (!cnh || !cnhValida) {
		return res.status(400).json({
			erro: "CNH inválida. O campo 'cnh' é obrigatório e deve conter exatamente 11 dígitos numéricos."
		});
	}

	next();
}

module.exports = validaCnh;
