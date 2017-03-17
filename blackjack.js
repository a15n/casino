const log = (str) => {
  console.log(`
    ${str}`);
};

var Blackjack = function(passedPlayerHand, passedDealerHand) {
  /*
    VALUES 
    cards 2-10 are worth their face value
    Jack, Queen, King are worth 10
    Ace can be 1 or 11

    GAMEPLAY
    a dealer is dealt one card face up and one card face down
    a player is dealt two cards face up and can choose to from one of 5 options
    hit()
      take another card from the dealer
    stand() (aka stay)
      take no more cards. compare values

    source -> https://www.youtube.com/watch?v=5bWpnABkU-Y
  */

  // PRIVATE VARIABLES

  // {number, suit, blackjackValue, displayValue}
  let playerHand = passedPlayerHand || [];
  let dealerHand = passedDealerHand || [];

  let possibleMoves = ['deal'];

  function resetTable() {
    playerHand = [];
    dealerHand = [];
  }


  // PUBLIC VARIABLES
  this.deal = function() { 
    if (!this._isValidMove('deal')) { return; } 
    possibleMoves = ['hit', 'stay'];

    playerHand.push(this._createCardObject());
    playerHand.push(this._createCardObject());

    dealerHand.push(this._createCardObject());

    this._checkTable();
  }

  this.hit = function() {
    if (!this._isValidMove('hit')) { return; }
    
    playerHand.push(this._createCardObject());
    this._checkTable();
  }

  this.stay = function() {
    if (!this._isValidMove('stay')) { return; }

    dealerHand.push(this._createCardObject());
    let dealerPoints = this._getBlackjackPoints(dealerHand.map(c => c.blackjackValue));

    // As a general rule, casino rules specify that dealers must draw on "16 or less"
    while (dealerPoints <= 16) {
      dealerHand.push(this._createCardObject());
      dealerPoints = this._getBlackjackPoints(dealerHand.map(c => c.blackjackValue));
    }
    this._checkTable(true);
  }

  // "PRIVATE" VARIABLES
  this._checkTable = function(playerHasStayed) {
    const playerPoints = this._getBlackjackPoints(playerHand.map(c => c.blackjackValue));
    const dealerPoints = this._getBlackjackPoints(dealerHand.map(c => c.blackjackValue));
    let isWinner = null;
    let isGameOver = false;
    let finalMessage;

    if (dealerPoints > 21) {
      isWinner = true;  
      isGameOver = true;
      finalMessage = 'YOU WIN! Dealer went over 21!'
    } else if (playerPoints > 21) {
      isWinner = false;
      isGameOver = true;
      finalMessage = 'YOU LOSE! You went over 21!'
    } else if (playerHasStayed && playerPoints > dealerPoints) {
      isWinner = true;
      isGameOver = true;
      finalMessage = 'YOU WIN! You have more points than the dealer!'
    } else if (playerHasStayed && playerPoints < dealerPoints) {
      isWinner = false
      isGameOver = true;
      finalMessage = 'YOU LOSE! You have fewer points than the dealer!'
    } else if (playerHasStayed && playerPoints === dealerPoints) {
      isWinner = null
      isGameOver = true;
      finalMessage = 'TIE! You and the dealer have the same amount of points!'
    } 

    const dealerHandString = dealerHand.map(c => c.displayValue).join(' and ');
    const playerHandString = playerHand.map(c => c.displayValue).join(' and ');
    log(`The Dealer is showing ${dealerHandString} (${dealerPoints}).\n    You are showing ${playerHandString} (${playerPoints}).`);

    if (isGameOver) {
      log(`~~~~~ ${finalMessage} ~~~~~\n--------------------------------------`);
      resetTable();
      possibleMoves = ['deal'];
    }

    return { playerPoints, dealerPoints, isWinner };
  }

  this._createCardObject = function(passedCardObject) {
    const cardObject = passedCardObject || this._getCard();
    cardObject.blackjackValue = this._getBlackjackValue(cardObject.number);
    cardObject.displayValue = this._getDisplayValue(cardObject.number);
    return cardObject;
  }

  

  this._getBlackjackPoints = (blackjackValues) => {
    let points = blackjackValues.reduce((n, p) => n + p, 0);
    while (points > 21 && blackjackValues.includes(11)) {
      
      // find first 11, change that element in the array into 1
      blackjackValues.some((el, i, arr) => {
        if (el === 11) {
          arr[i] = 1;
          return true;
        }
      });

      // recalculate points
      points = blackjackValues.reduce((n, p) => n + p, 0);
    }

    return points;
  };
  
  this._getBlackjackValue = function(n) {
    if (n <= 10) {
      return n;
    } else if (n <= 13) {
      return 10;
    } else {
      return 11;
    }
  }
  
  this._getCard = function() {
    function randomIntFromInterval(min,max) {
      // http://stackoverflow.com/a/7228322/3304337
      return Math.floor(Math.random()*(max-min+1)+min);
    }

    const upperLimit = 14; // Ace
    const lowerLimit = 2; // 2
    const suits = ['hearts', 'spades', 'clubs', 'diamonds'];
    return {
      number: randomIntFromInterval(lowerLimit, upperLimit),
      suit: suits[randomIntFromInterval(0, 3)],
    }
  };
  
  this._getDisplayValue = function(n) {
    const displayValueArray = [null, null, 'two', 'three', 'four', 'five', 'six',
        'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];
    return displayValueArray[n];
  }

  this._isValidMove = function(move) {
    if (possibleMoves.includes(move)) {
      return true;
    }
    log(`possible moves include ${possibleMoves.join(', ')}`);
    return false;
  }
}

module.exports = Blackjack;
