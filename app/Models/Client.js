'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { validate } = use('Validator');
const { rule } = require('indicative')

class Client extends Model {

    static boot() {
        super.boot();
        this.addHook('beforeSave', async (userInstance) => {
            const validation = await validate(userInstance.$attributes, this.rules, this.messages)
            if (validation.fails()) {
                throw new Error(JSON.stringify(validation.messages()));
            }
        })

    }
    
    static get rules() {
        return {
            company_id: 'required',
            name: 'required',
            email: 'email',
            rg: "number",
            cpf: [
                rule('regex', /^((\d{3}).(\d{3}).(\d{3})-(\d{2}))*$/),
            ],
        }
    }

    static get messages() {
        return {
            'company_id.required': 'Empresa é obrigatória',
            'name.required': 'Informe o nome',
            'rg.required': 'O RG deve ser um número',
            'cpf.regex': 'Informe um CPF válido',
            'email.email': 'Informe um email válido',
        }
    }

    phones(){
        return this.hasMany('App/Models/Phone');
    }
}

module.exports = Client
