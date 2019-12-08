'use strict';

const files_router = require("express").Router(),
    jsonParser = require('body-parser').json(),
    sanitizer = require('express-sanitize-escape').middleware(),
    fs = require('fs-extra'),
    stream = require('stream'),
    path = require('path'),
    XLSX = require('xlsx'),
    multer = require('multer'),
    memStorage = multer.memoryStorage(),
    file = require(__serverRoot + '/models/file.js'),
    upload = multer(
    {
        storage: memStorage,
        limits:
        {
            fileSize: 5 * 10 * 1024 * 1024,
            files: 1
        }
    });


/*****************************************************************/

files_router.post("/classbasedata", upload.single('classBaseData'), (req, res, next) =>
{
    file.importClassBaseDataWorkbook(XLSX.read(req.file.buffer,
        {
            type: 'buffer'
        }))
        .then(data =>
        {
            res.status(200).type('json').json(
            {
                "result": data
            });
        })
        .catch(error =>
        {
            next();
        });
});

files_router.get("/class_base_data.xlsx", (req, res, next) =>
{
    file.exportClassBaseDataWorkbook()
        .then(workbook =>
        {
            res.status(200).attachment('class_base_data.xlsx').send(XLSX.write(workbook, { type: 'buffer' }));
        })
        .catch(error =>
        {
            next();
        });
});

files_router.post("/classskillcaps", upload.single('classSkillCaps'), (req, res, next) =>
{
    file.importClassSkillCapsWorkbook(XLSX.read(req.file.buffer,
        {
            type: 'buffer'
        }))
        .then(data =>
        {
            res.status(200).type('json').json(
            {
                "result": data
            });
        })
        .catch(error =>
        {
            next();
        });
});

files_router.get("/class_skill_caps.xlsx", (req, res, next) =>
{
    file.exportClassSkillCapsWorkbook()
        .then(workbook =>
        {
            res.status(200).attachment('class_skill_caps.xlsx').send(XLSX.write(workbook,
            {
                type: 'buffer'
            }));
        })
        .catch(error =>
        {
            next();
        });
});

files_router.get("/spells_us.txt", (req, res, next) =>
{
    file.createSpellsTxt()
        .then(() =>
        {
            res.status(200).type('text/plain').download(__filesdir + '/spells.us.txt', 'spells_us.txt');
        })
        .catch(error =>
        {
            next();
        });
});

files_router.get("/dbstr_us.txt", (req, res, next) =>
{
    fs.access(__filesdir + '/dbstr_us.txt', err =>
    {
        if (err) next();
        res.status(200).type('text/plain').download(__filesdir + '/dbstr_us.txt', 'dbstr_us.txt');
    })
});

files_router.get("/build", (req, res, next) =>
{
    file.createBuild(req.body.version)
        .then(file =>
        {
            res.status(200).type('application/zip').download(file);
        })
        .catch(error =>
        {
            next();
        });
});

files_router.post("/addmodels/all/", jsonParser, sanitizer, (req, res, next) =>
{
    file.addModelToAllZones(req.body)
        .then(data =>
        {
            res.status(200).type('json').json(
            {
                status: 'ok'
            });
        })
        .catch(error =>
        {
            next();
        });
});

files_router.post("/addmodel", jsonParser, sanitizer, (req, res, next) =>
{
    file.addModelToZone(req.params.zoneName, req.body)
        .then(data =>
        {
            res.status(200).type('json').json(
            {
                status: 'ok'
            });
        })
        .catch(error =>
        {
            next();
        });
});

module.exports = files_router;