/*jshint esversion: 6 */
/*jshint loopfunc: true */
var utilities = require('utilities');
var creepmanager = require('creepmanager');
var towermanager = require('towermanager');
/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('roommanager');
 * mod.thing == 'a thing'; // true
 */
var statusInterval = 5;

var roommanager = {
    run: function() {
        if (Game.time % statusInterval === 0) {
            var roles = creepmanager.getRoles();
            for (var r in Game.rooms) {
                var room = Game.rooms[r];
                console.log('ROOMMANAGER: Room '+room.name+' Status Report: '+
                    'Level: '+room.controller.level+', ',
                    'Upgrade Progress: '+room.controller.progress+'/'+room.controller.progressTotal
                );
                var creepReport = [];
                for (var role in roles) {
                    roles[role].creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role && creep.room == room);
                    creepReport.push(role+'='+roles[role].creeps.length+'/'+roles[role].amount);
                }
                console.log('ROOMMANAGER: Room Creep '+room.name+' Status Report: '+creepReport.join(', '));
                utilities.getNextSource(roles.harvester.creeps[0]);
                // var roomcreeps = [];
                // for (var c in Game.creeps) {
                //     if (Game.creeps[c].room == room) {
                //         roomcreeps.push(Game.creeps[c]);
                //     }
                // }
                // var role;
                // for (var rc in roomcreeps) {
                //     var creep = roomcreeps[rc];
                //     for (role in roles) {
                //         if (creep.memory.role == role) {
                //             if (roles[role].count) {
                //                 roles[role].count++;
                //             } else {
                //                 roles[role].count = 1;
                //             }
                //             break;
                //         }
                //     }
                // }
                // var creepStatus = [];
                // for (role in roles) {
                //     if (roles[role].count) {
                //         creepStatus.push(role+':'+roles[role].count+'/'+roles[role].ammount);
                //     }
                // }
                // console.log('ROOMMANAGER: Room Creep '+room.name+' Status Report: '+creepStatus.join(', '));
            }
        }
    }
};

module.exports = roommanager;
