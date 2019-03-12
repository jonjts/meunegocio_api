'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ClientSchema extends Schema {
  up () {
    this.create('clients', (table) => {
      table.increments();
      table.string('name')
        .notNullable();
      table.integer('rg');
      table.string('cpf');
      table.integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    })
  }

  down () {
    this.drop('clients')
  }
}

module.exports = ClientSchema
