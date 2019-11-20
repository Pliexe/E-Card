const shortid = require('shortid');

module.exports = class Ecard
{
    /**
     * 
     * @param {String} options.player1ID - ID for player 1
     * @param {String} options.player2ID - ID for player 2
     * @param {Number} options.rounds - Set the amount of rounds for the whole game
     */

    constructor(options)
    {
        options = options || [];

        player1id = options.player1ID || shortid.generate();
        player2id = options.player2ID || shortid.generate();
        this.rounds = options.rounds || 12;
        this.rounds = isNaN(this.rounds) ? 12 : this.rounds;

        this.player1 = new Player(player1ID);
        this.player2 = new Player(player2ID);

        this.round = 0; // Set round number to 0
    }

    startRound()
    {
        let game = new Game(this.player1, this.player2);
        this.round++;
    }
}

class Game
{
    constructor(player1, player2)
    {
        this.cards1 = ['citizen', 'citizen', 'citizen', 'citizen', 'slave'];
        this.cards2 = ['citizen', 'citizen', 'citizen', 'citizen', 'emperor'];

        this.startRound((Math.floor(Math.random() * 2) == 0) ? this.player1 : this.player2);
    }

    startRound(player)
    {
    }
}

class Player
{
    constructor(id)
    {
        this.id = id;
        this.wins = 0;
    }
}