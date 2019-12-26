
import Lexer, { TokenType } from './lexer'
import AstNode, { NodeType } from './ast'
import Diagnosis, { ErrorReport } from './diagnosis'

interface Token {
  token: string
  tokenType: TokenType
}
export default class Parser {
  lexer: Lexer
  diagnosis: Diagnosis
  constructor(source: string) {
    this.diagnosis = new Diagnosis()
    this.lexer = new Lexer(source, this.diagnosis)
    this.lexer.nextToken()
  }


  parse(): AstNode {
    console.log('parse:' + this.lexer.token)
    return this.parseFunctionDef()
  }

  match(token: string, tokenType: TokenType) {
    if (this.lexer.token == token && this.lexer.tokenType == tokenType) {
      this.lexer.nextToken()
      return true
    }
    // error
    this.diagnosis.addError(new ErrorReport(`require ${token}`, this.lexer.pos))
    // skip
    this.lexer.nextToken()
  }

  matchOp(token: string) {
    this.match(token, TokenType.TTOP)
  }

  emitDiagnosis() {
    this.diagnosis.report()
  }

  parseFunctionDef(): AstNode {
    this.match("fn", TokenType.TTIDEN)

    let functionName: string = ""

    if (this.lexer.tokenType == TokenType.TTIDEN) {
      functionName = this.lexer.token
      this.lexer.nextToken()

      this.matchOp("(")

      this.matchOp(")")

      this.matchOp("{")



      this.matchOp("}")
    } else {
      this.diagnosis.addError(new ErrorReport("require a function name", this.lexer.pos))
    }

    let node: AstNode = new AstNode(NodeType.NTFUNTION)
    node.sval = functionName
    return node
  }
}
