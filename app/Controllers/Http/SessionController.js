'use strict'

class SessionController {
    
    async create({ request, auth }){
        const { username, password} = request.all();
        const token = await auth.attempt(username, password);
        return token;
    }

    async destroy({ auth }){
        const user = await auth.getUser();
        const token = auth.getAuthHeader();

        await user
            .tokens()
            .where('token', token)
            .update({ is_revoked: true });
    }
}

module.exports = SessionController
