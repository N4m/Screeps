/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var utilities = require('utilities');
var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (typeof creep.memory.source === "undefined") {
            creep.memory.source = utilities.getNextSource(creep);
            console.log('Setting creep ('+creep.name+') source to '+creep.memory.source);
        // } else {
        //     console.log('Creep already set to '+ creep.memory.source);
        }
        var closest;
	    if(creep.carry.energy < creep.carryCapacity) {
            if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source]);
            }
        } else {
            // var targets = creep.room.find(FIND_STRUCTURES, {
            //         filter: (structure) => {
            //             return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER) &&
            //             structure.energy < structure.energyCapacity;
            //         }
            // });
            // if(targets.length > 0) {
            //     closest = utilities.getClosestStructure(creep, targets);
            //     if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //         creep.moveTo(closest);
            //     }
            // } else {
                //  || structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
                if(containers.length > 0) {
                    closest = utilities.getClosestStructure(creep, containers);
                    if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closest);
                    }
                }
            // }
        }
	}
};

module.exports = roleHarvester;
