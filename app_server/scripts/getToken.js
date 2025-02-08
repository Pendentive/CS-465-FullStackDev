const axios = require('axios');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const apiUrl = 'http://localhost:3000/api';

const fetchToken = async () => {
    try {
        const response = await axios.post(`${apiUrl}/service-token`, {
            email: process.env.EXPRESS_FRONTEND_EMAIL,
            password: process.env.EXPRESS_FRONTEND_PASSWORD
        });

        const token = response.data.token;
        console.log('Token:', token);

        // Update .env file
        const envPath = path.join(__dirname, '../../.env');
        let envContent = fs.readFileSync(envPath, 'utf8');
        const tokenRegex = /EXPRESS_FRONTEND_TOKEN=(.*)/;

        if (tokenRegex.test(envContent)) {
            envContent = envContent.replace(tokenRegex, `EXPRESS_FRONTEND_TOKEN="${token}"`);
        } else {
            envContent += `\nEXPRESS_FRONTEND_TOKEN="${token}"`;
        }

        fs.writeFileSync(envPath, envContent, 'utf8');
        console.log('.env file updated with new token');
    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
    }
};

fetchToken();