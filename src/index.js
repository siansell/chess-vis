import drawBoard from './board'
import pgnParser from './lib/pgn-parser'
import pgnData from './games'

drawBoard('#board1')
drawBoard('#board2', { boardDimension: 6 })

const result = pgnParser.parse(pgnData)
console.log(result)
