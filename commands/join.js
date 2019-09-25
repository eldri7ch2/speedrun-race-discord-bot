const config = require('../config.json');
const seed = require('../commands/seed');

module.exports = (message, race, channel) => {
    let player = race.players.find(x => x.username === message.author.username);

    if (!race.started && !player) {

        if (race.players.length === 0) {
            channel.send('New race initiated.').then().catch(console.error);
            race.initiatedAt = new Date().getTime();
            seed(channel);
        } else if (((Math.floor(((new Date().getTime()) - race.initiatedAt)) / (1000 * 60)) >= parseInt(config.timeoutMinutes))) {
            race.started = false;
            race.startedAt = null;
            race.initiatedAt = null;
            race.remainingPlayers = 0;
            race.players = [];
            race.offset = parseInt(config.defaultOffset);
            channel.send('New race initiated.').then().catch(console.error);
            race.initiatedAt = new Date().getTime();
            seed(channel);
        }

        let newPlayer = {
            username: message.author.username,
            finished: false,
            forfeited: false,
            ready: false,
            time: null
        };
        race.players.push(newPlayer);
        race.remainingPlayers += 1;

        channel.send(message.author.username + ' has joined the race.').then().catch(console.error);

        return;
    }

    return;
};