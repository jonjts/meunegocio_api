'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const CompanyMember = use('App/Models/CompanyMember');

class Company extends Model {

    static boot(){
        super.boot();
        this.addHook('afterCreate', async (companyInstance) => {
            const companyMember = { 
                user_id: companyInstance.created_by,
                company_id: companyInstance.id
            }
            await CompanyMember.create(companyMember);
        })
    }

    static get rules(){
        return {
            title: 'required',
            created_by: 'required'
        }
    }

    static get messages(){
        return{
            'title.required': 'Informe o nome da empresa',
            'created_by.required': 'Informe o dono da empresa'
        }
    }

    
    user(){
        return this.hasOne('App/Models/User');
    }

    companyMembers(){
        return this.hasMany('App/Models/CompanyMember');
    }

    clients(){
        return this.hasMany('App/Models/Client');
    }

}

module.exports = Company
