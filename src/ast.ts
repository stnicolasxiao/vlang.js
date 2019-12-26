
export enum NodeType {
  NTFUNTION
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
