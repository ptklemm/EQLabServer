'use strict';

const db = require('../db/db.js').db,
    Treeize = require('treeize'),
    sanitize = require('../lib/sanitize.js');

module.exports = {

    select: async (columnsArr = null, whereObj) =>
    {
        return await db.select('items', columnsArr, whereObj);
    },

    update: async (id, values) =>
    {
        if (id)
        {
            return await db.update('items', values, { id });
        }
    },

    getAltCurrencyList: async () =>
    {
        let queryStr = `
        SELECT alternate_currency.id AS 'value', items.id AS 'item_id', items.name AS 'label'
        FROM alternate_currency
        LEFT JOIN items ON items.id = alternate_currency.item_id
        `;

        let SQLdata = await db.raw(queryStr);
        return SQLdata[0];
    },

    searchLootTableOptions: async (searchTerm) =>
    {
        let queryStr = `
        SELECT id, name
        FROM loottable
        WHERE id LIKE '${searchTerm}%'
        OR name LIKE '%${searchTerm}%'
        `

        let results = await db.raw(queryStr);
        return results[0];
    }

}