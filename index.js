import * as d3 from 'd3'

const marginTop = 30
const marginLeft = 30
const squareSize = 80
const boardDimension = 8
const boardSize = boardDimension * squareSize

const whiteSquareColour = "#f0f5f2"
const blackSquareColour = "#dee3e0"

const getFile = x => String.fromCharCode(x + 97) // Maps 0 -> 'a', 1 -> 'b' etc.
const getRank = y => boardDimension - y % boardDimension
const getSquareName = d => `${getFile(d.x)}${getRank(d.y)}`
const isWhiteSquare = (x, y) => (x % 2 === 0 && y % 2 === 0) || (x % 2 === 1 && y % 2 === 1)

const board = [];

for (let i = 0; i < boardDimension * boardDimension; i++) {
    board.push({
        x: i % boardDimension,
        y: Math.floor(i / boardDimension),
    })
}

const div = d3
    .select("body")
    .append("div")
    .style("position", "fixed")
    .style("top", `${marginTop}px`)
    .style("left", `${marginLeft}px`)
    .style("width", `${boardSize}px`)
    .style("height", `${boardSize}px`)
    .style("border", `10px solid ${whiteSquareColour}`)

const svg = div
    .append("svg")
    .attr("width", `${boardSize}px`)
    .attr("height", `${boardSize}px`)
    .selectAll()
    .data(board)
    .enter()
    .append("g")

svg
    .append("rect")
    .attr("x", d => d.x * squareSize)
    .attr("y", d => d.y * squareSize)
    .attr("width", `${squareSize}px`)
    .attr("height", `${squareSize}px`)
    .style("fill", d => isWhiteSquare(d.x, d.y) ? whiteSquareColour : blackSquareColour)
    .on('click', (e, d) => console.log(e.target, d, getSquareName(d)))

svg
    .append('text')
    .attr("x", d => d.x * squareSize + squareSize / 2)
    .attr("y", d => d.y * squareSize + squareSize / 2)
    .attr("text-anchor", "middle")
    .attr("dominant-baseline", "middle")    
    .style('font-family', 'Verdana')
    .text(d => getSquareName(d))




