/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('utilities');
 * mod.thing == 'a thing'; // true
 */

var utilities = {
    clearDead: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    },
    buildBody: function(config) {
        var body = [];
        var i = 0;
        if (config.move && config.move !== 0) {
            for (i = 0 ; i < config.move ; i++) {
                body.push(MOVE);
            }
        }
        if (config.work && config.work !== 0) {
            for (i = 0 ; i < config.work ; i++) {
                body.push(WORK);
            }
        }
        if (config.carry && config.carry !== 0) {
            for (i = 0 ; i < config.carry ; i++) {
                body.push(CARRY);
            }
        }
        if (config.attack && config.attack !== 0) {
            for (i = 0 ; i < config.attack ; i++) {
                body.push(ATTACK);
            }
        }
        if (config.ranged_attack && config.ranged_attack !== 0) {
            for (i = 0 ; i < config.ranged_attack ; i++) {
                body.push(RANGED_ATTACK);
            }
        }
        if (config.heal && config.heal !== 0) {
            for (i = 0 ; i < config.heal ; i++) {
                body.push(HEAL);
            }
        }
        if (config.claim && config.claim !== 0) {
            for (i = 0 ; i < config.claim ; i++) {
                body.push(CLAIM);
            }
        }
        if (config.tough && config.tough !== 0) {
            for (i = 0 ; i < config.tough ; i++) {
                body.push(TOUGH);
            }
        }
        return body;
    },
    getCost: function(config) {
        var cost = 0;
        var i = 0;
        if (config.move && config.move !== 0) {
            for (i = 0 ; i < config.move ; i++) {
                cost += 50;
            }
        }
        if (config.work && config.work !== 0) {
            for (i = 0 ; i < config.work ; i++) {
                cost += 100;
            }
        }
        if (config.carry && config.carry !== 0) {
            for (i = 0 ; i < config.carry ; i++) {
                cost += 50;
            }
        }
        if (config.attack && config.attack !== 0) {
            for (i = 0 ; i < config.attack ; i++) {
                cost += 80;
            }
        }
        if (config.ranged_attack && config.ranged_attack !== 0) {
            for (i = 0 ; i < config.ranged_attack ; i++) {
                cost += 150;
            }
        }
        if (config.heal && config.heal !== 0) {
            for (i = 0 ; i < config.heal ; i++) {
                cost += 250;
            }
        }
        if (config.claim && config.claim !== 0) {
            for (i = 0 ; i < config.claim ; i++) {
                cost += 600;
            }
        }
        if (config.tough && config.tough !== 0) {
            for (i = 0 ; i < config.tough ; i++) {
                cost += 10;
            }
        }
        return cost;
    },
    getDistance: function(pos1, pos2) {
        console.log('Pos1:'+pos1);
        console.log('Pos2:'+pos2);
        console.log('Distance:'+Math.sqrt((pos1.x -= pos2.x) * pos1.x + (pos1.y -= pos2.y) * pos1.y));
    }
};
module.exports = utilities;
