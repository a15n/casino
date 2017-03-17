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
      take no more cards
    split, double, and surrender
      coming soon
  */

  this.getCard = getCard;
}

module.exports = Blackjack;
