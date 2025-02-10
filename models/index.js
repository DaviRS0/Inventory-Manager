const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

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
    tableName: 'inventory' // Specify the table name explicitly
});

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

Inventory.hasMany(Sale, { foreignKey: 'itemId', as: 'sales' });
Sale.belongsTo(Inventory, { foreignKey: 'itemId', as: 'item' });

Inventory.hasMany(Ledger, { foreignKey: 'itemId', as: 'ledgerEntries' });
Ledger.belongsTo(Inventory, { foreignKey: 'itemId', as: 'item' });

module.exports = { Inventory, Sale, Ledger, sequelize };