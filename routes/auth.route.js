const router = require('express').Router();
const cors = require('cors');

const authController = require('../controllers/auth.controller');

router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyEmail);
router.post('/logout', authController.logoutUser);
router.post('/signin', cors(), authController.signInUser);
router.post('/pay', authController.payInsta);
router.get('/orders', authController.showOrders);
router.post('/atc', authController.addToCart);
router.post('/getorders', authController.allOrders);
router.post('/adminorders', authController.adminOrders);

module.exports = router;
