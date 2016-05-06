module.exports.homelist = function(req, res){
  res.render('locations-list', {
    title: 'Loc8r - find a place to work with wifi',
    pageHeader: {
      title: 'Loc8r',
      strapline: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you are looking for.',
    locations: [
        {
          name: 'Starcups',
          address: 'Via Salvador Dalì, 26',
          rating: 1,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'],
          distance: '100m'
        },
        {
          name: 'Cafe Hero',
          address: 'Via di Passo Lombrado, 72',
          rating: 2,
          facilities: ['Hot drinks', 'Food', 'Premium wifi'],
          distance: '200m'
        },
        {
          name: 'Burger Queen',
          address: 'Via G.A.Sartorio, 85',
          rating: 3,
          facilities: ['Food', 'Premium wifi'],
          distance: '250m'
        }
      ]

  });
};


module.exports.addReview = function(req, res){
  res.render('location-review-form', { title: 'Add review' });
};

module.exports.locationInfo = function(req, res){
res.render('location-info', { title: 'Location info' });
};
