'use strict'

const Model = use('Model')
const { rule } = require('indicative')
const { validate } = use("Validator");

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
class Phone extends Model {

    static boot(){
        super.boot();
        this.addHook("beforeSave", async phoneInstance => {
          const validation = await validate(
            phoneInstance.$attributes,
            this.rules,
            this.messages
          );
          if (validation.fails()) {
            throw new Error(JSON.stringify(validation.messages()));
          }
        });
    }

    static get rules() {
         console.log(this.ctx);
        return {
            //'number': `required|unique:phones,number,id,${id}`,
            'phones.*.number':[
                rule('regex', /^((\(\d{2}\) ?)|(\d{3}-))?((\d{4})?|(\d{5})?)-\d{4}$/),
            ],
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
