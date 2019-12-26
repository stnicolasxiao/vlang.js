
export enum NodeType {
  NTFUNTION,
  NTSEQ,
  NTVARINIT,
  NTASSIGN,
  NTADD,
  NTSUB,
  NTID,
  NTNUM,
  NTLIT,
  NTCHARLIT
}

export default class AstNode {
  nodeType: NodeType
  sval: string
  subs: AstNode[]

  constructor(nodeType: NodeType) {
    this.nodeType = nodeType
    this.subs = []
  }
  addSubNode(node: AstNode) {
    this.subs.push(node)
  }
  toString(): string {
    return ""
  }

}
