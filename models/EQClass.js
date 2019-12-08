'use strict';

const db = require(__serverRoot + '/db/db.js').db,
    Treeize = require('treeize'),
    _ = require('lodash'),
    sanitize = require(__serverRoot + '/lib/sanitize.js'),
    EQSkills = require(__serverRoot + '/lib/EQSkills.js'),
    bitmaskOps = require(__serverRoot + '/lib/bitmaskOps.js');


module.exports = {

    getBaseData: async (classID) =>
    {
        if (classID == 0) return null;

        try
        {
            return (await db.select('base_data', ['level', 'hp', 'hp_fac', 'mana', 'mana_fac', 'end', 'end_fac', 'unk1', 'unk2'],
            {
                class: classID
            }));
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getBaseData(${classID}): ` + error);
        }
    },

    updateBaseData: async (classID, data) =>
    {
        if (classID == 0) return null;
        try
        {
            return (await db.update('base_data', data,
            {
                level: data.level,
                class: classID
            }));
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.updateBaseData(${classID}, ${data}): ` + error);
        }
    },

    getClassSkills: async (classID) =>
    {
        if (classID == 0) return null;

        try
        {
            let skills = (await db.select('class_skill', [],
            {
                class: classID
            }))[0];
            delete skills.class;
            delete skills.name;
            return skills;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getClassSkills(${classID}): ` + error);
        }
    },

    getSkillCaps: async (classID) =>
    {
        if (classID == 0) return null;

        try
        {
            let queryStr = `
            SELECT skill_caps.skillID AS 'skillID', skill_caps.level AS 'caps:level', skill_caps.cap AS 'caps:cap'
            FROM skill_caps
            WHERE skill_caps.class = '${classID}'
            ORDER BY skill_caps.skillID ASC
            `;

            let SQLdata = await db.raw(queryStr);
            let skillCaps = new Treeize();
            skillCaps = skillCaps.grow(SQLdata[0]).getData();

            for (let i = 0, len = skillCaps.length; i < len; i++)
            {
                for (let j = 0, len2 = skillCaps[i].caps.length; j < len2; j++)
                {
                    let obj = {};
                    obj[`lvl_${skillCaps[i].caps[j].level}`] = skillCaps[i].caps[j].cap;
                    skillCaps[i] = { ...skillCaps[i],
                        ...obj
                    }
                }
                delete skillCaps[i].caps;
            }

            return skillCaps;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getSkillCaps(${classID}): ` + error);
        }
    },

    updateSkillCaps: async (classID, skill) =>
    {
        if (classID == 0) return null;

        try
        {
            let formattedData = [];

            let skillID = skill.skillID;
            delete skill.skillID;

            // rename keys to match database schema
            skill = _.mapKeys(skill, (value, key) =>
            {
                return key.slice(key.indexOf("_") + 1);
            })

            // create array of objects to match database schema
            _.forEach(skill, (cap, level) =>
            {
                formattedData.push(
                {
                    skillID,
                    level,
                    cap
                })
            });

            for (let i = 0, len = formattedData.length; i < len; i++)
            {
                let s = formattedData[i];
                await db.update('skill_caps',
                {
                    cap: s.cap
                },
                {
                    class: classID,
                    skillID: s.skillID,
                    level: s.level
                });
            }

            return 1;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.updateSkillCaps(${classID}, ${skill}): ` + error);
        }
    },

    getSpells: async (classID) =>
    {
        if (classID == 0) return null;

        try
        {
            let queryStr = `
            SELECT id, name, classes${classID} AS 'level' FROM spells_new
            WHERE classes${classID} < 254
            `;

            let spells = (await db.raw(queryStr))[0];
            if (!spells)
            {
                return null;
            }
            else
            {
                spells = _.sortBy(spells, 'level');
                spells = _.groupBy(spells, 'level');
                return spells;
            }
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getSpells(${classID}): ` + error);
        }
    },

    getAltAdvVars: async (classID) =>
    {
        if (classID == 0) return null;
        let bitmask;
        let queryStr = `
        SELECT skill_id, name, cost, max_level, classes, berserker, class_type, aa_expansion
        FROM altadv_vars
        `;

        if (classID == 16)
        {
            bitmask = null;
            queryStr += " WHERE berserker = '1'";
        }
        else
        {
            bitmask = bitmaskOps.getAABitmask(classID);
            queryStr += ` WHERE classes >= '${bitmask}'`;
        }

        try
        {
            let unfilteredAAs = (await db.raw(queryStr))[0];
            if (!unfilteredAAs)
            {
                return {}
            };

            let filteredAAs = [];
            let AAs = {
                generalAA: [],
                archetypeAA: [],
                classAA: []
            };

            if (classID != 16)
            {
                filteredAAs = unfilteredAAs.filter(AA => bitmaskOps.AAClassIsEnabled(AA.classes, classID));
            }
            else if (classID == 16)
            {
                filteredAAs = unfilteredAAs;
            }

            for (let i = 0, len = filteredAAs.length; i < len; i++)
            {
                let AA = filteredAAs[i];
                if (AA.classes === 65534)
                {
                    AAs.generalAA.push(AA);
                }
                else if ((bitmask && AA.classes === bitmask) || (!bitmask && AA.classes === 0))
                {
                    AAs.classAA.push(AA);
                }
                else
                {
                    AAs.archetypeAA.push(AA);
                }
            }

            return AAs;

        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getAltAdvVars(${classID}): ` + error);
        }
    },

    getStartZones: async (classID) =>
    {
        if (classID == 0) return null;
        // "x": -510,
        // "y": 57,
        // "z": 31.75,
        // "heading": 0,
        // "zone_id": 1,
        // "bind_id": 0,
        // "player_choice": 1,
        // "player_class": 1,
        // "player_deity": 212,
        // "player_race": 1,
        // "start_zone": 1,
        // "bind_x": 0,
        // "bind_y": 0,
        // "bind_z": 0,
        // "select_rank": 50
        try
        {
            let queryStr = `
            SELECT start_zones.*, zone.short_name
            FROM start_zones
            LEFT JOIN zone ON start_zones.zone_id = zone.zoneidnumber
            WHERE start_zones.player_class = '${classID}'
            `;

            let startZones = (await db.raw(queryStr))[0];
            if (!startZones)
            {
                return null;
            }
            else
            {
                return startZones;
            }
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getStartZones(${classID}): ` + error);
        }
    },

    getStartingItems: async (classID) =>
    {
        if (classID == 0) return null;

        try
        {
            let queryStr = `
            SELECT starting_items.id, starting_items.race, starting_items.class, starting_items.deityid, starting_items.zoneid, 
            starting_items.itemid, items.Name AS 'item_name', starting_items.item_charges, starting_items.gm, starting_items.slot
            FROM starting_items
            LEFT JOIN items ON starting_items.itemid = items.id
            WHERE class = '${classID}' OR class = '0'
            `;

            let items = (await db.raw(queryStr))[0];
            if (!items)
            {
                return null;
            }
            else
            {
                return items;
            }
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getStartingItems(${classID}): ` + error);
        }
    },

    getTitles: async (classID) =>
    {
        if (classID == 0) return null;

        try
        {
            let queryStr = `
            SELECT *
            FROM titles
            WHERE class = '${classID}' OR class = '-1'
            `;

            let titles = (await db.raw(queryStr))[0];
            if (!titles)
            {
                return null;
            }
            else
            {
                return titles;
            }
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getTitles(${classID}): ` + error);
        }
    },

    getAAs: async (classID) =>
    {
        if (classID == 0) return null;
        let bitmask;
        let queryStr = `SELECT * FROM aa_ability`;

        if (classID == 16)
        {
            bitmask = null;
            queryStr += " WHERE berserker = '1'";
        }
        else
        {
            bitmask = bitmaskOps.getAABitmask(classID);
            queryStr += ` WHERE classes >= '${bitmask}'`;
        }

        try
        {
            let unfilteredAAs = (await db.raw(queryStr))[0];
            if (!unfilteredAAs)
            {
                return {}
            };

            let filteredAAs = [];
            let AAs = {
                generalAA: [],
                archetypeAA: [],
                classAA: []
            };

            if (classID != 16)
            {
                filteredAAs = unfilteredAAs.filter(AA => bitmaskOps.AAClassIsEnabled(AA.classes, classID));
            }
            else if (classID == 16)
            {
                filteredAAs = unfilteredAAs;
            }

            for (let i = 0, len = filteredAAs.length; i < len; i++)
            {
                let AA = filteredAAs[i];
                if (AA.classes === 65534)
                {
                    AAs.generalAA.push(AA);
                }
                else if ((bitmask && AA.classes === bitmask) || (!bitmask && AA.classes === 0))
                {
                    AAs.classAA.push(AA);
                }
                else
                {
                    AAs.archetypeAA.push(AA);
                }
            }

            return AAs;

        }
        catch (error)
        {
            throw new Error(`EQLab: Error in EQClass.getAAs(${classID}): ` + error);
        }
    }

}