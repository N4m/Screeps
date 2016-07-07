/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.supplier');
 * mod.thing == 'a thing'; // true
 */

var roleSupplier = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (typeof creep.memory.source === "undefined") {
            creep.memory.source = Math.floor(Math.random()*sources.length);
            console.log('Setting creep ('+creep.name+') source to '+creep.memory.source);
        // } else {
        //     console.log('Creep already set to '+ creep.memory.source);
        }
        var containers;
        var closest;
	    if(creep.carry.energy < creep.carryCapacity) {
            containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] !== 0;
                }
            });
            if(containers.length > 0) {
                closest = utilities.getClosestStructure(creep, containers);
                if(closest.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0]);
                }
            } else {
                if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.source]);
                }
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_CONTAINER || structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
            });
            if(targets.length > 0) {
                closest = utilities.getClosestStructure(creep, targets);
                if(creep.transfer(closest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }
            } else {
                //  || structure.store[RESOURCE_ENERGY] < structure.storeCapacity)
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.hits < structure.hitsMax;
                    }
                });
                if(targets.length > 0) {
                    // utilities.getDistance(creep.pos, targets[0].pos);
                    closest = utilities.getClosestStructure(creep, targets);
                    if(creep.repair(closest) == ERR_NOT_IN_RANGE) {
                        // console.log(targets[0].pos);
                        creep.moveTo(closest);
                    }
                }}
            }
        }
	}
};

module.exports = roleSupplier;
