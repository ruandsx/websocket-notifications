const Notification = require('../models/NotificationsModel');
const { findConnections, sendMessage } = require('../../websocket')
module.exports = {

  index(req, res) {
    if(req.params.id === undefined){
      Notification.findAll().then(notifications => {
        return res.json(notifications);
      });
    }else{
      Notification.findAll({
        where: {
          id_user: req.params.id
        }
      }).then(notifications => {
        return res.json(notifications);
      });
    }
  },

  create(req, res) {
    Notification.create(req.body).then(notification => {
      res.json({ message: 'Notification Created Sucessfully', notification});
      
      //filtrando as conexoes
      const sendSocketTo = findConnections(notification.id_user)
      sendMessage(sendSocketTo, 'new-notification', notification);
    });


  },

  update(req, res) {
    const id = req.params.id;
    Notification.update(req.body, {
      where: {
        id
      }
    }).then(() => {
      res.json({ message: `Notification#${id} Updated Sucessfully`});
    });
  },

  delete(req, res) {
    const id = req.params.id;
    Notification.destroy({
      where: {
        id
      }
    }).then(() => {
      res.json({ message: `Notification#${id} Updated Sucessfully`});
    });
  },
}