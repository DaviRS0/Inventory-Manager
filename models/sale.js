const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./inventory');

const Sale = sequelize.define('Sale', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inventory', // Reference the inventory table
            key: 'id'
        }
    },
    quantitySold: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    pricePerItem: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    totalSaleAmount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'sales' // Specify the table name explicitly
});

module.exports = { Sale };