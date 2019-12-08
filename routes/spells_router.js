'use strict';

const spells_router = require('express').Router(),
    jsonParser = require('body-parser').json(),
    sanitizer = require('express-sanitize-escape').middleware(),
    validate = require('./validation/validate.js'),
    vResult = require('express-validator/check').validationResult,
    spell = require(__serverRoot + '/models/spell.js'),
    spell_template = require(__serverRoot + '/models/sequelize').spell_template,
    item = require(__serverRoot + '/models/item.js');

/*************************************************************************/

/**************************** TEMPLATES **********************************/

spells_router.delete("/templates/:templateID", async (req, res, next) =>
{
    spell_template.destroy(
        {
            where:
            {
                id: req.params.templateID
            }
        })
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next();
        });
});

spells_router.patch("/templates/:templateID", jsonParser, sanitizer, validate.spell, async (req, res, next) =>
{
    const errors = vResult(req);
    if (errors.isEmpty())
    {
        spell_template.update(req.body,
            {
                where:
                {
                    id: req.params.templateID
                }
            })
            .then(data =>
            {
                res.status(200).type('json').json(data);
            })
            .catch(error =>
            {
                next();
            });
    }
    else
    {
        res.status(400).type('json').json(
        {
            validationErrors: errors.formatWith(error => error.msg).mapped()
        });
    }
});

spells_router.post("/templates/:templateID", async (req, res, next) =>
{
    let template = (await spell_template.findById(req.params.templateID)).get();
    delete template.id;
    let newID = await npc.insert(template);
    let newNPC = await npc.select([],
    {
        id: newID
    });
    res.status(200).type('json').json(newNPC);
});

spells_router.post("/templates", (req, res, next) =>
{
    spell_template.create(
        {
            name: 'New Template'
        })
        .then(data =>
        {
            res.status(200).type('json').json(data.get());
        })
        .catch(error =>
        {
            next();
        });
});

spells_router.get("/templates/:templateID", async (req, res, next) =>
{
    try
    {
        const data = (await spell_template.findById(req.params.templateID)).get();

        if (data)
        {
            if (data.RecourseLink > 0)
            {
                recourseData = (await spell_template.findById(data.RecourseLink)).get();
            }

            let spellObject = {
                "spell":
                {
                    "form":
                    {
                        "data": data,
                        "descriptions": process.env.USE_AUTO_FILE_IO === 'TRUE' ? await spell.readSpellDescriptions(data.typedescnum, data.effectdescnum, data.descnum) : null
                    }
                },
                "recourse": data.RecourseLink > 0 ?
                {
                    "form":
                    {
                        "data": recourseData,
                        "descriptions": process.env.USE_AUTO_FILE_IO === 'TRUE' ? await spell.readSpellDescriptions(recourseData.typedescnum, recourseData.effectdescnum, recourseData.descnum) : null
                    }
                } : null
            }

            res.status(200).type('json').json(spellObject);
        }
        else
        {
            next();
        }
    }
    catch (error)
    {
        next();
    }
});

spells_router.get("/templates", (req, res, next) =>
{
    spell_template.findAll(
        {
            raw: true
        })
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next();
        });
});

/*************************** SPELL ********************************/

spells_router.delete("/:spellID", async (req, res, next) =>
{
    try
    {
        let result = await spell.delete(req.params.spellID);
        res.status(200).type('json').json(result);
    }
    catch (error)
    {
        next();
    }
});

spells_router.patch("/:spellID", jsonParser, sanitizer, validate.spell, async (req, res, next) =>
{
    const errors = vResult(req);
    if (errors.isEmpty())
    {
        try
        {
            let dataResult, damageshieldResult, descriptionsResult;
            if (req.body.data)
            {
                dataResult = await spell.update(req.params.spellID, req.body.data);
            }
            if (req.body.damageshield)
            {
                damageshieldResult = await spell.updateDamageShieldType(req.params.spellID, req.body.damageshield);
            }
            if (req.body.descriptions)
            {
                descriptionsResult = await spell.writeSpellDescriptions(req.body.descriptions);
            }
            res.status(200).type('json').json(data);
        }
        catch (error)
        {
            next();
        }
    }
    else
    {
        res.status(400).type('json').json(
        {
            validationErrors: errors.formatWith(error => error.msg).mapped()
        });
    }
});

spells_router.post("/copy/:spellID", (req, res, next) =>
{
    spell.copy(req.params.npcID).then(newSpellID =>
    {
        spell.select([],
        {
            id: newSpellID
        }).then(newSpell =>
        {
            res.status(200).type('json').json(newSpell);
        });
    });
});

spells_router.post("/", jsonParser, sanitizer, (req, res, next) =>
{
    spell.insert(req.body)
        .then(newSpellID =>
        {
            spell.select([],
                {
                    id: newSpellID
                })
                .then(newSpell =>
                {
                    res.status(200).type('json').json(newSpell);
                })
                .catch(error =>
                {
                    next();
                });
        })
        .catch(error =>
        {
            next();
        });
});

spells_router.get("/search/:searchTerm", async (req, res, next) =>
{
    spell.simpleSearch(req.params.searchTerm)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next();
        });
});

spells_router.post("/search", jsonParser, sanitizer, async (req, res, next) =>
{
    try
    {
        let data = await spell.search(req.body);
        res.status(200).type('json').json(data);
    }
    catch (error)
    {
        next();
    }
});

// 2550 - Zevfeer's Theft of Vitae
spells_router.get("/:spellID", async (req, res, next) =>
{
    let recourseData;
    try
    {
        const data = await spell.select([],
        {
            id: req.params.spellID
        });

        if (data.RecourseLink > 0)
        {
            recourseData = await spell.select([],
            {
                id: data.RecourseLink
            });
        }

        let spellObject = {
            "spell":
            {
                "form":
                {
                    "data": data,
                    "damageshield": await spell.selectDamageShieldType(['type'],
                    {
                        spellid: req.params.spellID
                    }),
                    "descriptions": process.env.USE_AUTO_FILE_IO === 'TRUE' ? await spell.readSpellDescriptions(data.typedescnum, data.effectdescnum, data.descnum) : null
                },
                "scrolls": await item.select(["id", "name", "nodrop", "price"],
                {
                    scrolleffect: req.params.spellID
                }),
                "effectitems": await spell.getEffectItems(req.params.spellID)
            },
            "recourse": data.RecourseLink > 0 ?
            {
                "form":
                {
                    "data": recourseData,
                    "damageshield": await spell.selectDamageShieldType(['type'],
                    {
                        spellid: data.RecourseLink
                    }),
                    "descriptions": process.env.USE_AUTO_FILE_IO === 'TRUE' ? await spell.readSpellDescriptions(recourseData.typedescnum, recourseData.effectdescnum, recourseData.descnum) : null
                },
                "scrolls": await item.select(["id", "name", "nodrop", "price"],
                {
                    scrolleffect: data.RecourseLink
                }),
                "effectitems": await spell.getEffectItems(data.RecourseLink)
            } : null
        }

        res.status(200).type('json').json(spellObject);
    }
    catch (error)
    {
        next();
    }
});

module.exports = spells_router;