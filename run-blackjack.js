const Blackjack = require('./blackjack');
const game = new Blackjack();


console.log(`
Welcome to the blackjack table. Press the following keys to play.
d -> deal: this will start the game
h -> hit: this will hit
s -> stay (stand): this will end your turn and allow the dealer to draw
q -> quit: you will leave the table
ctrl + c -> quit
`)

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.name === 'd') {
    game.deal();
  } else if (key.name === 'h') {
    game.hit();
  } else if (key.name === 's') {
    game.stay();
  } else if (key.name === 'q' || key.ctrl && key.name === 'c') {
    process.kill(process.pid, 'SIGINT')
  }
});
