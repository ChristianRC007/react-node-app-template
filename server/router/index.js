const Router = require('express').Router;
const userControllers = require('../controllers/userControllers');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware');

const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userControllers.registration,
);
router.post('/login', userControllers.login);
router.post('/logout', userControllers.logout);
router.get('/activate/:link', userControllers.activate);
router.get('/refresh', userControllers.refresh);
router.get('/users', authMiddleware, userControllers.getUsers);

module.exports = router;
