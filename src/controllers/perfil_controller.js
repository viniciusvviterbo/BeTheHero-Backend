// Importa o arquivo 'conexao.js' para lidar com a conexão com o banco de dados
const conexao = require('../database/conexao');

module.exports = {
    async list(req, resp) {
        // Atribui a 'ong_id' o valor de 'authorization' presente no cabeçalho da requisição
        const ong_id = req.headers.authorization;
        // Busca todos os casos vinculados a uma única ONG especificada
        const casos = await conexao('Casos')
                        .where('ong_id', ong_id).select('*');
        // Retorna a lista de objetos encontrada
        return resp.json(casos);
    }
}