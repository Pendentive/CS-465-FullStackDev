const axios = require('axios');

const apiUrl = 'http://localhost:3000/api';

const getAuthHeader = () => {
    // Logic to retrieve the token from cookies or local storage
    const token = process.env.EXPRESS_FRONTEND_TOKEN;
    return token ? `Bearer ${token}` : null;
};

const getPageData = async (identifier) => {
    const authHeader = getAuthHeader();
    const config = authHeader ? { headers: { 'Authorization': authHeader } } : {};

    try {
        const response = await axios.get(`${apiUrl}/pages/identifier/${identifier}`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
};

const processPageComponents = async (page) => {
    const componentsData = {};

    for (let i = 0; i < page.components.length; i++) {
        const component = page.components[i];
        const authHeader = getAuthHeader();
        const config = authHeader ? { headers: { 'Authorization': authHeader } } : {};

        try {
            const response = await axios.get(`${apiUrl}/components/${component.kind}/${component._id}`, config);
            componentsData[component.kind] = response.data;
        } catch (error) {
            componentsData[component.kind] = null; // or handle the error as needed
        }
    }

    return componentsData;
};

module.exports = {
    getPageData,
    processPageComponents
};