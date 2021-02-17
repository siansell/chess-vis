import * as d3 from 'd3'

const defaultConfig = {
  boardDimension: 8,
  marginLeft: 30,
  marginTop: 30,
  squareSize: 80,
  whiteSquareColour: '#f0f5f2',
  blackSquareColour: '#dee3e0',
}

const getFile = (x) => String.fromCharCode(x + 97) // Maps 0 -> 'a', 1 -> 'b' etc.
const getRank = (y, boardDimension) => boardDimension - (y % boardDimension)
const getSquareName = (d, boardDimension) => `${getFile(d.x)}${getRank(d.y, boardDimension)}`
const isWhiteSquare = (x, y) => (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)

const drawBoard = (rootSelector = 'body', config = defaultConfig) => {
  const mergedConfig = Object.assign(defaultConfig, config)
  const {
    marginTop, marginLeft, squareSize, boardDimension, whiteSquareColour, blackSquareColour,
  } = mergedConfig
  const boardSize = boardDimension * squareSize
  const border = `10px solid ${whiteSquareColour}`

  const board = []

  for (let i = 0; i < boardDimension * boardDimension; i++) {
    board.push({
      x: i % boardDimension,
      y: Math.floor(i / boardDimension),
    })
  }

  const div = d3
    .select(rootSelector)
    .append('div')
    .style('margin-top', `${marginTop}px`)
    .style('margin-left', `${marginLeft}px`)
    .style('width', `${boardSize}px`)
    .style('height', `${boardSize}px`)
    .style('border', border)

  const svg = div
    .append('svg')
    .attr('width', `${boardSize}px`)
    .attr('height', `${boardSize}px`)
    .selectAll()
    .data(board)
    .enter()
    .append('g')

  svg
    .append('rect')
    .attr('x', (d) => d.x * squareSize)
    .attr('y', (d) => d.y * squareSize)
    .attr('width', `${squareSize}px`)
    .attr('height', `${squareSize}px`)
    .style('fill', (d) => (isWhiteSquare(d.x, d.y) ? whiteSquareColour : blackSquareColour))
    .on('click', (e, d) => console.log(e.target, d, getSquareName(d, boardDimension)))

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

export default drawBoard
