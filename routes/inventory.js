const express = require('express');
const router = express.Router();
const { Inventory, Ledger } = require('../models/index');

// List all items
router.get('/', async (req, res) => {
    const items = await Inventory.findAll();
    res.render('index', { items });
});

// Render Add Item page
router.get('/add', (req, res) => {
    res.render('add');
});

// Add a new item
router.post('/add', async (req, res) => {
    const { name, quantity, price, description } = req.body;
    const item = await Inventory.create({ name, quantity, price, description });

    // Create a ledger entry for the debit
    await Ledger.create({
        type: 'debit',
        itemId: item.id,
        quantity,
        amount: price * quantity
    });

    res.redirect('/');
});

// Render Edit Item page
router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const item = await Inventory.findByPk(id);
    res.render('edit', { item });
});

// Edit an item
router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, price, description } = req.body;
    await Inventory.update({ name, quantity, price, description }, { where: { id } });
    res.redirect('/');
});

// Delete an item
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Inventory.destroy({ where: { id } });
    res.redirect('/');
});

module.exports = router;