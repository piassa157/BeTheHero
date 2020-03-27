
exports.up = function(knex) {
    return knex.schema.createTable('indices', function(table){
        table.increments();

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();


        table.string('ong_id').notNullable();    

        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('indices');
};
