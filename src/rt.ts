import AstNode, { NodeType } from "./ast";
import {ValType, Value, Frame}  from './frame'

// runtime module
// input: il
// execute



function newChar() {

}

function newString(sval: string): Value {
  let v: Value = new Value(ValType.VSTRING)
  v.sval = sval
  return v
}

function newRef(id: string): Value {
  let v: Value = new Value(ValType.VREF)
  v.sval = id
  return v
}

class Stack {
  stack: Value[] = []

  push(v: Value) {
    this.stack.push(v)
  }
  get(n: number): Value {
    let idx: number = this.stack.length - n - 1
    if (idx >= 0 && idx < this.stack.length) {
      return this.stack[idx]
    }
    throw new Error('out of stack' + idx)
  }
  pop(n: number) {
    this.stack.splice(this.stack.length - n, n)
  }
}

export function run(astNode: AstNode, frame: Frame) {
  let stack = new Stack()

  switch (astNode.nodeType) {
    case NodeType.NTFUNTION:
      console.log('n func');
      let val:Value=new Value(ValType.VFUNC)
      val.node=astNode
      frame.addValue(astNode.sval, val)
      break;
    case NodeType.NTSEQ:
      console.log('n seq');
      
      break;
    case NodeType.NTVARINIT:
      console.log('n func');
      break;
    case NodeType.NTASSIGN:
      console.log('n func');
      break;
    case NodeType.NTADD:
      console.log('n func');
      break;
    case NodeType.NTSUB:
      console.log('n func');
      break;
    case NodeType.NTCALL:
      console.log('n func');
      break;
    case NodeType.NTARGS:
      console.log('n func');
      break;
    case NodeType.NTID:
      console.log('n func');
      break;
    case NodeType.NTNUM:
      console.log('n func');
      break;
    case NodeType.NTLIT:
      console.log('n func');
      break;
    case NodeType.NTCHARLIT:
      console.log('n func');
      break;
    default:
      console.log('n unknown');

  }
}