/*jshint esversion: 6 */
/*jshint loopfunc: true */
var utilities = require('utilities');
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
var numBuilders = 2;
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

var spawner = {
    run: function() {
        for (var r in Game.rooms) {
            var room = Game.rooms[r];
            var spawners = room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_SPAWN;
                }
            });
            if(spawners.length > 0) {
                var spawner = spawners[0];

                var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder' && creep.room == room);
                var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester' && creep.room == room);
                var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader' && creep.room == room);
                var suppliers = _.filter(Game.creeps, (creep) => creep.memory.role == 'supplier' && creep.room == room);
                console.log(
                    'Creep Stats: Builders=' + builders.length + '/' + numBuilders +
                    ', Harvesters=' + harvesters.length + '/' + numHarvesters +
                    ', Upgraders='+upgraders.length + '/' + numUpgraders +
                    ', Suppliers='+suppliers.length);
                // console.log({'Builders': builders.length, 'Harvesters': harvesters.length, 'Upgraders': upgraders.length, 'Suppliers': suppliers.length});

                // console.log(utilities.buildBody(harvesterConfig));

                var newName = "";
                var newType = "";
                var newCost = 0;
                var newConfig = [];
                if(harvesters.length < numHarvesters) {
                    newType = "harvester";
                    newCost = utilities.getCost(harvesterConfig);
                    newConfig = utilities.buildBody(harvesterConfig);
                } else if(builders.length < numBuilders) {
                    newType = "builder";
                    newCost = utilities.getCost(builderConfig);
                    newConfig = utilities.buildBody(builderConfig);
                } else if(upgraders.length < numUpgraders) {
                    newType = "upgrader";
                    newCost = utilities.getCost(upgraderConfig);
                    newConfig = utilities.buildBody(upgraderConfig);
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
};

module.exports = spawner;
