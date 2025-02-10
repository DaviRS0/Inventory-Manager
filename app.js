require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { sequelize } = require('./models/index'); // Import sequelize instance
const inventoryRoutes = require('./routes/inventory');
const salesRoutes = require('./routes/sales');
const ledgerRoutes = require('./routes/ledger'); // Import ledger routes

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', inventoryRoutes);
app.use('/sales', salesRoutes);
app.use('/ledger', ledgerRoutes); // Use ledger routes

// Synchronize the database schema
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Unable to synchronize the database:', err);
});