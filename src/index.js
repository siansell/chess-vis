import { Chess } from 'chess.js'

import drawBoard, { getSquareName } from './board'
import pgnParser from './lib/pgn-parser'
import extendMoves from './lib/extendMoves'
import pgnData from './games'
import { FEN_START_POSITION } from './lib/constants'

drawBoard('#board1', {
  borderStyle: 'none',
})

const games = pgnParser.parse(pgnData)
const game = games[0]
const moves = extendMoves(game.moves)
// console.log(game, moves)

// If the PGN doesn't start from the initial position, gran the FEN from the game headers
const startFen = Object.keys(game.headers).includes('SetUp') && Object.keys(game.headers).includes('FEN')
  ? game.headers.FEN
  : FEN_START_POSITION

// Create a map of the pieces on the board in the initial position
const pieceMap = {}
const chess = new Chess(startFen)
const board = chess.board() // docs: https://github.com/jhlywa/chess.js/blob/master/README.md
board.forEach((rank, rankIndex) => {
  rank.forEach((file, fileIndex) => {
    const square = board[rankIndex][fileIndex]
    if (square) {
      const squareName = getSquareName({ x: fileIndex, y: rankIndex })
      pieceMap[`${square.color}${square.type}-${squareName}`] = [squareName]
    }
  })
})

moves.forEach((move) => {
  // Get all the keys of pieceMap that correspond to the piece being moved
  const pieceKeys = Object.keys(pieceMap).filter((x) => x.substring(0, 2) === `${move.color}${move.piece}`)
  pieceKeys.forEach((key) => {
    const piece = pieceMap[key]
    // Find the piece that is moving, and push the destination square to the squares array
    if (piece[piece.length - 1] === move.from) {
      pieceMap[key].push(move.to)
    }
  })
})

console.log(pieceMap)
