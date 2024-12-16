/* GET about view */
const admin = (req, res) => {
    res.render('admin', {title: process.env.DEFAULT_TITLE});
};

module.exports = {
    admin
}