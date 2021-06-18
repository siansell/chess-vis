// @TODO: handle en-passant

import { Chess } from 'chess.js'
import * as d3 from 'd3'

import drawBoard, { getSquareName } from './board'
import pgnParser from './lib/pgn-parser'
import extendMoves from './lib/extendMoves'
import pgnData from './games'
import { FEN_START_POSITION } from './lib/constants'

const { board: boardDiv } = drawBoard('#board1', {
  borderStyle: 'none',
  // showNotation: true,
})
const svg = boardDiv.selectChild() // the svg elemnent @TODO: selectChild() isn't ideal

const games = pgnParser.parse(pgnData)
const game = games[1]
const moves = extendMoves(game.moves)

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

  // handle castling
  if (['O-O', 'O-O-O'].includes(move.san)) {
    if (move.color === 'w' && move.san === 'O-O') {
      pieceMap['wr-h1'].push('f1')
    } else if (move.color === 'b' && move.san === 'O-O') {
      pieceMap['br-h8'].push('f8')
    }

    if (move.color === 'w' && move.san === 'O-O-O') {
      pieceMap['wr-a1'].push('d1')
    } else if (move.color === 'b' && move.san === 'O-O-O') {
      pieceMap['br-a8'].push('d8')
    }
  }

  // @TODO: handle en passant
})

Object.keys(pieceMap).forEach((key) => {
  const pieceColour = key[0]

  const visitedSquares = pieceMap[key]
  // console.log(key, visitedSquares)
  visitedSquares.forEach((square, index) => {
    const squareG = d3.select(`[data-square='${square}']`)
    const squareRect = squareG.select('rect')
    const {
      x, y, width, height,
    } = squareRect.node().getBBox()

    const nextSquare = visitedSquares[index + 1]
    if (nextSquare) {
      const nextSquareG = d3.select(`[data-square='${nextSquare}']`)
      const nextSquareRect = nextSquareG.select('rect')
      const {
        x: nextSquareX, y: nextSquareY, width: nextSquareWidth, height: nextSquareHeight,
      } = nextSquareRect.node().getBBox()

      // console.log(square, nextSquare, x, y, nextSquareX, nextSquareY)

      svg
        .append('line')
        .style('stroke', 'black')
        .style('stroke-width', '4')
        .style('opacity', pieceColour === 'w' ? 0.3 : 1)
        .attr('x1', x + width / 2)
        .attr('y1', y + height / 2)
        .attr('x2', nextSquareX + nextSquareWidth / 2)
        .attr('y2', nextSquareY + nextSquareHeight / 2)
    }
  })
})
