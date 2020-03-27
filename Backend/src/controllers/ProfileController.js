const connection = require('../database/coneection');

module.exports = {
    async index(request,response){
        const ong_id = request.headers.authorization;
        
        const indices = await connection('indices').where('ong_id', ong_id).select('*');

        return response.json(indices);
    }
}