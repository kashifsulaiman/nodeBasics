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

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    const user = new Users({ email, password });    

    user.save()
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err))
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email })

    if (!user) {
        return res.send({ message: "No user found!" });
    }

    const isAuthenticated = await user.comparePassword(password);

    if (!isAuthenticated) {
        return res.send({ message: "Invalid Password!" });
    }

    const token = await user.generateToken();
    res.header("x-auth", token);
    res.send(user)
})

// protected route
router.post("/logout", (req, res) => {
    const token = req.header("x-auth");

    Users.removeToken(token)
        .then(() => res.send({message: "removed token"}))
        .catch(err => res.send(err))
})

module.exports = router;