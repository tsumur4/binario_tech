// Simulação de banco de dados em memória
let frotaMercedes = [
  { id: 1, modelo: 'Actros', versao: '2651 6x4', ano: 2024, placa: 'ABC1D23', status: 'Disponível' },
  { id: 2, modelo: 'Atego', versao: '1719 4x2', ano: 2023, placa: 'XYZ9K88', status: 'Em Manutenção' }
];

module.exports = {
  // Listar todos os caminhões (com filtro opcional por modelo)
  listarFrota: (req, res) => {
    const { modelo } = req.query;
    if (modelo) {
      const filtrados = frotaMercedes.filter(c => c.modelo.toLowerCase() === modelo.toLowerCase());
      return res.status(200).json(filtrados);
    }
    return res.status(200).json(frotaMercedes);
  },

  // Buscar caminhão por ID
  buscarPorId: (req, res) => {
    const { id } = req.params;
    const caminhão = frotaMercedes.find(c => c.id === parseInt(id));

    if (!caminhão) {
      return res.status(404).json({ mensagem: 'Caminhão não encontrado.' });
    }
    return res.status(200).json(caminhão);
  },

  // Adicionar novo Actros ou Atego
  adicionarCaminhao: (req, res) => {
    const { modelo, versao, ano, placa, status } = req.body;

    if (!['Actros', 'Atego'].includes(modelo)) {
      return res.status(400).json({ mensagem: 'O modelo deve ser exclusivamente Actros ou Atego.' });
    }

    const novoCaminhao = {
      id: frotaMercedes.length + 1,
      modelo,
      versao,
      ano,
      placa,
      status: status || 'Disponível'
    };

    frotaMercedes.push(novoCaminhao);
    return res.status(201).json(novoCaminhao);
  },

  // Atualizar dados de um caminhão
  atualizarCaminhao: (req, res) => {
    const { id } = req.params;
    const index = frotaMercedes.findIndex(c => c.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ mensagem: 'Caminhão não encontrado.' });
    }

    frotaMercedes[index] = { ...frotaMercedes[index], ...req.body };
    return res.status(200).json(frotaMercedes[index]);
  },

  // Remover caminhão da frota
  deletarCaminhao: (req, res) => {
    const { id } = req.params;
    const index = frotaMercedes.findIndex(c => c.id === parseInt(id));

    if (index === -1) {
      return res.status(404).json({ mensagem: 'Caminhão não encontrado.' });
    }

    frotaMercedes.splice(index, 1);
    return res.status(204).send();
  }
};
