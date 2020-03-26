// Importa o módulo 'crypo' (usado para criptografia) para lidar com a geração aleatória do if das Ongs
const crypto = require('crypto');
// Importa o arquivo 'conexao.js' para lidar com a conexão com o banco de dados
const conexao = require('../database/conexao');

module.exports = {
    async list(req, resp) {
        // Executa uma busca de todos os registros na tabela 'Ongs'
        const ongs = await conexao('Ongs').select('*');
        // Retorna a listagem encontrada
        return resp.json(ongs);
    },

    async create(req, resp) {
        // Atribui cada dado recebido pela requisição ao nome de variável correspondente para acesso nesse escopo
        const {nome, email, whatsapp, cidade, uf} = req.body;
        // Gera aleatoriamente 4 bytes de caracteres que é convertido para hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');
        // Insere na tabela 'Ongs' do banco de dados os valores recebidos pela requisição. Os valores estão na mesma ordem que a declaração das colunas na tabela
        // Como existe o comanto 'await' antes da execução do comando, a assincronicidade da função é suspensa até o término de sua execução
        await conexao('Ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        })
        // Retorna o ID gerada para a ONG em questão para login
        return resp.json({ id });
    }
};