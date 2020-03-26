// Importa o arquivo 'conexao.js' para lidar com a conexão com o banco de dados
const conexao = require('../database/conexao');

module.exports = {
    async create(req, resp) {
        // Armazena o valor de identificação da ONG a iniciar sessão
        const { id } = req.body;
        // Armazena atributo 'nome' da instância de 'Ong' que possui o id referênciado 
        const ong = await conexao('Ongs')
                    .where('id', id)
                    .select('nome').first();
        // Caso a instância de ONG requisitada não exista, levanta um erro
        if(!ong) return resp.status(400).json({ error: 'No ong found with this ID.' })
        // Na não ocorrência de erros, são retornados os dados da ONG que iniciará a sessão 
        return resp.json(ong);
    }
}