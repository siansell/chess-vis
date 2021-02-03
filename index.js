import * as d3 from 'd3'

// @TODO Some funky way of doing this with character codes. Don't limit to 8
const getFile = x => {
    switch (x) {
        case 0:
            return 'a'
        case 1:
            return 'b'
        case 2:
            return 'c'
        case 3:
            return 'd'
        case 4:
            return 'e'
        case 5:
            return 'f'
        case 6:
            return 'g'
        case 7:
            return 'h'
        default:
            return ''
    }
}

// @TODO Some funky way of doing this with maffs. Don't limit to 8
const getRank = y => {
    switch (y) {
        case 0:
            return 8
        case 1:
            return 7
        case 2:
            return 6
        case 3:
            return 5
        case 4:
            return 4
        case 5:
            return 3
        case 6:
            return 2
        case 7:
            return 1
        default:
            return ''
    }
}

const getSquareName = d => `${getFile(d.x)}${getRank(d.y)}`

const marginTop = 30
const marginLeft = 30
const squareSize = 80
const boardDimension = 8
const boardSize = boardDimension * squareSize

const whiteSquareColour = "#f0f5f2"
const blackSquareColour = "#dee3e0"

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
    .style("fill", d => {
        if ((d.x % 2 === 0 && d.y % 2 === 0)
            || (d.x % 2 === 1 && d.y % 2 === 1)) {
            return whiteSquareColour
        }
        return blackSquareColour
    })
    .on('click', (e, d) => console.log(e.target, d, getSquareName(d)))

svg
    .append('text')
    .attr("x", d => d.x * squareSize + squareSize / 2)
    .attr("y", d => d.y * squareSize + squareSize / 2)
    .style('font-family', 'Verdana')
    .text(d => getSquareName(d))




