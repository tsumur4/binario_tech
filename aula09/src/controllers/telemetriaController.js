const db = require('../database/connection');

const telemetriaController = {
	//cadastrar nova leitura temeltria associada a um veiculo
	registrarLeitura: async (req, res) => {
		try {
			const { veiculo_id, velocidade, temperatura_motor } = req.body;
			if (!veiculo_id || velocidade === undefined || temperatura_motor === undefined) {
				return res.status(400).json({ erro: "Campos 'veiculo_id', 'velocidade' e 'temperatura_motor' são obrigatorios." });
			}

			const veiculoExiste = await db('veiculos').where({ veiculo_id }).first();
			if (!veiculosExiste) {
				return res.status(404).json({ erro: "Veiculo informado ao existe banco de dados." });
			}

			const [id] = await db('telemetria').insert({
				veiculo_id,
				velocidade,
				temperatura_motor
			});

			res.status(201).json({ id, veiculo_id, velocidade, temperatura_motor, mensagem: "Leitura registrada o sucesso!" });
		} catch (erro) {
			res.status(500).json({ erro: "Erro ao registrar telemetria no banco de dados." });
		}
	},

	//listar todas as leitura com dados do veicul (INNER JOIN)
	listarRelatorioCompleto: async(req, res) => {
		try {
			const relatiorio = await db('telemetria')
				.join('veiculos', 'veiculos_id', '=', 'telemetria.veiculo_id')
				.select( 'telemetria.id as telemtria_id',
				'veiculos.placa',
				'veiculos.montadora',
				'veiculos.modelo',
				'telemetria.velocidade',
				'telemetria.temperatura_motor',
				'telemetria.capturado_em'
			);

			res.status(200).json(relatorio);
		} catch (erro) {
			res.status(500).json({ erro: "Erro ao gerar relatorio com inner join." });
		}
	}
};

module.exports = telemetriaController;

