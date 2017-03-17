/*
TODO
  console.log better welcome screen, instructions, and reset messaging
  add 'q' to quit command line interface
  rename variables to with _someName if "private" but still needed to expose for testing (maybe find other ways)
  add internal controls so user can't deal twice, hit before deal, hit after stay, hit beyond limit, etc
*/

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

  function resetTable() {
    playerHand = [];
    dealerHand = [];
  }

  // PUBLIC VARIABLES
  this.checkTable = function(playerHasStayed) {
    const playerPoints = this.getBlackjackPoints(playerHand.map(c => c.blackjackValue));
    const dealerPoints = this.getBlackjackPoints(dealerHand.map(c => c.blackjackValue));
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
    log(`The Dealer is showing ${dealerHandString} (${dealerPoints}).\n    You are showing ${playerHandString}. (${playerPoints})`);

    if (isGameOver) {
      log(`~~~~~ ${finalMessage} ~~~~~\n--------------------------------------`);
      resetTable();
    }

    return { playerPoints, dealerPoints, isWinner };
  }

  this.createCardObject = function(passedCardObject) {
    const cardObject = passedCardObject || this.getCard();
    cardObject.blackjackValue = this.getBlackjackValue(cardObject.number);
    cardObject.displayValue = this.getDisplayValue(cardObject.number);
    return cardObject;
  }

  this.deal = function() {   
    playerHand.push(this.createCardObject());
    playerHand.push(this.createCardObject());

    dealerHand.push(this.createCardObject());

    this.checkTable();
  }

  this.getBlackjackPoints = (blackjackValues) => {
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
  
  this.getBlackjackValue = function(n) {
    if (n <= 10) {
      return n;
    } else if (n <= 13) {
      return 10;
    } else {
      return 11;
    }
  }
  
  this.getCard = function() {
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
  
  this.getDisplayValue = function(n) {
    const displayValueArray = [null, null, 'two', 'three', 'four', 'five', 'six',
        'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];
    return displayValueArray[n];
  }

  this.hit = function() {
    playerHand.push(this.createCardObject());
    this.checkTable();
  }

  this.stay = function() {
    dealerHand.push(this.createCardObject());
    let dealerPoints = this.getBlackjackPoints(dealerHand.map(c => c.blackjackValue));

    // As a general rule, casino rules specify that dealers must draw on "16 or less"
    while (dealerPoints <= 16) {
      dealerHand.push(this.createCardObject());
      dealerPoints = this.getBlackjackPoints(dealerHand.map(c => c.blackjackValue));
    }
    this.checkTable(true);
  }
}

module.exports = Blackjack;
