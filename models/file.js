const knex = require(__serverRoot + '/db/db.js').knex,
    EQClasses = require(__serverRoot + '/lib/EQClasses.js'),
    EQSkills = require(__serverRoot + '/lib/EQSkills.js'),
    EQClass = require(__serverRoot + '/models/EQClass.js'),
    XLSX = require('xlsx'),
    mysqlDump = require(__serverRoot + '/db/mysqldump.js'),
    archiver = require('archiver'),
    os = require('os'),
    fs = require('fs-extra'),
    moment = require('moment'),
    path = require('path'),
    DelimiterTransform = require(__serverRoot + '/lib/DelimiterTransform.js'),
    __chrDirectory = path.resolve(__filesdir + '/chr');

/******************************************************/

const file = {

    async exportClassBaseDataWorkbook()
    {
        try
        {
            let workbook = XLSX.utils.book_new();

            for (let i = 1; i < 17; i++)
            {
                let baseData = await EQClass.getBaseData(i);
                let worksheet = XLSX.utils.json_to_sheet(baseData);
                XLSX.utils.book_append_sheet(workbook, worksheet, EQClasses.ClassShortNameByID[i]);
            }

            return workbook;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in file.exportClassBaseDataWorkbook(): ` + error);
        }
    },

    async importClassBaseDataWorkbook(workbook)
    {
        try
        {
            for (let i = 1; i < 17; i++)
            {
                let baseData = XLSX.utils.sheet_to_json(workbook.Sheets[EQClasses.ClassShortNameByID[i]]);

                for (let j = 0, len = baseData.length; j < len; j++)
                {
                    await EQClass.updateBaseData(i, baseData[j]);
                }
            }
            return 1;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in file.importClassBaseDataWorkbook(${workbook}): ` + error);
        }
    },

    async exportClassSkillCapsWorkbook()
    {
        try
        {
            let workbook = XLSX.utils.book_new();

            for (let i = 1; i < 17; i++)
            {
                let skillCaps = await EQClass.getSkillCaps(i);

                for (let j = 0, len = skillCaps.length; j < len; j++)
                {
                    skillCaps[j].skillID = EQSkills.SkillNameByID[skillCaps[j].skillID];
                }

                let worksheet = XLSX.utils.json_to_sheet(skillCaps);
                XLSX.utils.book_append_sheet(workbook, worksheet, EQClasses.ClassShortNameByID[i]);
            }

            return workbook;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in file.exportClassSkillCapsWorkbook(): ` + error);
        }
    },

    async importClassSkillCapsWorkbook(workbook)
    {
        try
        {
            for (let i = 1; i < 17; i++)
            {
                let classSkillCaps = XLSX.utils.sheet_to_json(workbook.Sheets[EQClasses.ClassShortNameByID[i]]);

                for (let j = 0, len = classSkillCaps.length; j < len; j++)
                {
                    let skill = classSkillCaps[j];
                    skill.skillID = EQSkills.SkillIDByName[skill.skillID];

                    await EQClass.updateSkillCaps(i, skill);
                }
            }
            return 1;
        }
        catch (error)
        {
            throw new Error(`EQLab: Error in file.importClassSkillCapsWorkbook(${workbook}): ` + error);
        }
    },

    addModelToZone(zoneName, model)
    {
        return new Promise((resolve, reject) =>
        {
            const filename = path.resolve(__chrDirectory + `/${zoneName}_chr.txt`);
            fs.readFile(filename)
                .then(data =>
                {
                    if (!data.includes(model))
                    {
                        data = data.toString();
                        let oldNumber = data.match(/\b\d+\b/);
                        let newNumber = (parseInt(oldNumber[0], 10) + 1).toString();
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
                                reject(error);
                            })
                    }
                })
                .catch(error =>
                {
                    reject(error);
                });
        });
    },

    addModelToAllZones(model)
    {
        return new Promise((resolve, reject) =>
        {
            fs.readdir(__chrDirectory)
                .then(files =>
                {
                    let count = 0;

                    for (let i = 0, len = files.length; i < len; i++)
                    {
                        let currentFile = files[i];
                        if (!!currentFile.match(/(_chr\.txt)/gi))
                        {
                            let filename = path.resolve(__chrDirectory + `/${currentFile}`);

                            fs.readFile(filename)
                                .then(data =>
                                {

                                    if (!data.includes(model))
                                    {
                                        data = data.toString();
                                        let oldNumber = data.match(/\b\d+\b/);
                                        let newNumber = (parseInt(oldNumber[0], 10) + 1).toString();
                                        let newData = data.replace(oldNumber, newNumber);
                                        newData = newData.trim();
                                        newData = newData.concat(os.EOL + model);

                                        fs.writeFile(filename, newData)
                                            .then(() =>
                                            {
                                                count++;
                                            })
                                            .catch(error =>
                                            {
                                                reject(error);
                                            })
                                    }
                                })
                                .catch(error =>
                                {
                                    reject(error);
                                });
                        }
                    }
                    resolve(count);
                })
                .catch(error =>
                {
                    reject(error);
                })
        });
    },

    createSpellsTxt()
    {
        return new Promise((resolve, reject) =>
        {
            const db = knex.select('*').from('spells_new').stream(
            {
                highWaterMark: 5
            });

            const transform = new DelimiterTransform(
            {
                delimiter: '^'
            });

            const file = fs.createWriteStream(path.resolve(__filesdir + '/spells_us.txt'),
            {
                encoding: 'utf8'
            });
            file.on('pipe', (src) =>
            {
                console.log('EQLab: Writing to spells_us.txt...');
            });
            file.on('error', (error) =>
            {
                console.error('EQLab: Error writing to spells_us.txt');
                file.destroy();
                reject(error);
            });
            file.on('finish', () =>
            {
                console.error('EQLab: Finished writing to spells_us.txt');
                resolve();
            });

            db.pipe(transform).pipe(file);
        });
    },

    createTempDatabaseDump(tempDirectory, timestamp, version = null)
    {
        console.log('EQLab: Dumping database...');
        return new Promise((resolve, reject) =>
        {
            const filetag = version ? version.toString() : timestamp;

            mysqlDump(
            {
                version: version,
                host: process.env.DB_HOST,
                port: process.env.DB_PORT,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_EQEMU_DATABASE,
                tables: ['npc_types', 'spawn2', 'spawnentry', 'spawngroup', 'spells_new'],
                extendedInsert: true, // use one insert for many rows
                addDropTable: true,
                addLocks: true,
                disableKeys: true, //adds /*!40000 ALTER TABLE table DISABLE KEYS */; before insert
                dest: path.resolve(tempDirectory + `/build-${filetag}.sql`)
            }, (error) =>
            {
                if (error)
                {
                    console.log('EQLab: Error while dumping database...');
                    reject(error);
                }
                console.log('EQLab: Database dump complete...');
                resolve();
            });
        });
    },

    createTempSpellsTxt(tempDirectory)
    {
        return new Promise((resolve, reject) =>
        {
            console.log('EQLab: Creating spells_us.txt...');

            const db = knex.select('*').from('spells_new').stream(
            {
                highWaterMark: 5
            });
            const transform = new DelimiterTransform(
            {
                delimiter: '^'
            });

            db
                .pipe(transform)
                .pipe(fs.createWriteStream(path.resolve(tempDirectory + '/spells_us.txt'),
                    {
                        encoding: 'utf8'
                    })
                    .on('pipe', (src) =>
                    {
                        console.log('EQLab: Writing to spells_us.txt...');
                    })
                    .on('error', (error) =>
                    {
                        console.error('EQLab: Error writing to spells_us.txt');
                        file.destroy();
                        reject(error);
                    })
                    .on('finish', () =>
                    {
                        console.error('EQLab: Finished writing to spells_us.txt');
                        resolve();
                    })
                )

        });
    },

    createTempDbStrTxt(tempDirectory)
    {
        return new Promise((resolve, reject) =>
        {
            console.log('EQLab: Copying current dbstr_us.txt...');
            fs.copyFile(path.resolve(__filesdir + '/dbstr_us.txt'), path.resolve(tempDirectory + '/dbstr_us.txt'))
                .then(() =>
                {
                    console.log('EQLab: Finished copying dbstr_us.txt');
                    resolve();
                })
                .catch(error =>
                {
                    console.log('EQLab: Error while copying dbstr_us.txt...');
                    reject(error);
                })
        });
    },

    compressTempFiles(tempDirectory, timestamp, version = null)
    {
        return new Promise((resolve, reject) =>
        {
            console.log('EQLab: Compressing files...');

            const filetag = version ? version.toString() + `-${timestamp}` : timestamp;
            const destination = path.resolve(__buildsdir + `/build-${filetag}.zip`);

            var output = fs.createWriteStream(destination);
            output.on('close', () =>
            {
                console.log('EQLab: Finished compressing files: ' + archive.pointer() + ' total bytes');
                resolve(destination);
            });
            output.on('end', () =>
            {
                console.log('Data has been drained');
            });


            var archive = archiver('zip',
            {
                zlib:
                {
                    level: 9 // Sets the compression level.
                } 
            });
            archive.on('warning', (err) =>
            {
                if (err.code === 'ENOENT')
                {
                    // log warning
                }
                else
                {
                    // throw error
                    reject(err);
                }
            });
            archive.on('error', (err) =>
            {
                reject(err);
            });

            archive.pipe(output);
            archive.directory(tempDirectory + '/', false);
            archive.finalize();
        });
    },

    // TO DO: Add socket.io event emitters
    createBuild(version = null)
    {
        return new Promise((resolve, reject) =>
        {

            const timestamp = moment().format("YYYY-MM-DD-HH_mm_ss");
            const tempDirectory = path.resolve(__tempdir + `/build-${timestamp}`);

            console.log('EQLab: Creating new build...');
            fs.mkdir(tempDirectory)
                .then(error =>
                {
                    if (error) reject(error);
                    return this.createTempDatabaseDump(tempDirectory, timestamp, version)
                })
                .then(() =>
                {
                    return this.createTempSpellsTxt(tempDirectory);
                })
                .then(() =>
                {
                    return this.createTempDbStrTxt(tempDirectory);
                })
                .then(() =>
                {
                    return this.compressTempFiles(tempDirectory, timestamp, version);
                })
                .then(newDirectory =>
                {
                    console.log('EQLab: Removing temporary folder...');
                    fs.remove(tempDirectory)
                        .then(() =>
                        {
                            console.log('EQLab: Temporary folder deleted successfully');
                            resolve(path.normalize(newDirectory));
                        })
                        .catch(err =>
                        {
                            reject(err);
                        });
                })
                .catch(error =>
                {
                    reject(error);
                })
        });
    }

}

module.exports = file;