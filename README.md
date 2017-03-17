# node blackjack

![screen shot 2017-03-17 at 4 49 20 pm](https://cloud.githubusercontent.com/assets/7050871/24066667/d471d9e2-0b31-11e7-9358-096f968e4579.png)

## Setup

* `git clone https://github.com/a15n/node-blackjack.git`
* `cd node-blackjack/`
* `npm run start` or (`yarn start`)
* play the game in your terminal
* press `'q'` or `'ctrl' + 'c'` to quit the terminal

### Features
* keyboard interface: 'd' for draw(), 'h' for hit(), etc
* only allows users to input a valid command depending on the state of the game (ex: can't play draw right after playing draw")
* The value of 'ace' cards is reduced from 11 to 1, if the total points is over 21
* comprehensive tests
* the dealer will continue drawing until he is over 16 points
