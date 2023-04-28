const express = require('express');
const router = express.Router();
const user = require('../models/user');
const userController = require('../controllers/userController');
const ensureAuthentication = require('../middleware/ensureAuthentication');
const ensureAdmin = require('../middleware/ensureAdmin');

/*  
 * Endpoints for users
*/

//Get All Users
router.get('/users', ensureAdmin, userController.getUsers);
//Create a User (The user information is located in the req body)
router.post('/users', userController.createUser);
//Get a User by ID (The user ID is located in the req params)
router.get('/users/:id', ensureAuthentication, userController.getUserById);
//update a user's career and skills
router.put('/users/:id/ck', ensureAuthentication, userController.updateUserCareerAndSkills);
//search for a user by name
router.get('/users/name/:name', ensureAdmin,  userController.searchUserByUsername);
//delete a user
router.delete('/users/:id', ensureAdmin,  userController.deleteUser);


/*
 * End of Endpoints for users
*/

module.exports = router;
