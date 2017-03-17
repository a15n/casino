const Blackjack = require('./blackjack');

const game = new Blackjack();

test('.card() returns correct types', () => {
  const card = game._getCard();
  expect(typeof card.number).toBe('number');
  expect(typeof card.suit).toBe('string');
});

test('.card().number should be within range', () => {
  const { number } = game._getCard();
  expect(number <= 14 && number >= 2).toBe(true);
});

test('.card().suit should be the correct suit', () => {
  const { suit } = game._getCard();
  const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
  expect(suits.includes(suit)).toBe(true);
});

test('_getBlackjackValue()', () => {
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
    expect(game._getBlackjackValue(value)).toBe(blackjackValue);
  });
});

test('_getDisplayValue()', () => {
  expect(game._getDisplayValue(2)).toBe('two');
  expect(game._getDisplayValue(10)).toBe('ten');
  expect(game._getDisplayValue(12)).toBe('queen');
  expect(game._getDisplayValue(14)).toBe('ace');
});

test('_createCardObject({number: 11})', () => {
  const { number, blackjackValue, displayValue } = game._createCardObject({number: 11});
  expect(number).toBe(11);
  expect(blackjackValue).toBe(10);
  expect(displayValue).toBe('jack');
});

test('_getBlackjackPoints(numbersArray)', ()=> {
  expect(game._getBlackjackPoints([1, 2, 3])).toBe(6);
  expect(game._getBlackjackPoints([1, 11, 10])).toBe(12);
  expect(game._getBlackjackPoints([1, 11, 11])).toBe(13);
  const allAces = [...Array(21)].map(() => 11);
  expect(game._getBlackjackPoints(allAces)).toBe(21);
});

const easyInitNewBlackjackInstance = (playerNumbersArray, dealerNumbersArray) => {
  const utilBlackjack = new Blackjack();
  return new Blackjack(
    // player hand
    [ ...playerNumbersArray.map(n => utilBlackjack._createCardObject({number: n})) ],
    // dealer hand
    [ ...dealerNumbersArray.map(n => utilBlackjack._createCardObject({number: n})) ], 
  );
}

test('check results of _checkTable() when player = 10 & 14, dealer = 10 & 11', () => {
  const game = easyInitNewBlackjackInstance([10, 14], [10, 11]);

  const { playerPoints, dealerPoints, isWinner } = game._checkTable(true);

  expect(playerPoints).toBe(21);
  expect(dealerPoints).toBe(20);
  expect(isWinner).toBe(true);
});

test('check results of _checkTable() when player = 10 & 6 & 6, dealer = 10 & 8', () => {
  const game = easyInitNewBlackjackInstance([10, 6, 6], [10, 8]);

  const { playerPoints, dealerPoints, isWinner } = game._checkTable(true);

  expect(playerPoints).toBe(22);
  expect(dealerPoints).toBe(18);
  expect(isWinner).toBe(false);
});

test('check results of _checkTable() when player = 9 & ace & ace, dealer = 10 & 8', () => {
  const game = easyInitNewBlackjackInstance([9, 14, 14], [10, 8]);

  const { playerPoints, dealerPoints, isWinner } = game._checkTable(true);

  expect(playerPoints).toBe(21);
  expect(dealerPoints).toBe(18);
  expect(isWinner).toBe(true);
});

test('check results of _checkTable() when player = 7 & ace & ace & ace, dealer = 10 & 8', () => {
  const game = easyInitNewBlackjackInstance([7, 14, 14, 14], [10, 14]);

  const { playerPoints, dealerPoints, isWinner } = game._checkTable(true);

  expect(playerPoints).toBe(20);
  expect(dealerPoints).toBe(21);
  expect(isWinner).toBe(false);
});

test('check results of _checkTable() when player = 10 & 9, dealer = ace & ace & 10 & 8', () => {
  const game = easyInitNewBlackjackInstance([10, 9], [14, 14, 10, 8]);

  const { playerPoints, dealerPoints, isWinner } = game._checkTable(true);

  expect(playerPoints).toBe(19);
  expect(dealerPoints).toBe(20);
  expect(isWinner).toBe(false);
});

test('check results of _checkTable() when player = 10 & 5, dealer = 10 & 5 & 10', () => {
  const game = easyInitNewBlackjackInstance([10, 5], [10, 5, 10]);

  const { playerPoints, dealerPoints, isWinner } = game._checkTable(true);

  expect(playerPoints).toBe(15);
  expect(dealerPoints).toBe(25);
  expect(isWinner).toBe(true);
});
