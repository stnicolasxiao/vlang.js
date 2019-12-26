export class Position {
  line: number
  col: number
  constructor(line: number, col: number) {
    this.line = line
    this.col = col
  }
  clone(): Position {
    return new Position(this.line, this.col)
  }
}
export class ErrorReport {
  message: string
  pos: Position
  constructor(message: string, pos: Position) {
    this.message = message
    this.pos = pos.clone()
  }
  toString(): string {
    return `At line ${this.pos.line} col ${this.pos.col}: ${this.message}`
  }
}
export default class Diagnosis {
  errors: ErrorReport[] = []
  addError(error: ErrorReport) {
    this.errors.push(error)
  }
  report() {
    this.errors.forEach(error => {
      console.log(error.toString())
    })
  }
}