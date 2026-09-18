const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ erro: "Acesso negado. Token não informado." });
  }

  try {
    // Usar a mesma chave fallback do server.js
    const SECRET = process.env.JWT_SECRET || 'binario_tech_exame_2026_secreto';
    const usuario = jwt.verify(token, SECRET);
    req.usuario = usuario;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado." });
  }
};