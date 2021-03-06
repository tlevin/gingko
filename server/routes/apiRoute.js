var usersController = require('../controllers/usersController');
var mealsController = require('../controllers/mealsController');
var externalController = require('../controllers/externalController');

module.exports = function (app) {
  app.get('/meals', mealsController.getMeals);
  app.post('/meals', mealsController.postMeal);
  app.get('/meals/:id', mealsController.getMealById);
  app.get('/users/:id', usersController.getUserById);
  app.get('/yelp', externalController.requestYelp);
  app.post('/meals/search/city/', mealsController.getMealsByCity);
  app.post('/meals/:id/join', mealsController.joinMeal);
  app.get('/meals/:id/attending', mealsController.getAttendees);
};
