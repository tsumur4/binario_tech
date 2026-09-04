module.exports = (req, res, next) => {
  const { vin } = req.body;

  if (!vin || typeof vin !== 'string' || vin.trim().length !== 12) {
    return res.status(400).json({ 
      erro: "O código VIN é obrigatório e deve conter exatamente 12 caracteres." 
    });
  }

  next();
};
