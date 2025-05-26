require('dotenv').config();

const app = require('./config/express');

// Optional: Uncomment to sync the database (only in dev, and be careful with force:true)
/*
(async () => {
    const database = require('./database/index.js');
    const Product = require('./src/domains/Product/models/Product');
    await Product.sync({ force: true }); // WARNING: This drops and recreates the table
})();
*/

// Simple test route
app.get('/', (req, res) => {
    res.send('Hello world!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});
