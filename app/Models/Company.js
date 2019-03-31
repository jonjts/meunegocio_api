'use strict'

const { validate } = use('Validator');
const Model = use('Model')
const CompanyMember = use('App/Models/CompanyMember');
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
class Company extends Model {

    static boot(){
        super.boot();
        this.addHook('afterCreate', async (companyInstance) => {
            const companyMember = { 
                user_id: companyInstance.created_by,
                company_id: companyInstance.id
            }
            await CompanyMember.create(companyMember);
        });
        this.addHook('beforeSave', async (companyInstance) => {
            const validation = await validate(companyInstance.$attributes, this.rules, this.messages)
            if (validation.fails()) {
                throw new Error(JSON.stringify(validation.messages()));
            }
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
        return this.belongsTo('App/Models/User', 'created_by', 'id');
    }

    companyMembers(){
        return this.hasMany('App/Models/CompanyMember');
    }

    clients(){
        return this.hasMany('App/Models/Client');
    }

}

module.exports = Company
