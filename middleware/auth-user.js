'use strict'

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
    let authed = true;
    const credentials = auth(req);
    if(credentials) {
        const user = await User.findOne({where: {emailAddress: credentials.name}});
        if(user) {
            const authenticated = bcrypt.compareSync(credentials.pass, user.password);
            if(authenticated) {
                req.currentUser = user;
            } else {
                authed = false;
                console.warn('Pass issue');
            }
        } else {
            authed = false;
            console.warn('User issue');
        }
    } else {
        authed = false;
        console.warn('Cred issue');
    }
    if(!authed) {
        res.status(401).end();
    } else {
        next();
    }
};