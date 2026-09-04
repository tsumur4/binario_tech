function authMiddleware(req, res, next) {
	// Utilize req.headers (no plural) para acessar o objeto de cabeçalhos
	const apiKey = req.headers['x-api-key'];
	const CHAVE_VALIDA = "binario-tech-secret-2026";

	if (!apiKey || apiKey !== CHAVE_VALIDA) {
		return res.status(401).json({
			erro: "Acesso nao autorizado. Header 'X-API-KEY' invalido ou ausente."
		});
	}

	next();
}

module.exports = authMiddleware;
