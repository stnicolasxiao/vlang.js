// runtime module
// input: il
// execute
import { FunctionDef, OpCode, OpType } from './codegen'


enum ValType {
  VSTRING,
  VINT,
  VCHAR,
  VREF
}
class Value {
  valType: ValType
  sval:string
  ival:string
  constructor(vt:ValType) {
    this.valType = vt
  }
}

function newChar() {

}

function newString(sval:string) :Value{
  let v:Value=new Value(ValType.VSTRING) 
  v.sval=sval
  return v
}

function newRef(id :string):Value{
  let v:Value=new Value(ValType.VREF)
  v.sval=id
  return v
}

class Stack {
  stack: Value[] = []

  push(v :Value) {
    this.stack.push(v)
  }
  get(n: number) :Value {
    let idx:number=this.stack.length-n-1
    if (idx>=0 && idx < this.stack.length) {
      return this.stack[idx]
    }
    throw new Error('out of stack'+idx)
  }
  pop(n :number) {
    this.stack.splice(this.stack.length-n, n)
  }
}

export function run(fn: FunctionDef) {
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
          let v:Value=newString(op.sval)
          stack.push(v)
          break;
        }

      case OpType.PUSHINT:
        {
          throw new Error('not implement')
          break;
        }

      case OpType.PUSHREF:
        {
          let ref:Value=newRef(op.sval)
          stack.push(ref)
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
          console.error('add arg len')
          let fn:Value=stack.get(1)
          let val:Value=stack.get(0)
          if (fn.valType==ValType.VREF && fn.sval=="println") {
            console.log(val.sval)
          }
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