'use strict'


/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthCompany {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params, auth }, next) {
    const user = await auth.getUser();
    const company = await user.companies().where('id', params.id).first();
    if(company == null){
      let err = new Error('Você não pertence a essa empresa')
       err.statusCode = 403;
       throw err;
    }
    return next();
  }
}

module.exports = AuthCompany
