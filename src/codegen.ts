import AstNode, { NodeType } from "./ast"

// input: ast
// output: il

export enum OpType {
  PUSHCHAR,
  PUSHSTRING,
  PUSHINT,
  PUSHREF,
  DEFFUN,
  POP,
  CALL
}

export class OpCode {
  op: OpType
  ival: number
  sval: string
  constructor(op: OpType) {
    this.op = op
  }
}

export function generateIlFromFunction(node :AstNode):number {
  if (node.nodeType!= NodeType.NTFUNTION) {
    throw new Error('not a function node')
  }
  let fun:FunctionDef=new FunctionDef()
  fun.functionName=node.sval

  if (node.subs.length==2) {
    fun.generateIl(node.subs[1])
  } else {
    throw new Error('function internal error')
  }
  let fid:number=FunctionMgr.getInst().addFunction(fun)
  return fid
}

export class FunctionDef {
  ops: OpCode[]
  functionName:string
  constructor() {
    this.ops = []
  }
  gen(op: OpType) {
    let opcode: OpCode = new OpCode(op)
    this.ops.push(opcode)
  }
  genS(op: OpType, sval: string) {
    let opcode: OpCode = new OpCode(op)
    opcode.sval = sval
    this.ops.push(opcode)
  }
  genI(op: OpType, ival: number) {
    let opcode: OpCode = new OpCode(op)
    opcode.ival = ival
    this.ops.push(opcode)
  }
  genIS(op: OpType, ival: number, sval:string) {
    let opcode: OpCode = new OpCode(op)
    opcode.ival = ival
    opcode.sval=sval
    this.ops.push(opcode)
  }
  generateIl(node: AstNode) {
    switch (node.nodeType) {
      case NodeType.NTFUNTION:
        {
          let fid:number=generateIlFromFunction(node)
          this.genIS(OpType.DEFFUN, fid, node.sval)
          break;
        }
      case NodeType.NTSEQ:
        {
          if (node.subs.length > 0) {
            node.subs.forEach((subNode: AstNode) => {
              this.generateIl(subNode)
            })
          }
          break;
        }
      case NodeType.NTVARINIT:
        {
          throw new Error('not implement')
        }
      case NodeType.NTASSIGN:
        {
          throw new Error('not implement')
        }
      case NodeType.NTADD:
        {
          throw new Error('not implement')
        }
      case NodeType.NTSUB:
        {
          throw new Error('not implement')
        }
      case NodeType.NTCALL:
        {
          this.gen(OpType.CALL)
          throw new Error('not implement')
          break
        }
      case NodeType.NTARGS:
        {
          throw new Error('not implement')
        }
      case NodeType.NTID:
        {
          this.genS(OpType.PUSHREF, node.sval)
          break;
        }
      case NodeType.NTNUM:
        {
          throw new Error('not implement')
        }
      case NodeType.NTLIT:
        {
          this.genS(OpType.PUSHSTRING, node.sval)
          break;
        }
      case NodeType.NTCHARLIT:
        {
          throw new Error('not implement')
        }
    }

  }
}

export class FunctionMgr {
  funs: FunctionDef[]
  constructor() {
    this.funs=[]
  }
  static __inst:FunctionMgr ;
  static getInst():FunctionMgr {
    if (!FunctionMgr.__inst) {
      FunctionMgr.__inst=new FunctionMgr()
    }
    return FunctionMgr.__inst
  }
  addFunction(fn:FunctionDef):number{
    this.funs.push(fn)
    return this.funs.length-1
  }
  getFunction(fn:number):FunctionDef{
    return this.funs[fn]
  }
}