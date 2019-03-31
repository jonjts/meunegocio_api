'use strict'

const User = use('App/Models/User');
const Company = use('App/Models/Company');
const { validate } = use('Validator');

class UserController {

    async create({ request, response }){
        const data = request.only(['email', 'username', 'password']);
        const validation = await validate(data, User.rules, User.messages)

        if (validation.fails()) {
            return response.status(500).send(validation.messages());
        }
        const user = await User.create(data);
        return user;
    }

    async getCompanies({ auth }){
        const user = await auth.getUser();
        return await user.companies().fetch();
    }

    async createCompany({ request, auth, response }){
        const data = request.only(['title']);
        const user = await auth.getUser();
        var company = {...data, created_by: user.id}
        const validation = await validate(company, Company.rules, Company.messages)
        if (validation.fails()) {
            return response.status(500).send(validation.messages())
        }
        return await user.companies().create(company);

    }

    async updateCompany({ request, params, auth, response}){
        const data = request.only(['title'])
        const user = await auth.getUser();
        const company = await user.companies().where('id', params.id).first();
        company.title = data.title;
        
        await company.save();
        return company;
    }

    async addMemberToCompany({ auth, request, params}){
        const data = request.only(['user_id']);
        const user = await auth.getUser();
        const company = await user.companies().where('id', params.id).first();
        return await company.companyMembers().create({...data, company_id: company.id});
    }

    async removeMemberToCompany({ auth, request, params }) {
        const data = request.only(['user_id']);
        const user = await auth.getUser();
        const company = await user.companies().where('id', params.id).first();
        return await company.companyMembers().delete({ ...data, company_id: company.id });
    }
}

module.exports = UserController
