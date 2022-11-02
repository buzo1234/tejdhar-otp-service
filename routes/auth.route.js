const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyEmail);
router.post('/logout', authController.logoutUser);
router.post('/signin', authController.signInUser);
router.post('/pay', authController.payInsta);
router.get('/orders', authController.showOrders);
router.post('/atc', authController.addToCart);
router.post('/getorders', authController.allOrders);
router.post('/adminorders', authController.adminOrders);

module.exports = router;
