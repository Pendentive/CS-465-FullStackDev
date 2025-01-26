/* GET Homepage */
const index = (req, res) => {
    res.render('index', {title: process.env.DEFAULT_TITLE});
};

module.exports = {
    index
}