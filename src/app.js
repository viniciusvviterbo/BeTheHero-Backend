// Importa o módulo 'express' para lidar com requisições do servidor
const express = require('express');
// Importa o módulo 'cors' para lidar com a autorização de aplicações com permissão de usar essa API
const cors = require('cors');
// Importa do módulo 'celebrate' o valor 'errors' para tratar dos erros de requests requisitados
const { errors } = require('celebrate');
// Importa o arquivo routes.js. Os caracteres './' antes do nome do arquivo e sem a extensão indicam que é um arquivo local e não um módulo
const routes = require('./routes')

// Instancia o módulo 'express'
const app = express();

// Informa quais os endereços com autorização de utilizar essa API
app.use(cors()); // Explicitados desse modo, qualquer aplicação consegue acessar a API
// Informa que o servidor receberá requisições no formato JSON
app.use(express.json());
// Informa o uso das rotas estabelecidas no arquivo ./routes.js
app.use(routes);
// Instrui no uso do módulo 'celebrate' para tratar corretamente dos erros das requisições
app.use(errors());


module.exports = app;