// runtime module
// input: il
// execute
import { FunctionDef, OpCode, OpType } from './codegen'

enum VarType {
  VSTRING,
  VINT,
  VCHAR
}
class Variable {
  varType: VarType
  sval:string
  ival:string
}

class Stack {
  stack: Variable[] = []

  push(v :Variable) {
    this.stack.push(v)
  }
}

function run(fn: FunctionDef) {
  let ops: OpCode[] = fn.ops
  let stack = new Stack()

  let pc: number = 0

  let nbOp = ops.length

  while (pc < nbOp) {
    let op: OpCode = ops[pc]

    switch (op.op) {
      case OpType.PUSHCHAR:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.PUSHSTRING:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.PUSHINT:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.PUSHREF:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.DEFFUN:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.POP:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.CALL:
        {
          throw new Error('not implement')
          break;
        }
      default:
        {
          throw new Error('not implement')
          break;
        }
    }


    pc++
  }
}