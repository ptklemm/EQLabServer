'use strict';

const db = require(__serverRoot + '/db/db.js').db,
    Treeize = require('treeize'),
    sanitize = require(__serverRoot + '/lib/sanitize.js'),
    fs = require('fs-extra'),
    escape = require(__serverRoot + '/lib/regexpEscape.js');


module.exports = {

    search: async (values) =>
    {
        try
        {
            let queryStr = `
            SELECT * FROM spells_new
            WHERE (id LIKE '${values.id ? values.id : ''}%' OR name LIKE '%${values.id ? values.id : ''}%')
            `;

            values.class 
              ? queryStr += ` AND classes${values.class} BETWEEN ${values.minlevel ? values.minlevel : '0'} AND ${values.maxlevel ? values.maxlevel : '254'}` 
              : null

            values.spell_category 
              ? queryStr += ` AND spell_category='${values.spell_category}'` 
              : null

            return (await db.raw(queryStr))[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.search(${values}): ` + error);
        }
    },

    simpleSearch: async (searchTerm = null) =>
    {
        if (!searchTerm) return null;
        try
        {
            let queryStr = `
            SELECT id, name FROM spells_new
            WHERE (id LIKE '${searchTerm}%' OR name LIKE '%${searchTerm}%')
            `
            return (await db.raw(queryStr))[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.simpleSearch(${searchTerm}): ` + error);
        }
    },

    select: async (columnsArr = null, whereObj) =>
    {
        try
        {
            return (await db.select('spells_new', columnsArr, whereObj))[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.select(${columnsArr}, ${whereObj}): ` + error);
        }
    },

    selectDamageShieldType: async (columnsArr = null, whereObj) =>
    {
        try
        {
            let dstype = (await db.select('damageshieldtypes', columnsArr, whereObj))[0];
            if (!dstype) { return null; }

            return dstype;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.selectDamageShieldType(${columnsArr}, ${whereObj}): ` + error);
        }
    },

    update: async (id = null, values) =>
    {
        if (!id) return;

        try
        {
            return await db.update('spells_new', values, { id });
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.update(${id}, ${values}): ` + error);
        }
    },

    updateDamageShieldType: async (spellid = null, values) =>
    {
        if (!spellid) return;

        try
        {
            return await db.update('damageshieldtypes', values, { spellid });
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.updateDamageShieldType(${spellid}, ${values}): ` + error);
        }
    },

    delete: async (id = null) =>
    {
        if (!id) return;

        try
        {
            return await db.delete('spells_new',
            {
                id
            });
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.delete(${id}): ` + error);
        }
    },

    readSpellDescriptions: (typedescnum = null, effectdescnum = null, descnum = null) =>
    {
        return new Promise((resolve, reject) =>
        {
            let descriptions = {
                nums:
                {
                    typedescnum,
                    effectdescnum,
                    descnum
                },
                typedesc: "",
                effectdesc: "",
                desc: ""
            }

            let typedescFound = false;
            const typedescRegExpString = `\\b${typedescnum}\\^5\\^(.+)`;
            const typedescRegExp = new RegExp(typedescRegExpString, "g");

            let effectdescFound = false;
            const effectdescRegExpString = `\\b${effectdescnum}\\^5\\^(.+)`;
            const effectdescRegExp = new RegExp(effectdescRegExpString, "g");

            let descFound = false;
            const descRegExpString = `\\b${descnum}\\^6\\^(.+)`;
            const descRegExp = new RegExp(descRegExpString, "g");

            let readStream = fs.createReadStream('../files/dbstr_us.txt',
            {
                encoding: 'utf8'
            });

            readStream
                .on('data', chunk =>
                {
                    if ((typedescnum && !typedescFound) || (effectdescnum && !effectdescFound) || (descnum && !descFound))
                    {
                        if (typedescnum && !typedescFound)
                        {
                            typedescFound = !!chunk.match(typedescRegExp);
                            typedescFound ? descriptions.typedesc = typedescRegExp.exec(chunk)[1] : null;
                        }

                        if (effectdescnum && !effectdescFound)
                        {
                            effectdescFound = !!chunk.match(effectdescRegExp);
                            effectdescFound ? descriptions.effectdesc = effectdescRegExp.exec(chunk)[1] : null;
                        }

                        if (descnum && !descFound)
                        {
                            descFound = !!chunk.match(descRegExp);
                            descFound ? descriptions.desc = descRegExp.exec(chunk)[1] : null;
                        }
                    }
                    else
                    {
                        readStream.destroy();
                    }
                })
                .on('close', error =>
                {
                    resolve(descriptions);
                })
                .on('error', error =>
                {
                    reject(new Error(`EQLab: Error in spell.readSpellDescriptions(${spellID}, ${typeID}, ${type2ID}): ` + error));
                });
        });
    },

    writeSpellDescriptions: (descriptions) =>
    {
        return new Promise((resolve, reject) =>
        {
            const typedescnum = descriptions.typedescnum || null;
            let typedescFound = false;
            const typedescRegExpString = `\\b${typedescnum}\\^5\\^(.+)`;
            const typedescRegExp = new RegExp(typedescRegExpString, "g");

            const effectdescnum = descriptions.effectdescnum || null;
            let effectdescFound = false;
            const effectdescRegExpString = `\\b${effectdescnum}\\^5\\^(.+)`;
            const effectdescRegExp = new RegExp(effectdescRegExpString, "g");

            const descnum = descriptions.descnum || null;
            let descFound = false;
            const descRegExpString = `\\b${descnum}\\^6\\^(.+)`;
            const descRegExp = new RegExp(descRegExpString, "g");

            fs.readFile('../files/dbstr_us.txt')
                .then(data =>
                {
                    if (!data.includes(model))
                    {
                        data = data.toString();
                        const oldNumber = data.match(/\b\d+\b/);
                        const newNumber = (parseInt(oldNumber[0], 10) + 1).toString();
                        let newData = data.replace(oldNumber, newNumber);
                        newData = newData.trim();
                        newData = newData.concat(os.EOL + model);

                        fs.writeFile(filename, newData)
                            .then(() =>
                            {
                                resolve();
                            })
                            .catch(error =>
                            {
                                reject(new Error(`EQLab: Error writing dbstr_us.txt spell.writeSpellDescriptions(${descriptions}): ` + error));
                            })
                    }
                })
                .catch(error =>
                {
                    reject(new Error(`EQLab: Error reading dbstr_us.txt spell.writeSpellDescriptions(${descriptions}): ` + error));
                });
        })
    },

    writeSpellDescriptionsStream: (descriptions) =>
    {
        return new Promise((resolve, reject) =>
        {
            const typedescnum = descriptions.typedescnum || null;
            let typedescFound = false;
            const typedescRegExpString = `\\b${typedescnum}\\^5\\^(.+)`;
            const typedescRegExp = new RegExp(typedescRegExpString, "g");

            const effectdescnum = descriptions.effectdescnum || null;
            let effectdescFound = false;
            const effectdescRegExpString = `\\b${effectdescnum}\\^5\\^(.+)`;
            const effectdescRegExp = new RegExp(effectdescRegExpString, "g");

            const descnum = descriptions.descnum || null;
            let descFound = false;
            const descRegExpString = `\\b${descnum}\\^6\\^(.+)`;
            const descRegExp = new RegExp(descRegExpString, "g");

            let readStream = fs.createReadStream('../files/dbstr_us.txt',
            {
                encoding: 'utf8'
            });

            readStream
                .on('data', chunk =>
                {
                    if ((typedescnum && !typedescFound) || (effectdescnum && !effectdescFound) || (descnum && !descFound))
                    {
                        if (typedescnum && !typedescFound)
                        {
                            typedescFound = !!chunk.match(typedescRegExp);
                        }

                        if (effectdescnum && !effectdescFound)
                        {
                            effectdescFound = !!chunk.match(effectdescRegExp);
                        }

                        if (descnum && !descFound)
                        {
                            descFound = !!chunk.match(descRegExp);
                        }
                    }
                    else
                    {
                        readStream.destroy();
                    }
                })
                .on('error', error =>
                {
                    reject(new Error(`EQLab: Error reading dbstr_us.txt in spell.writeSpellDescriptions(${descriptions}): ` + error));
                });

            let writeStream = fs.createWriteStream('../files/dbstr_us.txt',
            {
                encoding: 'utf8'
            });

            reject(new Error(`EQLab: Error in spell.writeSpellDescriptions(${descriptions}): ` + error));
        })
    },

    getEffectItems: async (spellID) =>
    {
        if (spellID == 0) return null;

        try
        {
            let queryStr = `
            SELECT id, name, 
            proceffect,  proclevel, proclevel2, 
            clickeffect, clicktype, clicklevel, clicklevel2, casttime_, recastdelay, recasttype, 
            focuseffect, focustype, focuslevel, focuslevel2
            FROM items
            WHERE proceffect='${spellID}' OR clickeffect='${spellID}' OR focuseffect='${spellID}'
            `;

            let effectitems = (await db.raw(queryStr))[0];
            if (!effectitems)
            {
                return null;
            }
            else
            {
                return effectitems;
            }
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in spell.getEffectItems(${spellID}): ` + error);
        }
    }

}