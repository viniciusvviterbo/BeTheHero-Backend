// Ao executar a migration, cria a tabela 'Ongs'
exports.up = function(knex) {
    return knex.schema.createTable('Ongs', function(table) {
        // Chave primária
        table.string('id').primary();
        // Demais atributos
        table.string('nome').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('cidade').notNullable();        
        table.string('uf', 2).notNullable();        
    });
};

// Ao executar o down da migration, derruba a tabela 'Ongs'
exports.down = function(knex) {
    return knex.schema.dropTable('Ongs');
};
