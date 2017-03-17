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
});

test('createCardObject({number: 11})', () => {
  const { number, blackjackValue, displayValue } = game.createCardObject({number: 11});
  expect(number).toBe(11);
  expect(blackjackValue).toBe(10);
  expect(displayValue).toBe('jack');
});


const easyInitNewBlackjackInstance = (playerNumbersArray, dealerNumbersArray) => {
  const utilBlackjack = new Blackjack();
  return new Blackjack(
    // player hand
    [ ...playerNumbersArray.map(n => utilBlackjack.createCardObject({number: n})) ],
    // dealer hand
    [ ...dealerNumbersArray.map(n => utilBlackjack.createCardObject({number: n})) ], 
  );
}


test('check results of checkTable() when player = 10 & 14, dealer = 10 & 11', () => {
  const game = easyInitNewBlackjackInstance([10, 14], [10, 11]);

  const { playerPoints, dealerPoints, isWinner } = game.checkTable(true);

  expect(playerPoints).toBe(21);
  expect(dealerPoints).toBe(20);
  expect(isWinner).toBe(true);
});

test('check results of checkTable() when player = 10 & 6 & 6, dealer = 10 & 8', () => {
  const game = easyInitNewBlackjackInstance([10, 6, 6], [10, 8]);

  const { playerPoints, dealerPoints, isWinner } = game.checkTable(true);

  expect(playerPoints).toBe(22);
  expect(dealerPoints).toBe(18);
  expect(isWinner).toBe(false);
});

// test('check results of checkTable() when player = 9 & ace & ace, dealer = 10 & 8', () => {
//   const game = easyInitNewBlackjackInstance([9, 14, 14], [10, 8]);

//   const { playerPoints, dealerPoints, isWinner } = game.checkTable(true);

//   expect(playerPoints).toBe(21);
//   expect(dealerPoints).toBe(18);
//   expect(isWinner).toBe(true);
// });
