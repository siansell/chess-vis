import drawBoard from './board'
import pgnParser from './lib/pgn-parser'
import pgnData from './games'

const board1 = drawBoard('#board1', { borderStyle: 'dashed', borderWidth: 4, whiteSquareColour: 'whitesmoke' })
const board2 = drawBoard('#board2', {
  boardDimension: 6, marginLeft: 100, squareSize: 40, showNotation: false,
})
console.log(board1, board2)

const result = pgnParser.parse(pgnData)
console.log(result)
