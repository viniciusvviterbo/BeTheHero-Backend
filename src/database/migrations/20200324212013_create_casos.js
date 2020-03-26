// Ao executar a migration, cria a tabela 'Casos'
exports.up = function(knex) {
    return knex.schema.createTable('Casos', function(table) {
        // Chave Primária
        table.increments();
        // Demais atributos
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();
        // Chave estrangeira
        table.string('ong_id').notNullable();
        // Cria o vínculo da chave primária em 'Ongs' com a chave estrangeira 'ong_id'
        table.foreign('ong_id').references('id').inTable('Ongs');
    });
};

// Ao executar o down da migration, derruba a tabela 'Casos'
exports.down = function(knex) {
    return knex.schema.dropTable('Casos');
};
