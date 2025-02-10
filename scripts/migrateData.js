require('dotenv').config();
const xlsx = require('xlsx');
const { Inventory, sequelize } = require('../models/index'); // Correct import
const path = require('path');

async function migrateData() {
    // Read the Excel file
    const workbook = xlsx.readFile(path.join(__dirname, 'inventory.xlsx'));
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    // Fix errors and prepare data
    const fixedData = data.map(item => {
        // Fix negative quantity
        if (item.Quantity < 0) {
            item.Quantity = 0;
        }

        // Fix invalid price
        if (isNaN(item.Price)) {
            item.Price = 0.0;
        }

        return item;
    });

    // Remove duplicate entries
    const uniqueData = [];
    const seen = new Set();
    for (const item of fixedData) {
        if (!seen.has(item.Name)) {
            uniqueData.push(item);
            seen.add(item.Name);
        }
    }

    // Insert data into the database
    await sequelize.sync({ force: true }); // This will drop the table if it exists and create a new one
    for (const item of uniqueData) {
        await Inventory.create({
            name: item.Name,
            quantity: item.Quantity,
            price: item.Price,
            description: item.Description
        });
    }

    console.log('Data migration completed successfully.');
}

migrateData().catch(err => {
    console.error('Error migrating data:', err);
});