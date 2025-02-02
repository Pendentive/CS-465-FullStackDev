const apiUrl = 'http://localhost:3000/api/pages';

const getPageData = async (identifier) => {
    try {
        const response = await fetch(`${apiUrl}/identifier/${identifier}`);
        if (!response.ok) {
            throw new Error('Failed to fetch page data');
        }
        const page = await response.json();
        return page;
    } catch (err) {
        console.error('Error fetching page data:', err);
        throw err;
    }
};

module.exports = {
    getPageData
};