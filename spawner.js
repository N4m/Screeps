/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('util.spawner');
 * mod.thing == 'a thing'; // true
 */

/*
 * Harvester Configuration
 * numHarvesters is the number of harvester creeps that should exist at all times
 * harvesterBody is the body configuration that will be used for spawning any new harvesters
 */
var numHarvesters = 1;
var harvesterConfig = {
    work: 2,
    carry: 1,
    move: 1
}

/*
 * Builder Configuration
 * numBuilders is the number of builder creeps that should exist at all times
 * builderBody is the body configuration that will be used for spawning any new builders
 */
var numBuilders = 0;
var builderConfig = {
    work: 2,
    carry: 1,
    move: 1
}

/*
 * Upgrader Configuration
 * numUpgraders is the number of upgrader creeps that should exist at all times
 * upgraderBody is the body configuration that will be used for spawning any new upgraders
 */
var numUpgraders = 1;
var upgraderConfig = {
    work: 2,
    carry: 1,
    move: 1
}

function buildBody(config) {
    var body = [];
    if (config.move && config.move !== 0) {
        for (var i = 0 ; i < config.move ; i++) {
            body.push(MOVE);
        }
    }
    if (config.work && config.work !== 0) {
        for (var i = 0 ; i < config.work ; i++) {
            body.push(WORK);
        }
    }
    if (config.carry && config.carry !== 0) {
        for (var i = 0 ; i < config.carry ; i++) {
            body.push(CARRY);
        }
    }
    if (config.attack && config.attack !== 0) {
        for (var i = 0 ; i < config.attack ; i++) {
            body.push(ATTACK);
        }
    }
    if (config.ranged_attack && config.ranged_attack !== 0) {
        for (var i = 0 ; i < config.ranged_attack ; i++) {
            body.push(RANGED_ATTACK);
        }
    }
    if (config.heal && config.heal !== 0) {
        for (var i = 0 ; i < config.heal ; i++) {
            body.push(HEAL);
        }
    }
    if (config.claim && config.claim !== 0) {
        for (var i = 0 ; i < config.claim ; i++) {
            body.push(CLAIM);
        }
    }
    if (config.tough && config.tough !== 0) {
        for (var i = 0 ; i < config.tough ; i++) {
            body.push(TOUGH);
        }
    }
    return body;
}
function getCost(config) {
    var cost = 0;
    if (config.move && config.move !== 0) {
        for (var i = 0 ; i < config.move ; i++) {
            cost += 50;
        }
    }
    if (config.work && config.work !== 0) {
        for (var i = 0 ; i < config.work ; i++) {
            cost += 100;
        }
    }
    if (config.carry && config.carry !== 0) {
        for (var i = 0 ; i < config.carry ; i++) {
            cost += 50;
        }
    }
    if (config.attack && config.attack !== 0) {
        for (var i = 0 ; i < config.attack ; i++) {
            cost += 80;
        }
    }
    if (config.ranged_attack && config.ranged_attack !== 0) {
        for (var i = 0 ; i < config.ranged_attack ; i++) {
            cost += 150;
        }
    }
    if (config.heal && config.heal !== 0) {
        for (var i = 0 ; i < config.heal ; i++) {
            cost += 250;
        }
    }
    if (config.claim && config.claim !== 0) {
        for (var i = 0 ; i < config.claim ; i++) {
            cost += 600;
        }
    }
    if (config.tough && config.tough !== 0) {
        for (var i = 0 ; i < config.tough ; i++) {
            cost += 10;
        }
    }
    return cost;
}

var spawner = {
    run: function() {
        for (var r in Game.rooms) {
            var room = Game.rooms[r];
            var spawners = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN
                }
            });
            if(spawners.length > 0) {
                var spawner = spawners[0];
                
                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == room);
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == room);
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == room);
                console.log('Creep Stats: Builders=' + builders.length + ', Harvesters=' + harvesters.length + ', Upgraders='+upgraders.length);
                
                // console.log(buildBody(harvesterConfig));
                
                var newName = "";
                var newType = "";
                var newCost = 0;
                var newConfig = [];
                if(harvesters.length < numHarvesters) {
                    newType = "harvester";
                    newCost = getCost(harvesterConfig);
                    newConfig = buildBody(harvesterConfig);
                } else if(builders.length < numBuilders) {
                    newType = "builder";
                    newCost = getCost(builderConfig);
                    newConfig = buildBody(builderConfig);
                } else if(upgraders.length < numUpgraders) {
                    newType = "upgrader";
                    newCost = getCost(upgraderConfig);
                    newConfig = buildBody(upgraderConfig);
                }
                if (newType !== "") {
                    newName = spawner.createCreep(newConfig, undefined, {role: newType});
                }
                if (_.isString(newName) && newName !== "") {
                    console.log('Spawning new ' + newType + ': ' + newName);
                } else {
                    if (newName == -1) {
                        console.log('SPAWN ERROR: Not owner of spawn');
                    } else if (newName == -3) {
                        console.log('SPAWN ERROR: Creep with name already exists');
                    } else if (newName == -4) {
                        console.log('SPAWN ERROR: Spawn is already busy creating a creep');
                    } else if (newName == -6) {
                        console.log('SPAWN ERROR: Not enough energy to create ' + newType + ', body requires '+newCost+' you have '+room.energyAvailable+'/'+room.energyCapacityAvailable);
                        // console.log(newConfig);
                    } else if (newName == -10) {
                        console.log('SPAWN ERROR: Body is not properly described');
                    } else if (newName == -14) {
                        console.log('SPAWN ERROR: Room Controller level is not enough to use this spawn');
                    }
                }
            }
        }
        
    }
}

module.exports = spawner;
