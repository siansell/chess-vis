import { v4 as uuid } from 'uuid'
import * as d3 from 'd3'
import { invert } from 'polished'

// @TODO: showNotation just show rank and file on edge of board
// @TODO: callbacks onSquareClick etc.
const defaultConfig = {
  boardDimension: 8,
  blackSquareColour: '#769656',
  borderStyle: 'solid',
  borderWidth: 10,
  marginLeft: 30,
  marginTop: 30,
  orientation: 'w',
  showNotation: false,
  squareSize: 80,
  whiteSquareColour: '#eeeed2',
}

const getFile = (x) => String.fromCharCode(x + 97) // Maps 0 -> 'a', 1 -> 'b' etc.

// Maps 0 -> 8, 1 -> 7 etc.
const getRank = (y, boardDimension) => boardDimension - (y % boardDimension)

/* eslint-disable arrow-body-style */
export const getSquareName = (d, boardDimension = defaultConfig.boardDimension) => {
  return `${getFile(d.x)}${getRank(d.y, boardDimension)}`
}
/* eslint-enable arrow-body-style */

const isWhiteSquare = (x, y) => (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)

const drawBoard = (rootSelector = 'body', config = defaultConfig) => {
  const mergedConfig = { ...defaultConfig, ...config }
  // Default border colour same as blackSquareColour
  if (!mergedConfig.borderColour) mergedConfig.borderColour = mergedConfig.blackSquareColour

  const {
    blackSquareColour,
    borderColour,
    boardDimension,
    borderStyle,
    borderWidth,
    marginLeft,
    marginTop,
    orientation,
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
    .attr('data-square', (d) => getSquareName(d))
    // .attr('id', (d) => getSquareName(d))

  svg
    .append('rect')
    .attr('x', (d) => {
      if (orientation === 'w') return d.x * squareSize
      return Math.abs(d.x - (boardDimension - 1)) * squareSize
    })
    .attr('y', (d) => {
      if (orientation === 'w') return d.y * squareSize
      return Math.abs(d.y - (boardDimension - 1)) * squareSize
    })
    .attr('width', `${squareSize}px`)
    .attr('height', `${squareSize}px`)
    .style('fill', (d) => (isWhiteSquare(d.x, d.y) ? whiteSquareColour : blackSquareColour))
    // @TODO onSquareClick callback
    .on('click', (e, d) => console.log(e.target, d, getSquareName(d, boardDimension)))

  if (showNotation) {
    svg
      .append('text')
      .attr('x', (d) => {
        if (orientation === 'w') return d.x * squareSize + squareSize / 2
        return Math.abs(d.x - (boardDimension - 1)) * squareSize + squareSize / 2
      })
      .attr('y', (d) => {
        if (orientation === 'w') return d.y * squareSize + squareSize / 2
        return Math.abs(d.y - (boardDimension - 1)) * squareSize + squareSize / 2
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('font-family', 'Verdana')
      .style('pointer-events', 'none')
      .style('fill', (d) => (isWhiteSquare(d.x, d.y) ? invert(whiteSquareColour) : invert(blackSquareColour)))
      // .style('font-weight', 'bold')
      .text((d) => getSquareName(d, boardDimension))
  }

  return {
    boardId,
    board,
  }
}

export default drawBoard
