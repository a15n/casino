const Blackjack = require('./blackjack');

// allow calling functions with keypress of 'd', 'h', 's' (and 'ctrl' + 'c')
// run `node blackjack.js` to sidestep these controls and instead
// use game.deal(), game.hit(), and game.stay();
const game = new Blackjack();
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
  } else if (key.ctrl && key.name === 'c') {
    process.kill(process.pid, 'SIGINT')
  }
});
