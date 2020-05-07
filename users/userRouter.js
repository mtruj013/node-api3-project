const express = require('express');
const Users = require('./userDb.js')
const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
   const name = req.body;

  Users.insert(name)
  .then(user => {
    res.status(201)
    .json(user)
  })   
  .catch(error => {
    res.status(500)
    .json({error: "Could not add new user"})
  })
});

router.post('/:id/posts', (req, res) => {
  // do your magic!

});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(user => {
      res.status(200)
        .json(user)
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The user information could not be retrieved." })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;

  Users.getById(id)
    .then(user => {
      res.status(200)
        .json(user)
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The information could not be retrieved." })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!

  const id = req.params.id;

  Users.getUserPosts(id)
  .then(posts => {
    res.status(200)
    .json(posts)
  })
  .catch( error => {
    res.status(500)
    .json({error: "Could not find posts"})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!

  const id = req.params.id;
  Users.remove(id)
  .then(() => {
    res.status(204)
    .json({message: "User deleted!"})
  })
  .catch(error => {
    res.status(500)
    .json({error: "The user could not be removed"})
  })

});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.params.id;
  const name = req.body

  Users.update(id, name)
    .then(userUpdate => {
      res.status(200)
        .json(userUpdate)
    })
    .catch(error => {
      res.status(500)
        .json({ error: "The user could not be updated." })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const id = req.params.id;
  Users.getById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(404)
          .json({ error: "The user with the specified ID does not exist." })
      }
    })
}

function validateUser(req, res, next) {
  // do your magic!
  const userBody= req.body;

  if(Object.keys(userBody).length === 0){
    res.status(400)
    .json({message: "missing user data"})
  } else if (!userBody.name){
    res.status(400)
    .json({message: "missing required name field" })
  } else {
    next();
  }

}

function validatePost(req, res, next) {
  // do your magic!

  const postBody = req.body;

  if(Object.keys(postBody).length === 0){
    res.status(400)
    .json({message: "missing post data"})
  } else if (!postBody.text){
    res.status(400)
    .json({ message: "missing required text field" })
  } else {
    next();
  }

}

module.exports = router;
