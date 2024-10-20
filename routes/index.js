var express = require('express');
var router = express.Router();
const pagesController = require("../controllers/pagesControllers")
const weatherMiddleware = require('../middlewares/time&weather');


router.get("/", weatherMiddleware, pagesController.getHomePage);
router.get('/feedback', pagesController.getFeedbackPage);
router.get('/form', pagesController.getFormPage);
router.get('/DataVisualize', pagesController.getDataVisualizePage);
router.get('/profile', pagesController.getProfilePage);
router.get('/signup', pagesController.getSignupPage);


module.exports = router;
