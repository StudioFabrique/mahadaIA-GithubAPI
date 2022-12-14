const express = require('express');
const router = express.Router();


//Controllers
const userReposController = require('../controllers/ghUsersController')




module.exports = function(){


//Routes
router.post('/ghUsers',userReposController.getGhUsers);
router.get('/showusers',userReposController.showUsers);    
router.get('/ghRepos', userReposController.getRepos);
router.post('/ghUpdateUser', userReposController.updateUser);
router.get('/ghEvents', userReposController.getGhEvents);
router.get('/showUser/:_id', userReposController.getGhUser);
router.get('/metrics/:user/:repo', userReposController.getMetric);


return router;
}