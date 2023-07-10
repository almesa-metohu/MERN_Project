const User = require('../models/user.model')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

module.exports = {
    register: async (req, res) => {
        try {
            const user = await User.create(req.body);
            console.log('register');

            const userToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

            res.cookie('usertoken', userToken, { httpOnly: true }).json({ msg: 'success!', user: user });
        } catch (err) {
            console.log('error register', err);
            res.status(400).json(err);
        }
    },

    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email })

        if (user === null) {
            return res.status(400).json({ errors: { email: { message: 'There is no user with this email' } } })
        }

        const correctPassword = bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            return res.status(400).json({ errors: { password: { message: "The password is incorrect" } } });
        }

        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY)
        res.cookie('usertoken', userToken, {
            httpOnly: true
        })
            .json({ msg: 'success login!', user: user })
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
        .then(user => res.json(user))
        .catch(err => res.json(err))
    },

/*    updateUser: (req, res) => {
        User.findOne({_id: req.params.id})
            .then(user => {
                if(!user) {
                    return res.status(400).json({error: "User not found"})
                }
                user.firstName = req.body.firstName,
                user.lastName = req.body.lastName,
                user.email = req.body.email,
                user.city = req.body.city,
                user.country = req.body.country,
                user.phone = req.body.phone

                return user.save()
            })
            .then(user => res.json(user))
            .catch(err => res.status(500).json({error: err.errors}))
    }, */

    deleteUser: (req, res) => {
        User.findByIdAndDelete(req.params.id)
            .then(deletedUser => res.json(deletedUser))
            .catch(err => res.json(err))
    },

    sendEmailReservation: (req, res) => {
        const { formattedStart, formattedEnd, hotelName, hotelCity, usersName, usersEmail } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: process.env.BOOCLO_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.RESERVATION_EMAIL,
            to: usersEmail,
            subject: `BooClo Reservation Details`,
            text: `Hello ${usersName}, these are the details of your reservation:
            Place to stay: ${hotelName}, ${hotelCity}
            Dates: ${formattedStart} - ${formattedEnd}
            Check-in: 14:00 | Check-out: 11:00
            
            Thank you for choosing BooClo`
        };
        transporter.sendMail(mailOptions)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.error('Error sending email:', error);
                res.sendStatus(500);
            });
    },

    subscriptionEmail: (req, res) => {
        const { submitedEmail } = req.body;
        console.log(submitedEmail)
        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: process.env.BOOCLO_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.BOOCLO_EMAIL,
            to: submitedEmail,
            subject: `Your Exclusive BooClo Newsletter: Discover Exciting Deals!`,
            text: `We hope this email finds you well and filled with wanderlust! Welcome to our exclusive BooClo newsletter, where we bring you the latest travel deals, destinations, and insider tips to help you plan your dream vacations. Get ready to embark on unforgettable journeys and make memories that will last a lifetime!
            Happy travels!`
        };
        transporter.sendMail(mailOptions)
            .then(() => {
                res.sendStatus(200);
            })
            .catch(error => {
                console.error('Error sending email:', error);
                res.sendStatus(500);
            });
    }


}