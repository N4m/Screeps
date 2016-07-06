/*jshint esversion: 6 */
/*jshint loopfunc: true */
var utilities = require('utilities');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('rolemanager');
 * mod.thing == 'a thing'; // true
 */
var spawnInterval = 5;

var roles = {
    harvester: {
        amount: 2,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    },
    builder: {
        amount: 3,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    },
    healer: {
        amount: 0,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    },
    scout: {
        amount: 0,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    },
    supplier: {
        amount: 0,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    },
    upgrader: {
        amount: 2,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    },
    warrior: {
        amount: 0,
        body: {
            work: 2,
            carry: 1,
            move: 1
        }
    }
};

/*
 * Harvester Configuration
 * numHarvesters is the number of harvester creeps that should exist at all times
 * harvesterBody is the body configuration that will be used for spawning any new harvesters
 */
var numHarvesters = 2;
var harvesterConfig = {
    work: 2,
    carry: 1,
    move: 1
};

/*
 * Builder Configuration
 * numBuilders is the number of builder creeps that should exist at all times
 * builderBody is the body configuration that will be used for spawning any new builders
 */
var numBuilders = 3;
var builderConfig = {
    work: 2,
    carry: 1,
    move: 1
};

/*
 * Upgrader Configuration
 * numUpgraders is the number of upgrader creeps that should exist at all times
 * upgraderBody is the body configuration that will be used for spawning any new upgraders
 */
var numUpgraders = 2;
var upgraderConfig = {
    work: 2,
    carry: 1,
    move: 1
};

/*
 * Supplier Configuration
 * numSuppliers is the number of supplier creeps that should exist at all times
 * supplierBody is the body configuration that will be used for spawning any new suppliers
 */
var numSuppliers = 0;
var supplierBody = {
    work: 2,
    carry: 1,
    move: 1
};

var creepmanager = {
    run: function() {
        var me = this;
        me.runCreeps();
        if (Game.time % spawnInterval === 0) {
            me.spawner();
            me.dieingCreeps();
        }
    },
    dieingCreeps: function() {
        for (var c in Game.creeps) {
            var creep = Game.creeps[c];
            if (50 < creep.ticksToLive) {
                console.log('CREEPMANAGER: '+creep.name+' - '+creep.ticksToLive+' left');
            }
        }
    },
    runCreeps: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
        }
    },
    spawner: function() {
        for (var r in Game.rooms) {
            var room = Game.rooms[r];
            var spawners = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN;
                }
            });
            if(spawners.length > 0) {
                var spawner = spawners[0];

                for (var role in roles) {
                    roles[role].creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room == room);
                    // creepReport.push(role+'='+roles[role].creeps.length+'/'+roles[role].amount);
                    if (roles[role].creeps.length < roles[role].amount) {
                        newName = spawner.createCreep(newConfig, undefined, {role: newType});
                        if (_.isString(newName) && newName !== "") {
                            console.log('CREEPMANAGER: Spawning new ' + newType + ': ' + newName);
                        } else {
                            if (newName == -1) {
                                console.log('CREEPMANAGER: SPAWN ERROR: Not owner of spawn');
                            } else if (newName == -3) {
                                console.log('CREEPMANAGER: SPAWN ERROR: Creep with name already exists');
                            } else if (newName == -4) {
                                console.log('CREEPMANAGER: SPAWN ERROR: Spawn is already busy creating a creep');
                            } else if (newName == -6) {
                                console.log('CREEPMANAGER: SPAWN ERROR: Not enough energy to create ' + newType + ', body requires '+newCost+' you have '+room.energyAvailable+'/'+room.energyCapacityAvailable);
                                // console.log(newConfig);
                            } else if (newName == -10) {
                                console.log('CREEPMANAGER: SPAWN ERROR: Body is not properly described');
                            } else if (newName == -14) {
                                console.log('CREEPMANAGER: SPAWN ERROR: Room Controller level is not enough to use this spawn');
                            }
                        }
                        break;
                    }
                }
                // var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == room);
                // var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == room);
                // var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == room);
                // var suppliers = _.filter(Game.creeps, (creep) => creep.memory.role == 'supplier' && creep.room == room);
                // console.log('CREEPMANAGER: Creep Stats: ' +
                //     'Builders=' + builders.length + '/' + numBuilders + ', ' +
                //     'Harvesters=' + harvesters.length + '/' + numHarvesters + ', ' +
                //     'Upgraders='+upgraders.length + '/' + numUpgraders + ', ' +
                //     'Suppliers='+suppliers.length + '/' + numSuppliers
                // );
                // console.log({'Builders': builders.length, 'Harvesters': harvesters.length, 'Upgraders': upgraders.length, 'Suppliers': suppliers.length});

                // console.log(utilities.buildBody(harvesterConfig));

                // var newName = "";
                // var newType = "";
                // var newCost = 0;
                // var newConfig = [];
                // if(harvesters.length < numHarvesters) {
                //     newType = "harvester";
                //     newCost = utilities.getCost(harvesterConfig);
                //     newConfig = utilities.buildBody(harvesterConfig);
                // } else if(builders.length < numBuilders) {
                //     newType = "builder";
                //     newCost = utilities.getCost(builderConfig);
                //     newConfig = utilities.buildBody(builderConfig);
                // } else if(upgraders.length < numUpgraders) {
                //     newType = "upgrader";
                //     newCost = utilities.getCost(upgraderConfig);
                //     newConfig = utilities.buildBody(upgraderConfig);
                // }
                // if (newType !== "") {
                //     newName = spawner.createCreep(newConfig, undefined, {role: newType});
                // }
                // if (_.isString(newName) && newName !== "") {
                //     console.log('CREEPMANAGER: Spawning new ' + newType + ': ' + newName);
                // } else {
                //     if (newName == -1) {
                //         console.log('CREEPMANAGER: SPAWN ERROR: Not owner of spawn');
                //     } else if (newName == -3) {
                //         console.log('CREEPMANAGER: SPAWN ERROR: Creep with name already exists');
                //     } else if (newName == -4) {
                //         console.log('CREEPMANAGER: SPAWN ERROR: Spawn is already busy creating a creep');
                //     } else if (newName == -6) {
                //         console.log('CREEPMANAGER: SPAWN ERROR: Not enough energy to create ' + newType + ', body requires '+newCost+' you have '+room.energyAvailable+'/'+room.energyCapacityAvailable);
                //         // console.log(newConfig);
                //     } else if (newName == -10) {
                //         console.log('CREEPMANAGER: SPAWN ERROR: Body is not properly described');
                //     } else if (newName == -14) {
                //         console.log('CREEPMANAGER: SPAWN ERROR: Room Controller level is not enough to use this spawn');
                //     }
                // }
            }
        }
    },
    getRoles: function() {
        return roles;
    }
};
module.exports = creepmanager;
