require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
    throw new Error('DATABASE_URL environment variable is not defined');
}

const sequelize = new Sequelize(databaseUrl, { dialect: 'postgres' });

const Inventory = sequelize.define('Inventory', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            isFloat: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'inventory'
});

module.exports = { Inventory, sequelize };