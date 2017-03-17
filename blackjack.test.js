/*
let Blackjack = require('./blackjack'); let game = new Blackjack();
*/

const Blackjack = require('./blackjack');

const game = new Blackjack();

test('.card() returns correct types', () => {
  const card = game.getCard();
  expect(typeof card.number).toBe('number');
  expect(typeof card.suit).toBe('string');
});

test('.card().number should be within range', () => {
  const { number } = game.getCard();
  expect(number <= 14 && number >= 2).toBe(true);
});

test('.card().suit should be the correct suit', () => {
  const { suit } = game.getCard();
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  expect(suits.includes(suit)).toBe(true);
});

test('getBlackjackValue()', () => {
  const expectedValuesArrays = [
    [2, 2],
    [3, 3],
    [10,10],
    [11, 10],
    [12, 10],
    [13, 10],
    [14, 11],
  ]
  expectedValuesArrays.forEach(arr => {
    const [value, blackjackValue] = arr;
    expect(game.getBlackjackValue(value)).toBe(blackjackValue);
  });
});

test('getDisplayValue()', () => {
  expect(game.getDisplayValue(2)).toBe('two');
  expect(game.getDisplayValue(10)).toBe('ten');
  expect(game.getDisplayValue(12)).toBe('queen');
  expect(game.getDisplayValue(14)).toBe('ace');
})
