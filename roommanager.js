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
        for (var r in Game.rooms) {
            var room = Game.rooms[r];
            if (Game.time % statusInterval === 0) {
                console.log('Room '+room.name+' Status Report: '+
                    'Level: '+room.controller.level+', ',
                    'Upgrade Progress: '+room.controller.progress+'/'+room.controller.progressTotal
                );
            }
        }
    }
};

module.exports = roommanager;
