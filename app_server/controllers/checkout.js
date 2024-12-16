/* GET contact view */
const checkout = (req, res) => {
    res.render('checkout', {title: process.env.DEFAULT_TITLE}); 
};

module.exports = {
    checkout
}