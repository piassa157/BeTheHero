const connection = require('../database/coneection')
module.exports = {
    async index (request, response){
        const {page = 1} = request.query;

        const [count] = await connection('indices').count();

        const indices =  await connection('indices')
        .join('ongs', 'ongs.id','=','indices.ong_id')
        .limit(5)
        .offset((page - 1)*5)
        .select(['indices.*', 'ongs.whastapp', 'ongs.nome','ongs.email','ongs.cidade','ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(indices);
    },

    async create(request, response){
         const {titulo, descricao, valor} = request.body;
         const ong_id = request.headers.authorization;

         const [id] = await connection('indices').insert({
             titulo,
             descricao,
             valor,
             ong_id
         });

         return response.json({id})
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const indice = await connection('indices')
        .where('id', id)
        .select('ong_id')
        .first();

        if(indice.ong_id != ong_id){
            return response.status(401).json({error: 'Não Autorizado!'});
        }

        await connection('indices').where('id', id).delete();
            
        return response.status(204).send();
    }
}