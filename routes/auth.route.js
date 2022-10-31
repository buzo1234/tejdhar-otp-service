const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/', authController.signUpUser);
router.post('/verify', authController.verifyEmail);
router.post('/logout', authController.logoutUser);
router.post('/signin', authController.signInUser);
router.post('/pay', authController.payInsta);
/* router.post('/logout', authController.logoutUser);
 */
module.exports = router;
