function getCard() {
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
}

var Blackjack = function() {

  /*
    rules (https://www.youtube.com/watch?v=5bWpnABkU-Y)
    cards 2-10 are worth their face value
    Jack, Queen, King are worth 10
    Ace can be 1 or 11

    gameplay
    a dealer is dealt one card face up and one card face down
    a player is dealt two cards face up and can choose to from one of 5 options
    hit()
      take another card from the dealer
    stand() (aka stay)
      take no more cards. compare values
    split, double, and surrender
      coming soon
  */

  // playerHand is an internal variable and will contain an object
  // {number, suit, blackjackValue, displayValue}
  let playerHand = [];

  this.getBlackjackValue = function(n) {
    if (n <= 10) {
      return n;
    } else if (n <= 13) {
      return 10;
    } else {
      return 11; // TODO how to handle the 1/11 choice
    }
  }

  this.getCard = getCard;
  this.dealInitialCards = function() {
    // playerHand
    
    const hand = this.getCard();
    hand.blackjackValue = this.getBlackjackValue(hand.number);
    console.log(hand);
  }
}

const game = new Blackjack();
game.dealInitialCards();

module.exports = Blackjack;
