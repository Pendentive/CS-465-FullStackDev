/* GET landing page */
const landingPage = (req, res) => {
    res.render('pages/common/landing', { 
        layout: 'layout-landing', 
        title: 'Welcome to Studio Custer' 
    });
};

module.exports = {
    landingPage
};