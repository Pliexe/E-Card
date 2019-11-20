const cards = [['citizen', 'citizen', 'citizen', 'citizen', 'slave'], ['citizen', 'citizen', 'citizen', 'citizen', 'emperor']];

class Ecard
{
    constructor(options)
    {
        options = options || [];

        this.players = [new Player(options.player1id || 'player1'), new Player(options.player2id || 'player2')];
        this.rounds = options.rounds || 6;

        this.deckStart = options.deckStart || Math.floor(Math.random() * 2);
        this.players[0].cards = cards[this.deckStart];
        this.players[1].cards = cards[(this.deckStart === 1 ? 0 : 1)];
        this.whoGoesFirst = Math.floor(Math.random() * 2);
        this.round = 0;
        this.roudi = 1;
    }

    putCard(card)
    {
        if (!this.players[0].card) {
            if (!this.players[0].cards.includes(card)) throw new Error("You may not play a card that you don't have!");
            this.players[0].card = card;
        }
        else
            if (!this.players[1].card) {
                if (!this.players[1].cards.includes(card)) throw new Error("You may not play a card that you don't have!");
                this.players[1].card = card;

                let result = Ecard.Result(this.players[0].card, this.players[1].card)

                if (result === 1) {
                    this.players[0].wins = this.players[0].card === 'slave' ? this.players[0].wins + 5 : this.players[0].wins + 1;
                    this.round++;
                    this.whoGoesFirst = this.whoGoesFirst === 1 ? 0 : 1;
                    if (this.round >= (3 * this.roundi)) {
                        this.deckStart = this.deckStart === 1 ? 0 : 1;
                        this.roundi++;
                    }
                    delete this.players[0].card;
                    delete this.players[1].card;
                    this.players[0].cards = cards[this.deckStart];
                    this.players[1].cards = cards[(this.deckStart === 1 ? 0 : 1)];
                    if (this.round >= this.rounds) return this.players;
                } else if (result === 0) {
                    this.players[1].wins = this.players[1].card === 'slave' ? this.players[1].wins + 5 : this.players[1].wins + 1;
                    this.round++;
                    this.whoGoesFirst = this.whoGoesFirst === 1 ? 0 : 1;
                    if (this.round >= (3 * this.roundi)) {
                        this.deckStart = this.deckStart === 1 ? 0 : 1;
                        this.roundi++;
                    }
                    delete this.players[0].card;
                    delete this.players[1].card;
                    this.players[0].cards = cards[this.deckStart];
                    this.players[1].cards = cards[(this.deckStart === 1 ? 0 : 1)];
                    if (this.round >= this.rounds) return this.players;
                } else {
                    this.players[0].cards = this.players[0].cards.filter(c => c != this.players[0].card);
                    this.players[1].cards = this.players[1].cards.filter(c => c != this.players[1].card);
                    delete this.players[0].card;
                    delete this.players[1].card;
                }
            }
    }

    static Result(card1, card2)
    {
        switch (card1) {
            case 'citizen':
                return card2 === 'slave' ? 1 : 0;
            case 'slave':
                return card2 === 'emperor' ? 1 : 0;
            case 'citizen':
                return card2 === 'slave' ? 1 : 0;
            default:
                return 2;
        }
    }
}

class Player
{
    constructor(id)
    {
        this.id = id;
        this.deck = [];
        this.wins = 0;
    }
}

module.exports = Ecard;