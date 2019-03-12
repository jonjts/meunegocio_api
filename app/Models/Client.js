'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { validate } = use('Validator');
const { rule } = require('indicative')

class Client extends Model {
    
    static get rules() {
        return {
            company_id: 'required',
            name: 'required',
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
        }
    }
}

module.exports = Client
