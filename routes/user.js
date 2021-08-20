const express = require('express');
const { body } = require('express-validator')

const userController = require('../controllers/user');

const router = express.Router();

router.get('/users', userController.getUserList);

router.get('/userdetail/:userId', userController.getUserDetails);

router.get('/add-user', userController.addNewUser);

router.post('/saveuser',
            body('firstName', 'First name is required.').notEmpty().isLength({ min: 5, ignore_whitespace: true })
                                                        .withMessage('First name must atleast 5 characters long.'),
            body('lastName').isLength({ min: 5, ignore_whitespace: true }),
            body('age').isInt(),
            body('gender').notEmpty({ ignore_whitespace: true }),
            userController.saveUser);

router.get('/viewuser/:userId', userController.viewUserDetails);

router.post('/deleteuser', userController.deleteUser);

module.exports = router;