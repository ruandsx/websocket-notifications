const express = require('express');
const routes = express.Router();

const NotificationController = require('./app/controllers/NotificationController');

routes.get('/notifications/:id?', NotificationController.index);
routes.post('/notifications/create', NotificationController.create);
routes.put('/notifications/update/:id', NotificationController.update);
routes.delete('/notifications/delete/:id', NotificationController.delete);



module.exports = routes;