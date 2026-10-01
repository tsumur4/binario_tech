const validarContentTypeJson = (req, res, next) => {
  if (req.method === 'POST') {
    if (!req.is('application/json')) {
      return res.status(400).json({
        error: 'Bad Request',
        mensagem: 'O cabeçalho Content-Type deve ser application/json para requisições POST.'
      });
    }
  }
  next();
};

module.exports = validarContentTypeJson;
