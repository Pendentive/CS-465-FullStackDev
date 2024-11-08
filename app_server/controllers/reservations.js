/* GET rooms view */
const reservations = (req, res) => {
    res.render('reservations', {title: 'Travlr Getaways'});
};

module.exports = {
    reservations
}