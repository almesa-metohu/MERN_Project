const User = require('../models/user.model')
/* const Rating = require('../models/rating.model')*/
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                console.log('register')
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY)

                return res.cookie('usertoken', userToken, {
                    httpOnly: true
                }).json({ msg: 'success!', user: user})
            })
            .catch(err => {
                console.log('error register' + err)
                return res.status(400).json(err)
            })
    },

    login: async(req, res) => {
        const user = await User.findOne({ email: req.body.email })
        
        if(user === null) {
            return res.status(400).json({ errors: { email: { message: 'There is no user with this email' } } })
        }

        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            return res.status(400).json({ errors: { password: { message: "The password is incorrect" } } });
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY)
        res.cookie('usertoken', userToken, {
            httpOnly: true
        })
        .json({ msg: 'success login!', token: userToken})
    },

    logout: (req, res) => {
        console.log("logout")
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        User.findById(req.params.id)
            .then(user => res.json(user))
            .catch(err => res.json(err))
    },

    getUsers: (req, res) => {
        User.find()
            .then(users => res.json(users))
            .catch(err => res.json(err))
    },

    updateUser: (req, res) => {
        User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )
    },

    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(deletedUser => res.json(deletedUser))
            .catch(err => res.json(err))
    },
}