'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompanyMember extends Model {

    company(){
        return this.belongsToMany('App/Models/Company')
    }

    users(){
        return this.hasMany('App/Models/User');
    }
}

module.exports = CompanyMember
