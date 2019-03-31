'use strict'

const Model = use('Model')
const { rule } = require('indicative')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
class Phone extends Model {

    static get rules() {
        return {
            number: [
                rule('regex', /^((\d{2}) (\d{5})-(\d{4}))*$/),
            ],
            'phones.*.number':[
                rule('regex', /^((\(\d{2}\) ?)|(\d{3}-))?((\d{4})?|(\d{5})?)-\d{4}$/),
            ]
        }
    }

    static get messages() {
        return {
            'number.regex': 'Informe um telefone válido',
            'phones.*.number.regex': 'Informe um telefone válido',
        }
    }

    clients(){
        return this.belongsTo('App/Models/Client');
    }
}

module.exports = Phone
