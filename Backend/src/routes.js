const express = require('express');
const ongController = require('./controllers/OngController')
const indiceController = require('./controllers/IndiceController')
const profileController = require('./controllers/ProfileController');
const SessionControler = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionControler.create)

routes.get('/ongs', ongController.index);
routes.post('/ongs', ongController.create);

routes.get('/profile', profileController.index);

routes.get('/indices', indiceController.index);
routes.post('/indices', indiceController.create);
routes.delete('/indices/:id', indiceController.delete);

module.exports = routes;