import Parser from './parser'
import AstNode from './ast'

export function parse(source: string): AstNode {
  console.log("vlang.js v0.0.1 by nicolassiu")

  let parser: Parser = new Parser(source)

  let node: AstNode = parser.parse()

  parser.emitDiagnosis()

  return node
}
