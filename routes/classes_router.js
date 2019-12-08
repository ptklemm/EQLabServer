'use strict';

const classes_router = require('express').Router(),
    jsonParser = require('body-parser').json(),
    sanitizer = require('express-sanitize-escape').middleware(),
    validate = require('./validation/validate.js'),
    vResult = require('express-validator/check').validationResult,
    EQClasses = require(__serverRoot + '/lib/EQClasses.js'),
    EQClass = require(__serverRoot + '/models/EQClass.js');

/*******************************************************************/

// classes_router.patch("/:spellID", jsonParser, sanitizer, validate.spell, async (req, res, next) => {
//   const errors = vResult(req);
//   if (errors.isEmpty()) {
//     try {

//       res.status(200).type('json').json(data);
//     } catch (error) {
//       next();
//     }
//   } else {
//     res.status(400).type('json').json({ validationErrors: errors.formatWith(error => error.msg).mapped() });
//   }
// });

classes_router.get("/:classID", async (req, res, next) =>
{
    try
    {
        let classID = parseInt(req.params.classID, 10);
        let className = '';
        if (isNaN(classID))
        {
            classID = EQClasses.ClassIDByName[req.params.classID];
            className = req.params.classID;
        }
        else
        {
            className = EQClasses.ClassNameByID[req.params.classID];
        }

        let classData = {
            "id": classID,
            "name": className,
            "baseData": await EQClass.getBaseData(classID),
            "skills":
            {
                "levels": await EQClass.getClassSkills(classID),
                "caps": await EQClass.getSkillCaps(classID)
            },
            "spells": await EQClass.getSpells(classID),
            "AAs": await EQClass.getAltAdvVars(classID),
            "startZones": await EQClass.getStartZones(classID),
            "startingItems": await EQClass.getStartingItems(classID),
            "titles": await EQClass.getTitles(classID)
        }

        res.status(200).type('json').json(classData);
    }
    catch (error)
    {
        next();
    }
});

module.exports = classes_router;