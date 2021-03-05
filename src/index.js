import drawBoard from './board'
import pgnParser from './lib/pgn-parser'
import pgnData from './games'

const board1 = drawBoard('#board1', {
  borderStyle: 'dashed',
  borderWidth: 10,
  orientation: 'b',
  // blackSquareColour: 'black',
  whiteSquareColour: 'white',
})
const board2 = drawBoard('#board2', {
  boardDimension: 6,
  marginLeft: 100,
  // orientation: 'b',
  squareSize: 40,
  // showNotation: false,
})
console.log(board1, board2)

const result = pgnParser.parse(pgnData)
console.log(result)
