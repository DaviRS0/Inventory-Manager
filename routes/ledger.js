const express = require('express');
const router = express.Router();
const { Ledger, Inventory } = require('../models/index');

// List all ledger entries
router.get('/', async (req, res) => {
    const ledgerEntries = await Ledger.findAll({
        include: [{ model: Inventory, as: 'item' }]
    });

    const balance = ledgerEntries.reduce((sum, entry) => {
        return entry.type === 'debit' ? sum + entry.amount : sum - entry.amount;
    }, 0);

    res.render('ledger', { ledgerEntries, balance });
});

module.exports = router;