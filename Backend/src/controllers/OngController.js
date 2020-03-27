const connection = require('../database/coneection');
const crypto = require('crypto');

module.exports = {
    async index(request, response){
    const ongs = await connection('ongs').select('*');
    console.log(ongs);
    return response.json(ongs);
    },
      
    async create(request, response){

    const {nome, email, whastapp, cidade, uf} = request.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
        id,
        nome,
        email,
        whastapp,
        cidade,
        uf
    });

    console.log(nome,email,whastapp,cidade,uf,id);

    return response.json({id})
    }
};