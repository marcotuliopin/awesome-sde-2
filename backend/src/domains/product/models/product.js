const Sequelize = require('sequelize');
const database = require('../../../../database/index');
const User = require('../../user/models/User');

const Product = database.define('Product', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },

    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    expirationDate: {
        type: Sequelize.DATEONLY,
        allowNull: false   
    }

});

User.belongsToMany(Product, {through: 'User_Products'});
Product.belongsToMany(User, {through: 'User_Products'});


module.exports = Product;