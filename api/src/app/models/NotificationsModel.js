const Sequelize = require('sequelize');
const { sequelize } = require('../../server');
const Model = Sequelize.Model;
class Notification extends Model {}
Notification.init({
  // attributes
  id: {
    type: Sequelize.NUMBER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false
  },
  received: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  opened: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'notification'
  // options
});

module.exports = Notification;