import drawBoard from './board'
import pgnParser from './lib/pgn-parser'
import pgnData from './games'

const board1 = drawBoard('#board1', {
  borderStyle: 'none',
  orientation: 'b',
})
const board2 = drawBoard('#board2', {
  blackSquareColour: '#6E6D6B',
  whiteSquareColour: '#908F8D',
  boardDimension: 6,
  marginLeft: 100,
  squareSize: 40,
})
console.log(board1, board2)

// const result = pgnParser.parse(pgnData)
// console.log(result)
