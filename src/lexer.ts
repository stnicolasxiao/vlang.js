import Diagnosis, { Position, ErrorReport } from './diagnosis'

export enum TokenType {
  TTIDEN,
  TTLITERAL,
  TTCHARLIT,
  TTNUM,
  TTOP,
  TTEOF
}

function isAlpha(c: string): boolean {
  if (c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c == '_') {
    return true
  }
  return false
}

function isNum(c: string): boolean {
  return c >= '0' && c <= '9'
}

function isAlphanum(c: string): boolean {
  return isAlpha(c) || isNum(c)
}

function isSpace(c: string): boolean {
  return c == ' ' || c == '\r' || c == '\n' || c == '\t'
}

export default class Lexer {
  token: string
  tokenType: TokenType
  cc: string
  pc: number
  source: string
  sourceLen: number
  diagnosis: Diagnosis
  pos: Position
  lineStart: number
  constructor(source: string, diagnosis: Diagnosis) {
    this.source = source
    this.sourceLen = this.source.length
    this.cc = ''
    this.pc = 0
    this.diagnosis = diagnosis
    this.pos = new Position(1, 1)
    this.lineStart = 0
    this.nextChar()
  }
  getPos(): Position {
    return this.pos
  }
  updatePos(nextline: boolean) {
    if (nextline) {
      this.pos.line++
      this.pos.col = 1
      this.lineStart = this.pc
    } else {
      this.pos.col = this.pc - this.lineStart + 1
    }
  }

  nextChar() {
    if (this.pc < this.sourceLen) {
      this.cc = this.source[this.pc]
      this.updatePos(this.cc == '\n')
      this.pc++
    } else {
      this.cc = ''
    }
  }
  isType(tokenType: TokenType): boolean {
    return this.tokenType == tokenType
  }
  isEol(): boolean {
    return this.cc == '' || this.cc == '\r' || this.cc == '\n'
  }
  isEof():boolean {
    return this.tokenType == TokenType.TTEOF
  }
  isKeyword(token: string): boolean {
    return this.token == token && this.tokenType == TokenType.TTIDEN
  }
  isOp(token: string): boolean {
    return this.token == token && this.tokenType == TokenType.TTOP
  }
  nextToken() {
    while (isSpace(this.cc)) {
      this.nextChar()
    }

    if (isAlpha(this.cc)) {
      let token: string
      token = this.cc
      this.nextChar()
      while (isAlphanum(this.cc)) {
        token += this.cc
        this.nextChar()
      }
      this.token = token
      this.tokenType = TokenType.TTIDEN
    } else if (isNum(this.cc)) {
      let token: string
      token = this.cc
      this.nextChar()

      while (isNum(this.cc)) {
        token += this.cc
        this.nextChar()
      }
      this.token = token
      this.tokenType = TokenType.TTNUM
    } else if (this.cc == '') {
      // eof
      this.token = ""
      this.tokenType = TokenType.TTEOF

    } else if (this.cc == '\'' || this.cc == '`') {
      let sep: string = this.cc
      let token: string = ""
      this.nextChar()

      //todo add escape char support
      while (this.cc != sep && !this.isEol()) {
        token += this.cc
        this.nextChar()
      }
      if (this.cc == sep) {
        this.nextChar()
      } else {
        this.diagnosis.addError(new ErrorReport("string(char) literal require right quote", this.pos))
      }
      this.token = token
      if (sep == '\'') {
        this.tokenType = TokenType.TTLITERAL
      } else {
        this.tokenType = TokenType.TTCHARLIT
      }

    } else {
      switch (this.cc) {
        // one char op
        case '(':
        case ')':
        case '.':
        case '{':
        case '}':
        case '[':
        case ']':
          {
            this.token = this.cc
            this.tokenType = TokenType.TTOP
            this.nextChar()
            break;
          }
        case '+':
        case '-':
          {
            const eqOp: string = '='
            const op: string = this.cc
            this.token = this.cc
            this.tokenType = TokenType.TTOP
            this.nextChar()
            if (this.cc == op || this.cc == eqOp) {
              this.token += this.cc
              this.nextChar()
            }
            break;
          }
        case '*':
        case '/':
        case '%':
          {
            const eqOp: string = '='
            const op: string = this.cc
            this.token = this.cc
            this.tokenType = TokenType.TTOP
            this.nextChar()
            if (this.cc == eqOp) {
              this.token += this.cc
              this.nextChar()
            }
            break;
          }
        default:
          this.diagnosis.addError(new ErrorReport("unknown char: " + this.cc, this.pos))
          this.nextChar() //ignore the error char
      }
    }
  }
}
