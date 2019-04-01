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
        return await company.clients().create(client);
    }

    async updateClient({ params, request, response }) {
        const data = request.only(['name', 'rg', 'cpf', 'company_id', 'email']);
        const company = await Company.findOrFail(Number(params.id));
        return await company.clients()
            .where('id', params.client_id)
            .update({...data, company_id: company.id});
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

        return await client.phones().createMany(phone.phones);
    }
    
}

module.exports = CompanyController
