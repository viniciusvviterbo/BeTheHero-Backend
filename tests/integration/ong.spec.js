const request = require('supertest');
const app = require('../../src/app');
const conexao = require('../../src/database/conexao');

describe('ONG', () => {
    beforeEach(async () => {
        await conexao.migrate.rollback();
        await conexao.migrate.latest();
    });

    afterAll(async () => {
        await conexao.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            nome: "ONG",
            email: "contato@ong.com.br",
            whatsapp: "31999999999",
            cidade: "Belo Horizonte",
            uf: "MG"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});