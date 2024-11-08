/* GET about view */
const admin = (req, res) => {
    res.render('admin', {title: 'Travlr Getaways'});
};

module.exports = {
    admin
}