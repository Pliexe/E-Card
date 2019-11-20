const Ecard = require('./index');

const EcardGame = new Ecard({ rounds: 3 });

EcardGame.putCard('citizen');
EcardGame.putCard('citizen');

EcardGame.putCard('citizen');
EcardGame.putCard('slave');

EcardGame.putCard('citizen');
EcardGame.putCard('slave');

EcardGame.putCard('citizen');
EcardGame.putCard('slave');

EcardGame.putCard('citizen');
EcardGame.putCard('slave');

console.log(EcardGame);