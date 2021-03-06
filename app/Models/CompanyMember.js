'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompanyMember extends Model {

    company(){
        return this.belongsTo('App/Models/Company')
    }

    user(){
        return this.belongsTo('App/Models/User');
    }
}

module.exports = CompanyMember
