/*
TODO
  dealer must continue 'hitting' until >18 I think and add documentation for what 14 means
  need ability to convert aces from 11 to 1 conditionally (force it if over 21), do it progressively
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
    const getBlackjackPoints = (arr) => arr.reduce((n, c) => n + c.blackjackValue, 0);

    const playerPoints = getBlackjackPoints(playerHand);
    const dealerPoints = getBlackjackPoints(dealerHand);
    let isWinner = null;
    let isGameOver = false;
    
    if (playerPoints > 21) {
      isWinner = false;
      isGameOver = true;
    } else if (playerHasStayed && playerPoints > dealerPoints) {
      isWinner = true;
      isGameOver = true;
    } else if (playerHasStayed && playerPoints < dealerPoints) {
      isWinner = false
      isGameOver = true;
    } else if (playerHasStayed && playerPoints === dealerPoints) {
      isWinner = null
      isGameOver = true;
    } 

    const dealerHandString = dealerHand.map(c => c.displayValue).join(' and ');
    const playerHandString = playerHand.map(c => c.displayValue).join(' and ');
    log(`The Dealer is showing ${dealerHandString} (${dealerPoints}).\n    You are showing ${playerHandString}. (${playerPoints})`);

    if (isGameOver) {
      if (isWinner === null) {
        log('Tie')
      } else if (isWinner) {
        log('You Win!')
      } else {
        log('You Lose!')
      }
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
    log('-------------------');
    
    playerHand.push(this.createCardObject());
    playerHand.push(this.createCardObject());

    dealerHand.push(this.createCardObject());

    const dealerCard = dealerHand[0];
    const [playerCardOne, playerCardTwo] =  playerHand;

    this.checkTable();
  }
  
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

    const dealerCard = dealerHand[0];
    const [playerCardOne, playerCardTwo, playerCardThree] =  playerHand;
    this.checkTable();
  }

  this.stay = function() {
    dealerHand.push(this.createCardObject());
    this.checkTable(true);
  }
}

module.exports = Blackjack;
