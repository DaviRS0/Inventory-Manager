const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Ledger = sequelize.define('Ledger', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'inventory',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    tableName: 'ledger'
});

module.exports = { Ledger };