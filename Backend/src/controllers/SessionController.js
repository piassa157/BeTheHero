const connection = require('../database/coneection')

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const ong = await connection('ongs')
        .where('id', id)
        .select('nome')
        .first();

        if(!ong){
            return response.status(400).json({error: 'Id not found'})
        }

        return response.json(ong);
    }
}