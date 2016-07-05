/*jshint esversion: 6 */
/*jshint loopfunc: true */
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.builder');
 * mod.thing == 'a thing'; // true
 */

var utilities = require('utilities');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (typeof creep.memory.source === "undefined") {
            creep.memory.source = Math.floor(Math.random()*sources.length);
            console.log('Setting creep ('+creep.name+') source to '+creep.memory.source);
        // } else {
        //     console.log('Creep already set to '+ creep.memory.source);
        }

	    if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	    }
        var closest;
	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            } else {
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
                }
            }
	    } else {
	        var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] !== 0;
                }
            });
            if(containers.length > 0) {
                closest = utilities.getClosestStructure(creep, containers);
                if(closest.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closest);
                }
            } else {
                if(creep.harvest(sources[creep.memory.source]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.source]);
                }
            }
	    }
	}
};

module.exports = roleBuilder;
