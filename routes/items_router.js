'use strict';

const items_router = require("express").Router(),
    jsonParser = require('body-parser').json(),
    sanitizer = require('express-sanitize-escape').middleware(),
    item = require("../models/item.js");


items_router.get("/loottable/options/search/:searchTerm", (req, res, next) =>
{
    item.searchLootTableOptions(req.params.searchTerm)
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next();
        });
});

items_router.get("/altcurrencylist", (req, res, next) =>
{
    item.getAltCurrencyList()
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next();
        });
});

module.exports = items_router;