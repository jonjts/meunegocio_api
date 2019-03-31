'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddEmailInClientsSchema extends Schema {
  up () {
    this.table('clients', (table) => {
      table.string('email');
    })
  }

  down () {
    this.table('clients', (table) => {
      table.dropColumn('email');
    })
  }
}

module.exports = AddEmailInClientsSchema
