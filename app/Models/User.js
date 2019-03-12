'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')

class User extends Model {
  static get rules() {
    return {
      email: 'unique:users,email',
      password: "required|min:6|max:30",
      username: 'required|unique:users,username',
    }
  }

  static get messages() {
    return {
      'email.unique': 'Este email já está em uso',
      'password.required': 'Informe sua senha',
      'password.min': 'Informe sua senha com no mínimo 6 caracteres',
      'username.required': 'Informe seu username',
      'username.unique': 'Este username já está em uso'
    }
  }

  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  /**
   * A relationship on tokens is required for auth to
   * work. Since features like `refreshTokens` or
   * `rememberToken` will be saved inside the
   * tokens table.
   *
   * @method tokens
   *
   * @return {Object}
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  companies() {
    return this.hasMany('App/Models/Company', 'id', 'created_by');
  }
  
}

module.exports = User
