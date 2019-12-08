const
{
    body
} = require('express-validator/check');
const spawn2Fields = require('./spawn2Fields.js');
const spawngroupFields = require('./spawngroupFields.js');
const npc_typeFields = require('./npc_typeFields.js');
const spells_newFields = require('./spells_newFields.js');

const filterInt = field =>
{
    field.type.includes('int')
};
const intMsg = "Must be an integer";

const filterFloat = field =>
{
    field.type.includes('float')
};
const floatMsg = "Must be a float";

const mapFields = field =>
{
    field.field
};

module.exports = {

    spawn2: [
        body(spawn2Fields.filter(filterInt).map(mapFields), intMsg).optional().isInt(),
        body(spawn2Fields.filter(filterFloat).map(mapFields), floatMsg).optional().isFloat()
    ],

    spawngroup: [
        body(spawngroupFields.filter(filterInt).map(mapFields), intMsg).optional().isInt(),
        body(spawngroupFields.filter(filterFloat).map(mapFields), floatMsg).optional().isFloat()
    ],

    npc_type: [
        body(npc_typeFields.filter(filterInt).map(mapFields), intMsg).optional().isInt(),
        body(npc_typeFields.filter(filterFloat).map(mapFields), floatMsg).optional().isFloat()
    ],

    spell: [
        body(spells_newFields.filter(filterInt).map(field => 'data.' + field.field).concat(['damageshieldtype.type']), intMsg).optional().isInt(),
        body(spells_newFields.filter(filterFloat).map(field => 'data.' + field.field), floatMsg).optional().isFloat()
    ]

}