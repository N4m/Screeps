var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var spawner = require('spawner');
var utilities = require('utilities');
var spawnInterval = 5;

module.exports.loop = function () {
    
    // Always place this memory cleaning code at the very top of your main loop!
    utilities.clearDead();
    
    if (Game.time % spawnInterval == 0) {
        spawner.run();
    }
    // if (Game.time % 10 == 0) {
    //     console.log('10th Tick Loop');
    // }
    
    // console.log(Math.floor(Math.random()*2));

    // var tower = Game.getObjectById('d3a93b33e9f7c914d222dfb5');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

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
}
