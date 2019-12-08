'use strict';

const auth_router = require("express").Router(),
    User = require('./auth.js').User,
    passport = require('passport'),
    bodyParser = require('body-parser'),
    // urlParser   = bodyParser.urlencoded({ extended: true }),
    jsonParser = bodyParser.json(),
    fecha = require('fecha'),
    jwt = require('jsonwebtoken');
// jwt         = require('jwt-simple'),

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_OPTIONS = {
    issuer: process.env.JWT_ISSUER
}

const isUser = () =>
{
    return passport.authenticate("jwt",
    {
        session: false
    })
}

auth_router.post('/profile', isUser(), (req, res, next) =>
{
    res.json(req.user);
});

auth_router.post('/register', jsonParser, (req, res, next) =>
{
    console.log("Registering New User: " + req.body.user.username);
    User.register(new User(
    {
        username: req.body.user.username,
        email: req.body.user.email,
        last_login: fecha.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        status: req.body.status,
    }), req.body.user.password, (err, user) =>
    {
        if (err)
        {
            console.log(err);
        }
        else if (user)
        {
            jwt.sign(
            {
                user:
                {
                    username: user.username,
                    status: user.status
                }
            }, JWT_SECRET, JWT_OPTIONS, (err, token) =>
            {
                if (err)
                {
                    return res.status(500).json(err);
                }
                return res.json(
                {
                    token: token
                });
            });
        }
    });
});

auth_router.post('/login', jsonParser, (req, res, next) =>
{
    User.authenticate()(req.body.user.username, req.body.user.password, (err, user, authError) =>
    {
        if (err) return next(err);
        if (user === false)
        {
            console.log(authError.message)
        }
        else
        {
            jwt.sign(
            {
                user:
                {
                    username: user.username,
                    status: user.status
                }
            }, JWT_SECRET, JWT_OPTIONS, (err, token) =>
            {
                if (err)
                {
                    return res.status(500).json(err);
                }
                return res.json(
                {
                    token: token
                });
            });
        }
    });
});

module.exports = {
    auth_router,
    isUser
}