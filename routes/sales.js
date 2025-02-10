const express = require('express');
const router = express.Router();
const { Inventory, Sale, Ledger } = require('../models/index');

// List all sales
router.get('/', async (req, res) => {
    const sales = await Sale.findAll({
        include: [{ model: Inventory, as: 'item' }]
    });

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalSaleAmount, 0);

    res.render('sales', { sales, totalRevenue });
});

// Render Sell Item page
router.get('/sell', async (req, res) => {
    const items = await Inventory.findAll();
    res.render('sell', { items, errorMessage: null });
});

// Sell an item
router.post('/sell', async (req, res) => {
    const { itemId, quantitySold } = req.body;
    const item = await Inventory.findByPk(itemId);

    // Parse quantitySold as an integer
    const quantitySoldInt = parseInt(quantitySold, 10);

    // Log the item quantity and quantity sold
    console.log(`Item Quantity: ${item.quantity}, Quantity Sold: ${quantitySoldInt}`);

    if (item.quantity < quantitySoldInt) {
        const items = await Inventory.findAll();
        return res.render('sell', { items, errorMessage: 'Not enough stock available' });
    }

    const pricePerItem = item.price;
    const totalSaleAmount = pricePerItem * quantitySoldInt;

    await Sale.create({
        itemId,
        quantitySold: quantitySoldInt,
        pricePerItem,
        totalSaleAmount
    });

    item.quantity -= quantitySoldInt;
    await item.save();

    // Create a ledger entry for the credit
    await Ledger.create({
        type: 'credit',
        itemId,
        quantity: quantitySoldInt,
        amount: totalSaleAmount
    });

    res.redirect('/sales');
});

module.exports = router;