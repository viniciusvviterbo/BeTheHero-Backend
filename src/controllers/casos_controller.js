// Importa o arquivo 'conexao.js' para lidar com a conexão com o banco de dados
const conexao = require('../database/conexao');

module.exports = {
    async list(req, resp) {
        // Armazena o valor enviado como query pela requisição para saber a numeração da página pedida. Tem como valor padrão '1'
        const {pagina = 1} = req.query;
        // Armazena o valor total de casos no banco de dados
        const [contador] = await conexao('Casos').count();
        // Executa uma busca de todos os registros na tabela 'Casos'. 
        // Com a paginação, cada retorno possui um limite de 5 instâncias. 'offset' configura o passo de paginação em (pagina-1)*5 (no caso, a página 1 retorna os casos 1-5, a página 2 retorna 6-10, etc).
        // Agrega-se ao retorno de cada caso o registro da ONG responsável.
        const casos = await conexao('Casos')
                        .join('Ongs', 'ong_id', '=', 'Ongs.id')
                        .limit(5)
                        .offset((pagina - 1) * 5)
                        .select('Casos.*', 'Ongs.nome', 'Ongs.email', 'Ongs.whatsapp', 'Ongs.cidade', 'Ongs.uf');
        // Adiciona ao cabeçalho da resposta ao client o número total de casos no banco de dados
        resp.header('X-Total-Count', contador['count(*)']);
        // Retorna a listagem encontrada
        return resp.json(casos);
    },

    async create(req, resp) {
        // Atribui cada dado recebido pela requisição ao nome de variável correspondente para acesso nesse escopo
        const {titulo, descricao, valor} = req.body;
        // Atribui a 'ong_id' o valor de 'authorization' presente no cabeçalho da requisição
        const ong_id = req.headers.authorization;
        // A execução desse comando de criação de caso retorna um array com as posições de toda as instâncias criadas. Como apenas um é criado, sua posicao é armazenada em 'id', o primeiro do array retornado
        const [id] = await conexao('Casos').insert({
            titulo,
            descricao,
            valor,
            ong_id,
        });
        // Retorna a chave obtida como objeto JSON 
        return resp.json({ id })
    },

    async delete(req, resp) {
        // Armazena o valor de identificação do caso a ser deletado
        const { id } = req.params;
        // Atribui a 'ong_id' o valor de 'authorization' presente no cabeçalho da requisição
        const ong_id = req.headers.authorization;
        // Armazena o primeiro resultado da busca de casos onde 'id' é o mesmo informado e existe uma relação com a ong requisitora 
        const caso = await conexao('Casos')
                        .where('id', id)
                        .select('ong_id')
                        .first();
        // Caso o 'caso' retornado não for pertencente à requerente, retorna-se o erro 401 - Unauthorized
        if(caso.ong_id != ong_id) return resp.status(401).json({ error: 'Operation not permitted.' });
        // Caso não sejam levantados erros, 'caso' é deletado
        await conexao('Casos')
            .where('id', id).delete();
        // Dá um retorno vazio quando a operação é concluída
        return resp.status(204).send();
    }
};