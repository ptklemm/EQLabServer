'use strict';

const express    = require('express'),
      api_router = express.Router();


api_router.use('/global', require('./global_router'));
api_router.use('/zones', require('./zones_router'));
api_router.use('/npcs', require('./npcs_router'));
api_router.use('/spells', require('./spells_router'));
api_router.use('/items', require('./items_router'));
api_router.use('/classes', require('./classes_router'));
// api_router.use('/rules', require('./rules_router'));
api_router.use('/files', require('./files_router'));

module.exports = api_router;