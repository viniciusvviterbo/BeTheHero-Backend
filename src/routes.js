// Importa o módulo 'express' para lidar com requisições do servidor
const express = require('express');

// Importa o arquivo 'ong_controller.js' para utilizar dos métodos da controller de 'Ongs'
const ongs_controller = require('./controllers/ongs_controller');
// Importa o arquivo 'ong_controller.js' para utilizar dos métodos da controller de 'Casos'
const casos_controller = require('./controllers/casos_controller');
// Importa o arquivo 'perfil_conroller.js' para utiliar dos métodos da controller do conceito de Perfil
const perfil_controller = require('./controllers/perfil_controller');
// Importa o arquivo 'sessao_conroller.js' para utiliar dos métodos da controller do conceito de Sessão
const sessao_controller = require('./controllers/sessao_controller');

// Instancia express.Router() em routes
const routes = express.Router();

// Controller - Sessao
routes.post('/sessao', sessao_controller.create);

// Controller - Ong
routes.get('/ongs', ongs_controller.list); // Redireciona a requisição para o método de listagem de 'Ong'
routes.post('/ongs', ongs_controller.create); // Redireciona a requisição para o método de criação de instâncias de 'Ong' 

// Controller - Perfil
routes.get('/perfil', perfil_controller.list); // Redireciona a requisição para o método de listagem da controller de perfis

// Controller - Casos
routes.get('/casos', casos_controller.list); // Redireciona a requisição para o método de listagem de 'Casos'
routes.post('/casos', casos_controller.create); // Redireciona a requisição para o método de criação de instancia de 'Caso'
routes.delete('/casos/:id', casos_controller.delete); // Redireciona a requisição para o método de deleçã do caso especificado

// Exporta as rotas aqui explicitadas como 'routes'
module.exports = routes;