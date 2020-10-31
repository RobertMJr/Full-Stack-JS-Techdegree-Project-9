const express = require('express');
const router = express.Router();
const { Course, User} = require('../models');
const { asyncHandler } = require('../middleware/async-handler');

// Returns a list of courses (including the user that owns each course)
router.get('/', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include:[
            {
            model:User,
            attributes: ['firstName', 'lastName', 'emailAddress'],
            },
        ],
    });
    res.json(courses);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        },
        include:[
            {
            model:User,
            attributes: ['firstName', 'lastName', 'emailAddress'],
            },
        ],
    });
    if(course) {
        res.json(course);
    } else {
        res.status(404).json({
            message: 'Id Not Found.',
        });
    }
}));

module.exports = router;