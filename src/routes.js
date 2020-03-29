// Importa o módulo 'express' para lidar com requisições do servidor
const express = require('express');
// Importa do módulo 'celebrate' os valores para lidar com validação das requisições do servidor
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/ongs', celebrate({ // Utilizando desse middleware, é feita a validação desses parâmetros na requisição
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(13),
        cidade: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), ongs_controller.create); // Redireciona a requisição para o método de criação de instâncias de 'Ong' 

// Controller - Perfil
routes.get('/perfil', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),
    }).unknown()
}), perfil_controller.list); // Redireciona a requisição para o método de listagem da controller de perfis

// Controller - Casos
routes.get('/casos', celebrate({
    [Segments.QUERY]:Joi.object().keys({
        pagina: Joi.number(),
    })
}),casos_controller.list); // Redireciona a requisição para o método de listagem de 'Casos'
routes.post('/casos', casos_controller.create); // Redireciona a requisição para o método de criação de instancia de 'Caso'
routes.delete('/casos/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), casos_controller.delete); // Redireciona a requisição para o método de deleçã do caso especificado

// Exporta as rotas aqui explicitadas como 'routes'
module.exports = routes;