const express = require('express');
const Users = require('./userDb.js')
const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then( user => {
    res.status(200)
    .json(user)
  })
  .catch( error => {
    res.status(500)
    .json({error: "The user information could not be retrieved."})
  })
});

router.get('/:id', (req, res) => {
  // do your magic!
  const id = req.params.id;

  Users.getById(id)
  .then( user =>{
    if(user){
      res.status(200)
      .json(user)
    } else {
      res.status(404)
      .json({message: "The post with the specified ID does not exist."})
    }
  })
  .catch(error => {
    res.status(500)
    .json({error: "The information could not be retrieved."})
  })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!

});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const name = req.body

  Users.update(id, name )
      .then(userUpdate => {
        res.status(200)
        .json(userUpdate)
      })
      .catch(error => {
        res.status(500)
        .json({error: "The user could not be updated."})
      })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Users.getById(id)
  .then(user => {
    if(user){
      next();
    } else {
      res.status(404)
      .json({error: "The user with the specified ID does not exist."})
    }
  })
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
