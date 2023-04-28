const express = require('express');
const user = require('../models/user');
const router = express.Router();
const session = require("express-session");
const bcrypt = require('bcrypt');
const userService = require('../services/userService');



router.post("/login", async (req, res) => {
   let curUser = await userService.getUserByEmail(req.body.email);
   if( curUser ) {
      req.session.regenerate( () => {
         bcrypt.compare(req.body.password, curUser.password, (err, success) => {
            if( success ) {
               req.session.user = curUser;
               res.status(200).json(curUser);
            } else {
               res.status(401).json("Invalid credentials");
            }
         });
      });
   } else {
      res.status(401).json("Invalid credentials");
   }
});

//this is the who endpoint that is used to check if the user is logged in
router.get("/who", (req, res) => {
   if( req.session && req.session.user ) {
      res.status(200).json(req.session.user);
   } else {
      res.status(401).json("No user logged in");
   }
});

router.post("/logout", (req, res) => {
   req.session.destroy( () => {
      res.status(200).send({});
   });
});


module.exports = router; 