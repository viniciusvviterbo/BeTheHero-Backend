// Importa o módulo 'knex' para lidar com a conexão com o banco de dados
const knex = require('knex');
// Importa o arquivo knexfile.js
const configuracoes = require('../../knexfile.js');

// Define como 'config' qual conexão será utilizada dependendo do ambiente
const config = process.env.NODE_ENV === 'test' ? configuracoes.test : configuracoes.development;

// Declara como 'conexao' a configuracao de conexão explicitada no arquivo 'knexfile.js' como 'development'
const conexao = knex(configuracoes.development);

// Exporta a conexão com o banco de dados como 'conexao'
module.exports = conexao;