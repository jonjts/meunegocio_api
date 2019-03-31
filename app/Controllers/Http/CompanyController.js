'use strict'
const { validate } = use('Validator');
const Company = use('App/Models/Company');
const Client = use('App/Models/Client');
const Phone = use('App/Models/Phone');

class CompanyController {

    async createClient({ params, request, response}){
        const data = request.only(['name','rg','cpf', 'email']);
        const company = await Company.findOrFail(Number(params.id));
        const client = {
            ...data,
            company_id: company.id,
        }
        const validation = await validate(client, Client.rules, Client.messages);
        if (validation.fails()) {
            return response.status(500).send(validation.messages());
        }
        return await company.clients().create(client);
    }

    async updateClient({ params, request, response }) {
        const data = request.only(['name', 'rg', 'cpf', 'company_id', 'email']);
        const company = await Company.findOrFail(Number(params.id));
        const validation = await validate(data, Client.rules, Client.messages);
        if (validation.fails()) {
            return response.status(500).send(validation.messages());
        }
        return await company.clients()
            .where('id', params.client_id)
            .update({...data});
    }

    async getClients({ params, request}){
        const { page } = request.all();
        const company = await Company.findOrFail(params.id);
        return company.clients().with('phones').paginate(page);
    }

    async addPhone({ params, request, response }){
        const data = request.raw()
        const phone = {
            "phones": JSON.parse(data)
        };
        const company = await Company.findOrFail(Number(params.id));
        const client = await company.clients().where('id', Number(params.client_id)).first();

        const validation = await validate(phone, Phone.rules, Phone.messages);
        if (validation.fails()) {
            return response.status(500).send(validation.messages())
        }

        return await client.phones().createMany(phone.phones);
    }
    
}

module.exports = CompanyController
