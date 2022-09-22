const express = require('express');
const router = express.Router();


//Controllers
const userReposController = require('../controllers/ghUsersController')




module.exports = function(){


//Routes
router.post('/ghUsers',userReposController.getGhUsers);
router.get('/showuser',userReposController.showUser);
router.get('/ghRepos', userReposController.getRepos);
router.post('/ghUpdateUser', userReposController.updateUser);
router.get('/ghEvents', userReposController.getGhEvents);
router.get('/ghUsers', userReposController.getGhUsers);


return router;
}