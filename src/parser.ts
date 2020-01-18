
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

    let body:AstNode=null
    let args:AstNode=null
    if (this.lexer.tokenType == TokenType.TTIDEN) {
      functionName = this.lexer.token
      this.lexer.nextToken()

      this.matchOp("(")

      this.matchOp(")")

      this.matchOp("{")

      body=this.parseStatments()

      this.matchOp("}")
    } else {
      this.diagnosis.addError(new ErrorReport("require a function name", this.lexer.pos))
    }

    let node: AstNode = new AstNode(NodeType.NTFUNTION)
    node.sval = functionName
    node.addSubNode(args)
    node.addSubNode(body)
    return node
  }

  parseStatments(): AstNode {
    let node: AstNode = new AstNode(NodeType.NTSEQ)
    while (!this.lexer.isOp('}') && !this.lexer.isEof()) {
      let subNode: AstNode = this.parseStatment()
      node.addSubNode(subNode)
    }
    return node
  }

  parseStatment(): AstNode {
    if (this.lexer.tokenType == TokenType.TTIDEN) {
      switch (this.lexer.token) {
        case "fn":
          {
            return this.parseFunctionDef()
            break;
          }
        case "if":
          {
            throw new Error("not implement")
            break;
          }
        case "for":
          {
            throw new Error("not implement")
            break;
          }
        default:
          {
            return this.parseExpression()
          }
      }
    } else {
      return this.parseExpression()
    }
  }

  parseExpression(): AstNode {
    let node: AstNode = this.parseAddExpr()
    if (this.lexer.isOp(':=')) {
      let pNode: AstNode = new AstNode(NodeType.NTVARINIT)
      pNode.addSubNode(node)
      this.lexer.nextToken()
      let vNode: AstNode = this.parseAddExpr()
      pNode.addSubNode(vNode)
      return pNode
    } else if (this.lexer.isOp('=')) {
      let pNode: AstNode = new AstNode(NodeType.NTASSIGN)
      pNode.addSubNode(node)
      this.lexer.nextToken()
      let vNode: AstNode = this.parseAddExpr()
      pNode.addSubNode(vNode)
      return pNode
    } else {
      return node
    }
  }
  parseAddExpr(): AstNode {
    let leftNode: AstNode = this.parseAtom()

    while (this.lexer.isOp('+') || this.lexer.isOp('-')) {
      let node: AstNode = new AstNode(this.lexer.token == '+' ? NodeType.NTADD : NodeType.NTSUB)
      this.lexer.nextToken()
      let rightNode: AstNode = this.parseAtom()
      node.addSubNode(leftNode)
      node.addSubNode(rightNode)
      leftNode = node
    }
    return leftNode
  }
  parseAtom(): AstNode {
    switch (this.lexer.tokenType) {
      case TokenType.TTIDEN:
        {
          let iden: string = this.lexer.token
          this.lexer.nextToken()
          let node: AstNode = new AstNode(NodeType.NTID)
          node.sval = iden

          if (this.lexer.isOp('(')) {
            this.lexer.nextToken()
            let argsNode:AstNode=this.parseArgs()
            node.addSubNode(argsNode)
            node.nodeType=NodeType.NTCALL
            this.matchOp(')')
          }
          return node
        }
      case TokenType.TTNUM:
        {
          let iden: string = this.lexer.token
          this.lexer.nextToken()
          let node: AstNode = new AstNode(NodeType.NTNUM)
          node.sval = iden
          return node
        }
      case TokenType.TTCHARLIT:
        {
          let iden: string = this.lexer.token
          this.lexer.nextToken()
          let node: AstNode = new AstNode(NodeType.NTCHARLIT)
          node.sval = iden
          return node
        }
      case TokenType.TTLITERAL:
        {
          let iden: string = this.lexer.token
          this.lexer.nextToken()
          let node: AstNode = new AstNode(NodeType.NTLIT)
          node.sval = iden
          return node
        }
      default:
        {
          throw new Error('not support ' + this.lexer.token)
          break;
        }
    }
  }

  parseArgs(): AstNode {
    let argsNode: AstNode = new AstNode(NodeType.NTARGS)
    while (!this.lexer.isOp(')') && !this.lexer.isEof()) {
      let argNode: AstNode = this.parseExpression()
      argsNode.addSubNode(argNode)
      if (this.lexer.isOp(',')) {
        this.lexer.nextToken()
      } else {
        break;
      }
    }
    return argsNode
  }
}
