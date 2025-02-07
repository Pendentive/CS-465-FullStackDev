const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { clearData } = require('./delete-utils');

dotenv.config();

// Connect to the database
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/travlr';
mongoose.connect(dbURI);

const clearDatabase = async () => {
    try {
        console.log('Connecting to the database...');
        await mongoose.connection.once('open', async () => {
            console.log('Connected to MongoDB');

            console.log('Clearing all page data'); 
            // Clear all data related to the FECs, including pages and baseModel
            await clearData(['pages', 'baseModel']);
            console.log('Page and basemodel data cleared successfully');

            mongoose.disconnect();
        });
    } catch (err) {
        console.error('Error clearing data:', err);
        mongoose.disconnect();
    }
};

clearDatabase();