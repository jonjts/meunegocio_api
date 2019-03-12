'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyMemberSchema extends Schema {
  up () {
    this.create('company_members', (table) => {
      table.increments()
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('company_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('company_members')
  }
}

module.exports = CompanyMemberSchema
