import { Chess } from 'chess.js'
import short from 'short-uuid'

const translator = short()

const FEN_START_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

const extendMoves = (moves, opts = {}) => {
  const startFen = opts.startDen || FEN_START_POSITION
  const variationId = opts.variationId || translator.new()
  const parentVariationId = opts.parentVariationId || null

  const c = new Chess(startFen)

  return moves
    .filter((m) => !!m.move)
    .map((m) => {
      const fenBefore = c.fen()
      const result = c.move(m.move, { sloppy: true })
      if (!result) {
        throw new Error(`extendMoves error: ${m.move}`)
      }
      const fenAfter = c.fen()

      const ravs = m.ravs
        ? m.ravs.map((r) => extendMoves(
          r.moves,
          {
            startFen: fenBefore,
            variationId: translator.new(),
            parentVariationId: variationId,
          },
        ))
        : null

      return {
        ...m,
        ...result,
        moveId: translator.new(),
        variationId,
        parentVariationId,
        ravs,
        fenBefore,
        fenAfter,
      }
    })
}

export default extendMoves
