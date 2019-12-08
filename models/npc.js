'use strict';

const db = require('../db/db.js').db,
    Treeize = require('treeize'),
    sanitize = require('../lib/sanitize.js');

module.exports = {

    search: async (values) =>
    {
        let queryStr = `
        SELECT * FROM npc_types
        WHERE id LIKE '${values.id ? values.id : ''}%'
        OR name LIKE '%${values.id ? values.id : ''}%'
        AND level >= '${values.minlevel ? values.minlevel : ''}'
        AND maxlevel <= '${values.maxlevel ? values.maxlevel : ''}'
        `

        let results = await db.raw(queryStr);
        return results[0];
    },

    select: async (columnsArr = null, whereObj) =>
    {
        return (await db.select('npc_types', columnsArr, whereObj))[0];
    },

    insert: async (values) =>
    {
        return (await db.insert('npc_types', values))[0];
    },

    copy: async (npcID) =>
    {
        let npc = (await db.select('npc_types', [],
        {
            id: npcID
        }))[0];
        npc.id = null;
        return (await db.insert('npc_types', npc))[0];
    },

    update: async (id, values) =>
    {
        if (id)
        {
            return await db.update('npc_types', values,
            {
                id
            });
        }
    },

    delete: async (id) =>
    {
        if (id)
        {
            return await db.delete('npc_types',
            {
                id
            });
            /* Linked Tables
                spawnentry
                pets
                fishing
                merchantlist_temp
            */
        }
    },

    getSpells: async (spellsetID) =>
    {
        if (spellsetID == 0)
        {
            return null;
        }

        let queryStr = `
        SELECT npc_spells.id, npc_spells.name AS 'name', npc_spells.parent_list,
        npc_spells.attack_proc, aproc.name AS 'proc_name', npc_spells.proc_chance, npc_spells.range_proc, 
        rproc.name AS 'rproc_name', npc_spells.rproc_chance, npc_spells.defensive_proc, dproc.name AS 'dproc_name', 
        npc_spells.dproc_chance, npc_spells_entries.id AS 'entries:id', npc_spells_entries.spellid AS 'entries:spell_id', 
        npc_spells_entries.type AS 'entries:type', npc_spells_entries.minlevel AS 'entries:minlevel', 
        npc_spells_entries.maxlevel AS 'entries:maxlevel', npc_spells_entries.recast_delay AS 'entries:recast_delay', 
        npc_spells_entries.priority AS 'entries:priority', npc_spells_entries.resist_adjust AS 'entries:resist_adjust', 
        spells_new.name AS 'entries:name'
        FROM npc_spells
        LEFT JOIN npc_spells_entries ON npc_spells.id = npc_spells_entries.npc_spells_id
        LEFT JOIN spells_new aproc ON npc_spells.attack_proc = aproc.id
        LEFT JOIN spells_new rproc ON npc_spells.range_proc = rproc.id
        LEFT JOIN spells_new dproc ON npc_spells.defensive_proc = dproc.id
        LEFT JOIN spells_new ON npc_spells_entries.spellid = spells_new.id
        WHERE npc_spells.id = '${spellsetID}'
        `;

        try
        {
            let SQLdata = await db.raw(queryStr);

            if (!SQLdata[0].length)
            {
                return null;
            }
            else
            {
                let spells = new Treeize;
                SQLdata[0] = sanitize(SQLdata[0]);
                spells = spells.grow(SQLdata[0]).getData()[0];

                if (!spells.entries[0].id)
                {
                    spells.entries = [];
                }

                if (!spells.parent_list)
                {
                    spells.parent_list = null;
                }
                else
                {
                    queryStr = `
                    SELECT npc_spells.id, npc_spells.name, npc_spells.attack_proc, aproc.name AS 'proc_name', npc_spells.proc_chance, 
                    npc_spells.range_proc, rproc.name AS 'rproc_name', npc_spells.rproc_chance, npc_spells.defensive_proc, 
                    dproc.name AS 'dproc_name', npc_spells.dproc_chance, npc_spells_entries.id AS 'entries:id',
                    npc_spells_entries.spellid AS 'entries:spell_id', npc_spells_entries.type AS 'entries:type',
                    npc_spells_entries.minlevel AS 'entries:minlevel', npc_spells_entries.maxlevel AS 'entries:maxlevel',
                    npc_spells_entries.recast_delay AS 'entries:recast_delay', npc_spells_entries.priority AS 'entries:priority',
                    npc_spells_entries.resist_adjust AS 'entries:resist_adjust', spells_new.name AS 'entries:name'
                    FROM npc_spells
                    LEFT JOIN npc_spells_entries ON npc_spells.id = npc_spells_entries.npc_spells_id
                    LEFT JOIN spells_new aproc ON npc_spells.attack_proc = aproc.id
                    LEFT JOIN spells_new rproc ON npc_spells.range_proc = rproc.id
                    LEFT JOIN spells_new dproc ON npc_spells.defensive_proc = dproc.id
                    LEFT JOIN spells_new ON npc_spells_entries.spellid = spells_new.id
                    WHERE npc_spells.id = '${spells.parent_list}'
                    `;

                    SQLdata = await db.raw(queryStr);
                    let parentList = new Treeize;
                    SQLdata[0] = sanitize(SQLdata[0]);
                    spells.parent_list = parentList.grow(SQLdata[0]).getData()[0];
                }
                return spells;
            }
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Spells: ' + error);
        }
    },

    getEffects: async (effectsetID) =>
    {
        if (effectsetID == 0)
        {
            return null;
        }

        let queryStr = `
        SELECT npc_spells_effects.id, npc_spells_effects.name AS 'name', npc_spells_effects.parent_list, 
        npc_spells_effects_entries.id AS 'entries:id',npc_spells_effects_entries.spell_effect_id AS 'entries:spell_effect_id', 
        npc_spells_effects_entries.minlevel AS 'entries:minlevel', npc_spells_effects_entries.maxlevel AS 'entries:maxlevel', 
        npc_spells_effects_entries.se_base AS 'entries:se_base', npc_spells_effects_entries.se_limit AS 'entries:se_limit', 
        npc_spells_effects_entries.se_max AS 'entries:se_max'
        FROM npc_spells_effects
        LEFT JOIN npc_spells_effects_entries ON npc_spells_effects.id = npc_spells_effects_entries.npc_spells_effects_id
        WHERE npc_spells_effects.id = '${effectsetID}'
        `;

        try
        {
            let SQLdata = await db.raw(queryStr);

            if (!SQLdata[0].length)
            {
                return null;
            }
            else
            {
                let effects = new Treeize;
                SQLdata[0] = sanitize(SQLdata[0]);
                effects = effects.grow(SQLdata[0]).getData()[0];

                if (!effects.entries[0].id)
                {
                    effects.entries = [];
                }

                if (!effects.parent_list)
                {
                    effects.parent_list = null;
                }
                else
                {
                    queryStr = `
                    SELECT npc_spells_effects.id, npc_spells_effects.name, npc_spells_effects_entries.id AS 'entries:id',
                    npc_spells_effects_entries.spell_effect_id AS 'entries:spell_effect_id', 
                    npc_spells_effects_entries.minlevel AS 'entries:minlevel', npc_spells_effects_entries.maxlevel AS 'entries:maxlevel', 
                    npc_spells_effects_entries.se_base AS 'entries:se_base', npc_spells_effects_entries.se_limit AS 'entries:se_limit',
                    npc_spells_effects_entries.se_max AS 'entries:se_max'
                    FROM npc_spells_effects
                    LEFT JOIN npc_spells_effects_entries ON npc_spells_effects.id = npc_spells_effects_entries.npc_spells_effects_id
                    WHERE npc_spells_effects.id = '${effects.parent_list}'
                    `;

                    SQLdata = await db.raw(queryStr);
                    let parentList = new Treeize;
                    SQLdata[0] = sanitize(SQLdata[0]);
                    effects.parent_list = parentList.grow(SQLdata[0]).getData()[0];
                }
                return effects;
            }
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Effects: ' + error);
        }

    },

    getLoot: async (loottableID) =>
    {
        if (loottableID == 0)
        {
            return null;
        }

        let queryStr = `
        SELECT loottable.id, loottable.name, loottable.mincash, loottable.maxcash, loottable.avgcoin, 
        loottable_entries.lootdrop_id AS 'lootdrops:id', lootdrop.name AS 'lootdrops:name', loottable_entries.multiplier AS 'lootdrops:multiplier', 
        loottable_entries.droplimit AS 'lootdrops:droplimit', loottable_entries.mindrop AS 'lootdrops:mindrop', 
        loottable_entries.probability AS 'lootdrops:probability', lootdrop_entries.item_id AS 'lootdrops:entries:id', items.Name AS 'lootdrops:entries:name', 
        lootdrop_entries.item_charges AS 'lootdrops:entries:item_charges', lootdrop_entries.equip_item AS 'lootdrops:entries:equip_item',
        lootdrop_entries.chance AS 'lootdrops:entries:chance', lootdrop_entries.minlevel AS 'lootdrops:entries:minlevel', 
        lootdrop_entries.maxlevel AS 'lootdrops:entries:maxlevel',lootdrop_entries.multiplier AS 'lootdrops:entries:multiplier'
        FROM loottable
        LEFT JOIN loottable_entries ON loottable.id = loottable_entries.loottable_id
        LEFT JOIN lootdrop ON loottable_entries.lootdrop_id = lootdrop.id
        LEFT JOIN lootdrop_entries ON lootdrop.id = lootdrop_entries.lootdrop_id
        LEFT JOIN items ON lootdrop_entries.item_id = items.id
        WHERE loottable.id = '${loottableID}'
        `;

        try
        {
            let SQLdata = await db.raw(queryStr);

            if (!SQLdata[0].length)
            {
                return null;
            }
            else
            {
                let loot = new Treeize();
                SQLdata[0] = sanitize(SQLdata[0]);
                loot = loot.grow(SQLdata[0]).getData()[0]

                return loot;
            }
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Loot: ' + error);
        }

    },

    getMerchantTable: async (merchanttableID) =>
    {
        if (merchanttableID == 0)
        {
            return null;
        }

        let queryStr = `
        SELECT merchantlist.merchantid AS 'id', merchantlist.slot AS 'items:slot', merchantlist.item AS 'items:id', 
        items.Name AS 'items:name', merchantlist.faction_required AS 'items:faction_required', 
        merchantlist.level_required AS 'items:level_required', merchantlist.alt_currency_cost AS 'items:alt_currency_cost', 
        merchantlist.classes_required AS 'items:classes_required', merchantlist.probability AS 'items:probability'
        FROM merchantlist
        LEFT JOIN items ON items.id = merchantlist.item
        WHERE merchantlist.merchantid = '${merchanttableID}'
        `;

        try
        {
            let SQLdata = await db.raw(queryStr);

            if (!SQLdata[0].length)
            {
                return null;
            }
            else
            {
                let merchantTable = new Treeize;
                SQLdata[0] = sanitize(SQLdata[0]);
                merchantTable = merchantTable.grow(SQLdata[0]).getData()[0];

                return merchantTable;
            }
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Merchant Table: ' + error);
        }

    },

    getFactions: async (factionID) =>
    {
        if (factionID == 0)
        {
            return null;
        }

        let queryStr = `
        SELECT npc_faction.id, npc_faction.name, npc_faction.primaryfaction AS 'primaryfaction_id', 
        parentFaction.name AS 'primaryfaction_name', npc_faction.ignore_primary_assist, npc_faction_entries.value AS 'entries:value', 
        npc_faction_entries.npc_value AS 'entries:npc_value', npc_faction_entries.temp AS 'entries:temp', 
        faction_list.id AS 'entries:faction_id', faction_list.name AS 'entries:name'
        FROM npc_faction
        LEFT JOIN faction_list AS parentFaction ON npc_faction.primaryfaction = parentFaction.id
        LEFT JOIN npc_faction_entries ON npc_faction.id = npc_faction_entries.npc_faction_id
        LEFT JOIN faction_list ON npc_faction_entries.faction_id = faction_list.id
        WHERE npc_faction.id = '${factionID}'
        `;

        try
        {
            let SQLdata = await db.raw(queryStr);
            let factions = new Treeize;
            SQLdata[0] = sanitize(SQLdata[0]);
            factions = factions.grow(SQLdata[0]).getData();
            return factions[0];
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Factions: ' + error);
        }
    },

    getEmotes: async (emoteID) =>
    {
        if (emoteID == 0)
        {
            return null;
        }

        let queryStr = `
        SELECT npc_emotes.emoteid, npc_emotes.id AS 'entries:id', npc_emotes.event_ AS 'entries:event_', 
        npc_emotes.type AS 'entries:type', npc_emotes.text AS 'entries:text'
        FROM npc_emotes
        WHERE npc_emotes.emoteid = '${emoteID}'
        `;

        try
        {
            let SQLdata = await db.raw(queryStr);
            let emotes = new Treeize;
            SQLdata[0] = sanitize(SQLdata[0]);
            emotes = emotes.grow(SQLdata[0]).getData();
            return emotes[0];
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Emotes: ' + error);
        }
    },

    getTints: async (tintID) =>
    {
        if (tintID == 0)
        {
            return null;
        }

        let queryStr = `SELECT * FROM npc_types_tint WHERE npc_types_tint.id = '${tintID}'`;

        try
        {
            let tints = await db.raw(queryStr);
            if (!tints[0].length)
            {
                return null;
            }
            else
            {
                return tints[0][0];
            }
        }
        catch (error)
        {
            throw new Error('Error Retrieving NPC Tints: ' + error);
        }
    },

    searchNPCOptions: async (searchTerm) =>
    {
        let queryStr = `
        SELECT id, name
        FROM npc_types
        WHERE id LIKE '${searchTerm}%'
        OR name LIKE '%${searchTerm}%'
        `

        let results = await db.raw(queryStr);
        return results[0];
    },

    searchNPCSpellSetOptions: async (searchTerm) =>
    {
        let queryStr = `
        SELECT id, name
        FROM npc_spells
        WHERE id LIKE '${searchTerm}%'
        OR name LIKE '%${searchTerm}%'
        `

        let results = await db.raw(queryStr);
        return results[0];
    },

    searchNPCEffectSetOptions: async (searchTerm) =>
    {
        let queryStr = `
        SELECT id, name
        FROM npc_spells_effects
        WHERE id LIKE '${searchTerm}%'
        OR name LIKE '%${searchTerm}%'
        `

        let results = await db.raw(queryStr);
        return results[0];
    },

    searchNPCFactionOptions: async (searchTerm) =>
    {
        let queryStr = `
        SELECT id, name
        FROM npc_faction
        WHERE id LIKE '${searchTerm}%'
        OR name LIKE '%${searchTerm}%'
        `

        let results = await db.raw(queryStr);
        return results[0];
    },

    searchNPCTintOptions: async (searchTerm) =>
    {
        let queryStr = `
        SELECT id, tint_set_name
        FROM npc_types_tint
        WHERE id LIKE '${searchTerm}%'
        OR tint_set_name LIKE '%${searchTerm}%'
        `

        let results = await db.raw(queryStr);
        return results[0];
    },

    getTintList: async () =>
    {
        return await db.select('npc_types_tint', ['id', 'tint_set_name'], {});
    },

    getRaceList: async () =>
    {
        return await db.select('races', ['id', 'name'], {});
    },

    getNPCFactionList: async () =>
    {
        return await db.select('npc_faction', ['id', 'name'], {});
    },

    getNPCSpellSetList: async () =>
    {
        return await db.select('npc_spells', ['id', 'name'], {});
    },

    getNPCEffectSetList: async () =>
    {
        return await db.select('npc_spells_effects', ['id', 'name'], {});
    }

}