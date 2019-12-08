'use strict';

const   db         = require(__serverRoot + '/db/db.js').db,
        Treeize    = require('treeize'),
        sanitize   = require(__serverRoot + '/lib/sanitize.js'),
        _          = require('lodash');

/*****************************************************************************/

const zone = {

    getZoneList: async () =>
    {
        try
        {
            return (await db.select('zone', ['id', 'zoneidnumber', 'short_name', 'long_name'], {}));
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getZoneList(): ` + error);
        }         
    },

    getZoneData: async (zoneName) =>
    {
        try
        {
            let queryStr = `SELECT * FROM zone WHERE short_name = '${zoneName}'`;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0][0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getZoneData(${zoneName}): ` + error);
        }
    },

    getZonePoints: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT zone_points.id, zone_points.zone, zone_points.version, zone_points.number, zone_points.y,
            zone_points.x, zone_points.z, zone_points.heading, zone_points.target_y, zone_points.target_x,
            zone_points.target_z, zone_points.target_heading, zone_points.zoneinst, zone_points.target_zone_id,
            zone.short_name AS 'target_zone_short_name', zone_points.target_instance, zone_points.buffer, zone_points.client_version_mask
            FROM zone_points
            LEFT JOIN zone ON zone_points.target_zone_id = zone.zoneidnumber
            WHERE zone_points.zone = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getZonePoints(${zoneName}): ` + error);
        }
    },

    getIncomingZonePoints: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT zone_points.id, zone_points.zone AS 'from_zone', zone_points.version AS 'from_zone_version', zone_points.target_y AS 'y', 
            zone_points.target_x AS 'x', zone_points.target_z AS 'z', zone_points.target_heading AS 'heading', zone_points.zoneinst, 
            zone_points.target_instance AS 'instance'
            FROM zone_points
            LEFT JOIN zone ON zone_points.target_zone_id = zone.zoneidnumber
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getIncomingZonePoints(${zoneName}): ` + error);
        }
    },

    getStartZones: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT start_zones.x, start_zones.y, start_zones.z, start_zones.heading,
            start_zones.zone_id, start_zones.bind_id, start_zones.player_choice, start_zones.player_class,
            start_zones.player_deity, start_zones.player_race, start_zones.start_zone, start_zones.bind_x,
            start_zones.bind_y, start_zones.bind_z, start_zones.select_rank
            FROM start_zones
            LEFT JOIN zone ON start_zones.zone_id = zone.zoneidnumber
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getStartZones(${zoneName}): ` + error);
        }
    },

    getBlockedSpells: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT blocked_spells.id, blocked_spells.spellid, spells_new.name AS 'spellname', blocked_spells.type,
            blocked_spells.zoneid, blocked_spells.x, blocked_spells.y, blocked_spells.z, blocked_spells.x_diff,
            blocked_spells.y_diff, blocked_spells.z_diff, blocked_spells.message, blocked_spells.description
            FROM blocked_spells
            LEFT JOIN zone ON zone.zoneidnumber = blocked_spells.zoneid
            LEFT JOIN spells_new ON spells_new.id = blocked_spells.spellid
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getBlockedSpells(${zoneName}): ` + error);
        }
    },

    getFishing: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT fishing.id, fishing.skill_level, fishing.chance, fishing.Itemid AS 'item_id', items.Name AS 'item_name', 
            fishing.npc_chance, fishing.npc_id, npc_types.name AS 'npc_name'
            FROM fishing
            LEFT JOIN zone ON fishing.zoneid = zone.zoneidnumber
            LEFT JOIN npc_types ON npc_types.id = fishing.npc_id
            LEFT JOIN items ON items.id = fishing.Itemid
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);
            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getFishing(${zoneName}): ` + error);
        }
    },

    getForage: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT forage.id, forage.level, forage.chance, forage.Itemid, items.Name
            FROM forage
            LEFT JOIN zone ON forage.zoneid = zone.zoneidnumber
            LEFT JOIN items ON items.id = forage.Itemid
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);
            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getForage(${zoneName}): ` + error);
        }
    },

    getDoors: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT doors.id, doors.doorid, doors.zone, doors.version, doors.name, doors.pos_y, doors.pos_x, doors.pos_z,
            doors.heading, doors.opentype, doors.guild, doors.lockpick, doors.keyitem, items.Name AS 'keyitem_name', doors.nokeyring,
            doors.triggerdoor, doors.triggertype, doors.doorisopen, doors.door_param, doors.dest_zone, doors.dest_instance, doors.dest_x,
            doors.dest_y, doors.dest_z, doors.dest_heading, doors.invert_state, doors.incline, doors.size, doors.buffer, doors.client_version_mask,
            doors.is_ldon_door
            FROM doors
            LEFT JOIN zone ON doors.zone = zone.short_name
            LEFT JOIN items ON doors.keyitem = items.id
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getDoors(${zoneName}): ` + error);
        }
    },

    getIncomingDoors: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT zone, doorid, dest_zone, dest_instance, dest_x, dest_y, dest_z, dest_heading
            FROM doors
            WHERE dest_zone = '${zoneName}' AND zone != '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getIncomingDoors(${zoneName}): ` + error);
        }
    },

    getTraps: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT traps.id, traps.zone, traps.version, traps.x, traps.y, traps.z, traps.chance,
            traps.maxzdiff, traps.radius, traps.effect, traps.effectvalue, spells_new.name AS 'spell_name', npc_types.name AS 'npc_name',
            traps.effectvalue2, traps.message, traps.skill, traps.level, traps.respawn_time, traps.respawn_var
            FROM traps
            LEFT JOIN spells_new ON traps.effect = 0 AND traps.effectvalue = spells_new.id
            LEFT JOIN npc_types ON (traps.effect = 2 OR traps.effect = 3) AND traps.effectvalue = npc_types.id
            WHERE zone = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getTraps(${zoneName}): ` + error);
        }
    },

    getGroundSpawns: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT ground_spawns.id, ground_spawns.version, ground_spawns.max_x, ground_spawns.max_y, ground_spawns.max_z,
            ground_spawns.min_x, ground_spawns.min_y, ground_spawns.heading, ground_spawns.name, ground_spawns.item, items.Name AS 'item_name',
            ground_spawns.max_allowed, ground_spawns.comment, ground_spawns.respawn_timer
            FROM ground_spawns
            LEFT JOIN zone ON ground_spawns.zoneid = zone.zoneidnumber
            LEFT JOIN items ON ground_spawns.item = items.id
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getGroundSpawns(${zoneName}): ` + error);
        }
    },

    getObjects: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT object.id, object.zoneid, object.version, object.xpos, object.ypos, object.zpos,
            object.heading, object.itemid, object.charges, object.objectname,
            object.type, object.icon, object.unknown08, object.unknown10, object.unknown20,
            object.unknown24, object.unknown60, object.unknown64, object.unknown68,
            object.unknown72, object.unknown76, object.unknown84, object.size,
            object.tilt_x, object.tilt_y
            FROM object
            LEFT JOIN zone ON object.zoneid = zone.zoneidnumber
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);

            return SQLdata[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getObjects(${zoneName}): ` + error);
        }
    },

    getGrid: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT grid.id, grid.zoneid, grid.type, grid.type2, grid_entries.zoneid AS 'grid_entries:zoneid', 
            grid_entries.gridid AS 'grid_entries:gridid', grid_entries.number AS 'grid_entries:number', 
            grid_entries.x AS 'grid_entries:x', grid_entries.y AS 'grid_entries:y', grid_entries.z AS 'grid_entries:z', 
            grid_entries.heading AS 'grid_entries:heading', grid_entries.pause AS 'grid_entries:pause'
            FROM grid
            LEFT JOIN zone ON grid.zoneid = zone.id
            LEFT JOIN grid_entries ON grid_entries.gridid = grid.id AND grid_entries.zoneid = zone.id
            WHERE zone.short_name = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);
            

            let grid = new Treeize();
            grid = grid.grow(SQLdata[0]).getData();
            
            return grid;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getGrid(${zoneName}): ` + error);
        }
    },

    getSpawnTree: async (zoneName) =>
    {
        try
        {
            let queryStr = `
            SELECT spawn2.id AS 'id', spawn2.zone, spawn2.version, spawn2.x, spawn2.y, spawn2.z, spawn2.enabled, spawn2.heading,
            spawn2.respawntime, spawn2.variance, spawn2.pathgrid, spawn2._condition, spawn2.cond_value, spawn2.animation,
            spawngroup.id AS 'spawngroup:id', spawngroup.name AS 'spawngroup:name', spawngroup.spawn_limit AS 'spawngroup:spawn_limit',
            spawngroup.dist AS 'spawngroup:dist', spawngroup.min_x AS 'spawngroup:min_x', spawngroup.min_y AS 'spawngroup:min_y',
            spawngroup.max_x AS 'spawngroup:max_x', spawngroup.max_y AS 'spawngroup:max_y', spawngroup.mindelay AS 'spawngroup:mindelay',
            spawngroup.delay AS 'spawngroup:delay', spawngroup.despawn AS 'spawngroup:despawn', spawngroup.despawn_timer AS 'spawngroup:despawn_timer',
            spawnentry.chance AS 'spawngroup:spawnentries:chance', spawnentry.npcID AS 'spawngroup:spawnentries:npc_id', 
            npc_types.name AS 'spawngroup:spawnentries:npc_name', npc_types.level AS 'spawngroup:spawnentries:npc_level', 
            npc_types.maxlevel AS 'spawngroup:spawnentries:npc_maxlevel', npc_types.race AS 'spawngroup:spawnentries:npc_race',
            npc_types.gender AS 'spawngroup:spawnentries:npc_gender', npc_types.texture AS 'spawngroup:spawnentries:npc_texture'
            FROM spawn2
            LEFT JOIN spawngroup ON spawn2.spawngroupID = spawngroup.id
            LEFT JOIN spawnentry ON spawn2.spawngroupID = spawnentry.spawngroupID
            LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
            WHERE spawn2.zone = '${zoneName}'
            `;

            let SQLdata = await db.raw(queryStr);
            let spawntree = new Treeize();
            spawntree = spawntree.grow(SQLdata[0]).getData();
            return spawntree;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getSpawnTree(${zoneName}): ` + error);
        }
    },

    getSingleSpawn2Tree: async (spawn2ID) =>
    {
        try
        {
            let queryStr = `
            SELECT spawn2.id AS 'id', spawn2.zone, spawn2.version, spawn2.x, spawn2.y, spawn2.z, spawn2.enabled, spawn2.heading,
            spawn2.respawntime, spawn2.variance, spawn2.pathgrid, spawn2._condition, spawn2.cond_value, spawn2.animation,
            spawngroup.id AS 'spawngroup:id', spawngroup.name AS 'spawngroup:name', spawngroup.spawn_limit AS 'spawngroup:spawn_limit',
            spawngroup.dist AS 'spawngroup:dist', spawngroup.min_x AS 'spawngroup:min_x', spawngroup.min_y AS 'spawngroup:min_y',
            spawngroup.max_x AS 'spawngroup:max_x', spawngroup.max_y AS 'spawngroup:max_y', spawngroup.mindelay AS 'spawngroup:mindelay',
            spawngroup.delay AS 'spawngroup:delay', spawngroup.despawn AS 'spawngroup:despawn', spawngroup.despawn_timer AS 'spawngroup:despawn_timer',
            spawnentry.chance AS 'spawngroup:spawnentries:chance', spawnentry.npcID AS 'spawngroup:spawnentries:npc_id', 
            npc_types.name AS 'spawngroup:spawnentries:npc_name', npc_types.level AS 'spawngroup:spawnentries:npc_level', 
            npc_types.maxlevel AS 'spawngroup:spawnentries:npc_maxlevel', npc_types.race AS 'spawngroup:spawnentries:npc_race',
            npc_types.gender AS 'spawngroup:spawnentries:npc_gender', npc_types.texture AS 'spawngroup:spawnentries:npc_texture'
            FROM spawn2
            LEFT JOIN spawngroup ON spawn2.spawngroupID = spawngroup.id
            LEFT JOIN spawnentry ON spawn2.spawngroupID = spawnentry.spawngroupID
            LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
            WHERE spawn2.id = '${spawn2ID}'
            `;

            let SQLdata = await db.raw(queryStr);
            let spawn2tree = new Treeize();
            spawn2tree = spawn2tree.grow(SQLdata[0]).getData()[0];
            return spawn2tree;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getSingleSpawn2Tree(${spawn2ID}): ` + error);
        }
    },

    getSingleSpawngroupTree: async (spawngroupID) =>
    {
        try
        {
            let queryStr = `
            SELECT spawngroup.id, spawngroup.name, spawngroup.spawn_limit,
            spawngroup.dist, spawngroup.min_x, spawngroup.min_y,
            spawngroup.max_x, spawngroup.max_y, spawngroup.mindelay,
            spawngroup.delay, spawngroup.despawn, spawngroup.despawn_timer,
            spawnentry.chance AS 'spawnentries:chance', 
            spawnentry.npcID AS 'spawnentries:npc_id', npc_types.name AS 'spawnentries:npc_name',
            npc_types.level AS 'spawnentries:npc_level', npc_types.maxlevel AS 'spawnentries:npc_maxlevel'
            FROM spawngroup
            LEFT JOIN spawnentry ON spawngroup.id = spawnentry.spawngroupID
            LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
            WHERE spawngroup.id = '${spawngroupID}'
            `;

            const SQLdata = await db.raw(queryStr);
            let spawngrouptree = new Treeize();
            spawngrouptree = spawngrouptree.grow(SQLdata[0]).getData();
            return spawngrouptree[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getSingleSpawngroupTree(${spawngroupID}): ` + error);
        }
    },

    getSpawnData: async (spawn2ID) =>
    {
        try
        {
            let queryStr = `
            SELECT spawn2.id AS 'spawn2id', spawn2.spawngroupID AS 'spawn2spawngroupID', spawn2.zone AS 'spawn2zone', 
            spawn2.version AS 'spawn2version',
            spawn2.x AS 'spawn2x', spawn2.y AS 'spawn2y', spawn2.z AS 'spawn2z', spawn2.heading AS 'spawn2heading', 
            spawn2.respawntime AS 'spawn2respawntime', spawn2.variance AS 'spawn2variance', spawn2.pathgrid AS 'spawn2pathgrid', 
            spawn2._condition AS 'spawn2_condition', spawn2.cond_value AS 'spawn2cond_value', spawn2.enabled AS 'spawn2enabled',
            spawn2.animation AS 'spawn2animation', spawngroup.id AS 'spawngroupid', spawngroup.name AS 'spawngroupname', 
            spawngroup.spawn_limit AS 'spawngroupspawn_limit', spawngroup.dist AS 'spawngroupdist', spawngroup.max_x AS 'spawngroupmax_x', 
            spawngroup.min_x AS 'spawngroupmin_x', spawngroup.max_y AS 'spawngroupmax_y', spawngroup.min_y AS 'spawngroupmin_y', 
            spawngroup.delay AS 'spawngroupdelay', spawngroup.mindelay AS 'spawngroupmindelay', spawngroup.despawn AS 'spawngroupdespawn',
            spawngroup.despawn_timer AS 'spawngroupdespawn_timer', spawnentry.spawngroupID AS 'spawnentryspawngroupID', 
            spawnentry.npcID AS 'spawnentrynpcID', spawnentry.chance AS 'spawnentrychance', 
            npc_types.name AS 'npc_typesname', npc_types.level AS 'npc_typeslevel', npc_types.maxlevel AS 'npc_typesmaxlevel'
            FROM spawn2
            LEFT JOIN spawngroup ON spawn2.spawngroupID = spawngroup.id
            LEFT JOIN spawnentry ON spawn2.spawngroupID = spawnentry.spawngroupID
            LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
            WHERE spawn2.id = '${spawn2ID}'
            `;

            const SQLdata = await db.raw(queryStr);

            let spawnentries = sanitize(SQLdata[0]),
                spawn2 = spawnentries[0] || null,
                spawn = {
                    spawn2: {},
                    spawngroup: {}
                }

            spawn.spawn2 = {
                "id": spawn2.spawn2id,
                "spawngroupID": spawn2.spawn2spawngroupID.toString(),
                "zone": spawn2.spawn2zone,
                "version": spawn2.spawn2version,
                "x": spawn2.spawn2x,
                "y": spawn2.spawn2y,
                "z": spawn2.spawn2z,
                "heading": spawn2.spawn2heading,
                "respawntime": spawn2.spawn2respawntime,
                "variance": spawn2.spawn2variance,
                "pathgrid": spawn2.spawn2pathgrid,
                "_condition": spawn2.spawn2_condition,
                "cond_value": spawn2.spawn2cond_value,
                "enabled": spawn2.spawn2enabled,
                "animation": spawn2.spawn2animation
            };

            if (spawn2.spawn2spawngroupID)
            {
                spawn.spawngroup = {
                    "id": spawn2.spawngroupid,
                    "name": spawn2.spawngroupname,
                    "spawn_limit": spawn2.spawngroupspawn_limit,
                    "dist": spawn2.spawngroupdist,
                    "max_x": spawn2.spawngroupmax_x,
                    "min_x": spawn2.spawngroupmin_x,
                    "max_y": spawn2.spawngroupmax_y,
                    "min_y": spawn2.spawngroupmin_y,
                    "delay": spawn2.spawngroupdelay,
                    "mindelay": spawn2.spawngroupmindelay,
                    "despawn": spawn2.spawngroupdespawn,
                    "despawn_timer": spawn2.spawngroupdespawn_timer,
                    "spawnentries": spawnentries.map(entry =>
                    {
                        return {
                            "spawngroupID": entry.spawnentryspawngroupID,
                            "npcID": entry.spawnentrynpcID,
                            "chance": entry.spawnentrychance,
                            "name": entry.npc_typesname,
                            "level": entry.npc_typeslevel,
                            "maxlevel": entry.npc_typesmaxlevel
                        }
                    })
                }
            }
            else
            {
                spawn.spawngroup = null;
            }
            return spawn;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getSpawnData(${spawn2ID}): ` + error);
        }
    },

    selectSpawn2: async (id = null) =>
    {
        try
        {
            return await db.select('spawn2', null, { id });
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.selectSpawn2(${id}): ` + error);
        }
    },

    insertSpawn2: async (zone = null, data) =>
    {
        if (zone)
        {
            try
            {
                return await db.insert('spawn2', { id: null, zone, x: data.x, y: data.y, z: data.z, spawngroupID: data.spawngroupID });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.insertSpawn2(${zone}): ` + error);
            }
        }
    },

    updateSpawn2: async (id = null, values) =>
    {
        if (id)
        {
            try
            {
                return await db.update('spawn2', values, { id });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.updateSpawn2(${id}, ${values}): ` + error);
            }
        }
    },

    deleteSpawn2: async (id = null) =>
    {
        if (id)
        {
            try
            {
                return await db.delete('spawn2', { id });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.deleteSpawn2(${id}): ` + error);
            }
        }
    },

    searchSpawngroupOptions: async (searchTerm) =>
    {
        try
        {
            let queryStr = `
            SELECT id, name
            FROM spawngroup
            WHERE id LIKE '${searchTerm}%'
            OR name LIKE '%${searchTerm}%'
            `
            return (await db.raw(queryStr))[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.searchSpawngroupOptions(${searchTerm}): ` + error);
        }
    },

    selectSpawngroup: async (id) =>
    {
        try
        {
            return await db.select('spawngroup', null, { id });
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.selectSpawngroup(${id}): ` + error);
        }
    },

    insertSpawngroup: async (spawn2ID = null, zone = 'noZone', values) =>
    {
        try
        {
            if (spawn2ID)
            {
                const name = `${zone}_${Date.now().toString()}`;
                const newSpawngroupID = await db.insert('spawngroup', { id: null, name });
                return await db.update('spawn2', { spawngroupID: newSpawngroupID }, { id: spawn2ID });
            }
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.insertSpawngroup(${spawn2ID}, ${zone}, ${values}): ` + error);
        }
    },

    updateSpawngroup: async (id = null, values) =>
    {
        if (id)
        {
            try
            {
                return await db.update('spawngroup', values, { id });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.updateSpawngroup(${id}, ${values}): ` + error);
            }
        }
    },

    deleteSpawngroup: async (id = null) =>
    {
        if (id)
        {
            try
            {
                await db.delete('spawnentry', { spawngroupID: id });
                await db.delete('spawngroup', { id });
                return await db.update('spawn2', { spawngroupID: null }, { spawngroupID: id });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.deleteSpawngroup(${id}): ` + error);
            }
        }
    },

    getSpawnentries: async (spawngroupID) =>
    {
        try
        {
            let queryStr = `
            SELECT spawnentry.*, npc_types.name, npc_types.level, npc_types.maxlevel
            FROM spawnentry
            LEFT JOIN npc_types ON spawnentry.npcID = npc_types.id
            WHERE spawnentry.spawngroupID = '${spawngroupID}'
            `
            return (await db.raw(queryStr))[0];
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in zone.getSpawnentries(${spawngroupID}): ` + error);
        }
    },

    insertSpawnentry: async (spawngroupID = null, npcID = null) =>
    {
        if (spawngroupID && npcID)
        {
            try
            {
                return await db.insert('spawnentry', { spawngroupID, npcID });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.insertSpawnentry(${spawngroupID}, ${npcID}): ` + error);
            }
        }
    },

    updateSpawnentry: async (spawngroupID = null, npcID = null, chance) =>
    {
        if (spawngroupID && npcID)
        {
            try
            {
                return await db.update('spawnentry', { chance }, { spawngroupID, npcID });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.updateSpawnentry(${spawngroupID}, ${npcID}): ` + error);
            }
        }
    },

    deleteSpawnentry: async (spawngroupID = null, npcID = null) =>
    {
        if (spawngroupID && npcID)
        {
            try
            {
                return await db.delete('spawnentry', { spawngroupID, npcID });
            }
            catch (error)
            {
                throw new Error(`EQLab: Error in zone.deleteSpawnentry(${spawngroupID}, ${npcID}): ` + error);
            }
        }
    }

}

module.exports = zone;