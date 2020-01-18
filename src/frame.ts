import AstNode from "./ast";


export enum ValType {
  VSTRING,
  VINT,
  VCHAR,
  VREF,
  VFUNC
}
export class Value {
  valType: ValType
  sval: string
  ival: string
  node: AstNode
  constructor(vt: ValType) {
    this.valType = vt
  }
}

export class Frame {
  data: Map<string, Value>

  constructor() {
    this.data = new Map<string, Value>();
  }

  addValue(varName:string, value: Value) {
    this.data.set(varName, value)
  }
}