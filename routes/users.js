const express = require("express");
const router = express.Router();
const Users = require('../models/Users');

router.get('/all', (req, res) => {
    const users = Users.find();

    users.then((data, err) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send(err)
    });
    
})

router.post('/add', (req, res) => {
    const user = new Users(req.body);

    user.save().then(newUser => {
        res.send({message: 'User added successfully'})
    }).catch(err => {
        res.status(500).send(err)
    });
})

module.exports = router;