'use strict';

const zone_router = require('express').Router(),
    jsonParser = require('body-parser').json(),
    sanitizer = require('express-sanitize-escape').middleware(),
    validate = require('./validation/validate.js'),
    vResult = require('express-validator/check').validationResult,
    fs = require('fs-extra'),
    zone = require(__serverRoot + '/models/zone.js');

/**********************************************************************/

/************************ ZONE EDITOR *********************************/

zone_router.get("/globalcharactergraphics", async (req, res, next) =>
{
    const filePath = `${__filesdir}\\graphics\\characters\\global_chr.zip`;
    const fileExists = await fs.pathExists(filePath);

    if (fileExists) 
    {
        res.status(200).type('application/zip').sendFile(filePath);
    } 
    else 
    {
        next();
    }
});

zone_router.get("/:zoneName/graphics", async (req, res, next) =>
{
    const filePath = `${__filesdir}\\graphics\\${req.params.zoneName}.zip`;
    const fileExists = await fs.pathExists(filePath);

    if (fileExists) 
    {
        res.status(200).type('application/zip').sendFile(filePath);
    } 
    else 
    {
        next();
    }
});

/*************************** SPAWNS ***********************************/

zone_router.delete("/spawn/spawngroup/:spawngroupID/spawnentry/:npcID", (req, res, next) =>
{
    zone.deleteSpawnentry(req.params.spawngroupID, req.params.npcID)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

// zone_router.patch("/spawn/spawngroup/spawnentries", (req, res, next) => {
// zone.updateSpawnentries(req.params.spawngroupID, req.params.npcID).then(data => {
// res.status(200).type('json').json(data);
// });
// });

zone_router.patch("/spawn/spawngroup/:spawngroupID/spawnentry/:npcID", (req, res, next) =>
{
    zone.updateSpawnentry(req.params.spawngroupID, req.params.npcID)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.post("/spawn/spawngroup/:spawngroupID/spawnentry/:npcID", (req, res, next) =>
{
    zone.insertSpawnentry(req.params.spawngroupID, req.params.npcID)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/spawn/spawngroup/:spawngroupID/spawnentry", (req, res, next) =>
{
    zone.getSpawnentries(req.params.spawngroupID)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.delete("/spawn/spawngroup/:id", (req, res, next) =>
{
    zone.deleteSpawngroup(req.params.id)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.patch("/spawn/spawngroup/:id", jsonParser, sanitizer, validate.spawngroup, async (req, res, next) =>
{
    const errors = vResult(req);
    if (errors.isEmpty())
    {
        const responses = [];
        if (req.body.spawngroup)
        {
            responses[0] = await zone.updateSpawngroup(req.params.id, req.body.spawngroup);
        }
        else
        {
            responses[0] = null;
        }

        if (req.body.spawnentries)
        {
            const entries = req.body.spawnentries;
            for (let i = 0, len = entries.length; i < len; i++)
            {
                responses[i + 1] = await zone.updateSpawnentry(entries[i].spawngroupID, entries[i].npcID, entries[i].chance);
            }
        }
        res.status(200).type('json').json(responses);
    }
    else
    {
        res.status(400).type('json').json(
        {
            validationErrors: errors.formatWith(error => error.msg).mapped()
        });
    }
});

zone_router.post("/spawn/:spawn2ID/spawngroup", jsonParser, sanitizer, (req, res, next) =>
{
    zone.insertSpawngroup(req.params.spawn2ID, req.body.zone)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/spawn/spawngroup/:id", (req, res, next) =>
{
    zone.selectSpawngroup(req.params.id)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/spawn/spawngroup/options/search/:searchTerm", (req, res, next) =>
{
    zone.searchSpawngroupOptions(req.params.searchTerm)
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.delete("/spawn/spawn2/:id", (req, res, next) =>
{
    zone.deleteSpawn2(req.params.id)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.patch("/spawn/spawn2/:id", jsonParser, sanitizer, validate.spawn2, (req, res, next) =>
{
    const errors = vResult(req);
    if (errors.isEmpty())
    {
        zone.updateSpawn2(req.params.id, req.body)
            .then(data =>
            {
                res.status(200).type('json').json(data);
            })
            .catch(error =>
            {
                next(error);
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

zone_router.post("/:zoneName/spawn/spawn2/", jsonParser, async (req, res, next) =>
{
    try {
        const spawn2Id = await zone.insertSpawn2(req.params.zoneName, req.body);
        const spawn2 = await zone.getSingleSpawn2Tree(spawn2Id);
        res.status(200).type('json').json(spawn2);
    } catch (error) {
        next(error);
    }
});

zone_router.get("/spawn/spawn2/:id", (req, res, next) =>
{
    zone.selectSpawn2(req.params.id)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/spawn/:spawn2ID", async (req, res, next) =>
{
    let spawn2, spawngroup;

    spawn2 = (await zone.selectSpawn2(req.params.spawn2ID))[0];

    if (spawn2.spawngroupID)
    {
        spawngroup = (await zone.selectSpawngroup(spawn2.spawngroupID))[0];
        spawngroup.spawnentries = await zone.getSpawnentries(spawngroup.id);
    }
    else
    {
        spawngroup = null
    }

    res.status(200).type('json').json(
    {
        spawn2,
        spawngroup
    });  
});

zone_router.get("/spawngroup/tree/:spawngroupID", (req, res, next) =>
{
    zone.getSingleSpawngroupTree(req.params.spawngroupID)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/spawn2/tree/:spawn2ID", (req, res, next) =>
{
    zone.getSingleSpawn2Tree(req.params.spawn2ID)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/fishing", (req, res, next) =>
{
    zone.getFishing(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/forage", (req, res, next) =>
{
    zone.getForage(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/incomingdoors", (req, res, next) =>
{
    zone.getIncomingDoors(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/doors", (req, res, next) =>
{
    zone.getDoors(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/traps", (req, res, next) =>
{
    zone.getTraps(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/groundspawns", (req, res, next) =>
{
    zone.getGroundSpawns(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/objects", (req, res, next) =>
{
    zone.getObjects(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/grid", (req, res, next) =>
{
    zone.getGrid(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/spawntree", (req, res, next) =>
{
    zone.getSpawnTree(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/blockedspells", (req, res, next) =>
{
    zone.getBlockedSpells(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/startzones", (req, res, next) =>
{
    zone.getStartZones(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/incomingzonepoints", (req, res, next) =>
{
    zone.getIncomingZonePoints(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/zonepoints", (req, res, next) =>
{
    zone.getZonePoints(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/zone", (req, res, next) =>
{
    zone.getZoneData(req.params.zoneName)
        .then(data =>
        {
            res.status(200).type('json').json(data);
        })
        .catch(error =>
        {
            next(error);
        });
});

zone_router.get("/:zoneName/full", async (req, res, next) =>
{
    const zoneName = req.params.zoneName;
    let data;

    try
    {
        data = {
            zoneData: await zone.getZoneData(zoneName),
            zonePoints: await zone.getZonePoints(zoneName),
            incomingZonePoints: await zone.getIncomingZonePoints(zoneName),
            startZones: await zone.getStartZones(zoneName),
            fishing: await zone.getFishing(zoneName),
            forage: await zone.getForage(zoneName),
            spawnTree: await zone.getSpawnTree(zoneName),
            grid: await zone.getGrid(zoneName),
            doors: await zone.getDoors(zoneName),
            incomingDoors: await zone.getIncomingDoors(zoneName),
            objects: await zone.getObjects(zoneName),
            traps: await zone.getTraps(zoneName),
            groundSpawns: await zone.getGroundSpawns(zoneName),
            blockedSpells: await zone.getBlockedSpells(zoneName)
        }
    }
    catch (error)
    {
        next(error);
    }

    res.status(200).type('json').json(data);
});

zone_router.get("/list", (req, res, next) =>
{
    zone.getZoneList()
        .then(data =>
        {
            res.status(200).type('json').json(data)
        })
        .catch(error =>
        {
            next(error);
        });
});

module.exports = zone_router;