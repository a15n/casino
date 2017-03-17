const Blackjack = require('./blackjack');

const blackjackGame = new Blackjack();

test('.card() returns correct types', () => {
  const card = blackjackGame.getCard();
  expect(typeof card.number).toBe('number');
  expect(typeof card.suit).toBe('string');
});

test('.card().number should be within range', () => {
  const { number } = blackjackGame.getCard();
  expect(number <= 14 && number >= 2).toBe(true);
});

test('.card().suit should be the correct suit', () => {
  const { suit } = blackjackGame.getCard();
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  expect(suits.includes(suit)).toBe(true);
});
