import drawBoard from './board'
import pgnParser from './lib/pgn-parser'
import extendMoves from './lib/extendMoves'
import pgnData from './games'

drawBoard('#board1', {
  borderStyle: 'none',
})

const games = pgnParser.parse(pgnData)
const moves = extendMoves(games[0].moves)
console.log(moves)
