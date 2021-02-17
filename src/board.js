import { v4 as uuid } from 'uuid'
import * as d3 from 'd3'

// @TODO: orientation 'w' | 'b'
// @TODO: showNotation just show rank and file on edge of board
// @TODO: callbacks onSquareClick etc.
const defaultConfig = {
  boardDimension: 8,
  blackSquareColour: '#dee3e0',
  borderColour: '#f0f5f2',
  borderStyle: 'solid',
  borderWidth: 10,
  marginLeft: 30,
  marginTop: 30,
  showNotation: true,
  squareSize: 80,
  whiteSquareColour: '#f0f5f2',
}

const getFile = (x) => String.fromCharCode(x + 97) // Maps 0 -> 'a', 1 -> 'b' etc.

// Maps 0 -> 8, 1 -> 7 etc.
const getRank = (y, boardDimension) => boardDimension - (y % boardDimension)

const getSquareName = (d, boardDimension) => `${getFile(d.x)}${getRank(d.y, boardDimension)}`

const isWhiteSquare = (x, y) => (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)

const drawBoard = (rootSelector = 'body', config = defaultConfig) => {
  const mergedConfig = { ...defaultConfig, ...config }
  const {
    blackSquareColour,
    borderColour,
    boardDimension,
    borderStyle,
    borderWidth,
    marginLeft,
    marginTop,
    showNotation,
    squareSize,
    whiteSquareColour,
  } = mergedConfig
  const boardSize = boardDimension * squareSize
  const border = borderStyle === 'none' ? 'none' : `${borderWidth}px ${borderStyle} ${borderColour}`

  const squares = []
  for (let i = 0; i < boardDimension * boardDimension; i++) {
    squares.push({
      x: i % boardDimension,
      y: Math.floor(i / boardDimension),
    })
  }

  const boardId = `board-${uuid()}`

  const board = d3
    .select(rootSelector)
    .append('div')
    .style('margin-top', `${marginTop}px`)
    .style('margin-left', `${marginLeft}px`)
    .style('width', `${boardSize}px`)
    .style('height', `${boardSize}px`)
    .style('border', border)
    .attr('id', boardId)

  const svg = board
    .append('svg')
    .attr('width', `${boardSize}px`)
    .attr('height', `${boardSize}px`)
    .selectAll()
    .data(squares)
    .enter()
    .append('g')

  svg
    .append('rect')
    .attr('x', (d) => d.x * squareSize)
    .attr('y', (d) => d.y * squareSize)
    .attr('width', `${squareSize}px`)
    .attr('height', `${squareSize}px`)
    .style('fill', (d) => (isWhiteSquare(d.x, d.y) ? whiteSquareColour : blackSquareColour))
    // @TODO onSquareClick callback
    .on('click', (e, d) => console.log(e.target, d, getSquareName(d, boardDimension)))

  if (showNotation) {
    svg
      .append('text')
      .attr('x', (d) => d.x * squareSize + squareSize / 2)
      .attr('y', (d) => d.y * squareSize + squareSize / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-family', 'Verdana')
      .style('pointer-events', 'none')
      .text((d) => getSquareName(d, boardDimension))
  }

  return {
    boardId,
    board,
  }
}

export default drawBoard
