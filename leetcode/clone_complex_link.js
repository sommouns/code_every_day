function ComplexLinkNode(val) {
  this.val = val
  this.next = null
  this.sibling = null
}

function cloneComplexLinkNode(pNode) {
  function cloneNodes(pNode) {
    if (!pNode) return
    var cloneNode = new ComplexLinkNode(pNode.val)
    cloneNode.next = pNode.next
    pNode.next = cloneNode
    cloneNodes(cloneNode.next)
  }
  function directSiblings(pNode) {
    if (!pNode) return
    var cloneNode = pNode.next
    var siblingNode = pNode.sibling
    cloneNode.sibling = siblingNode.next
    directSiblings(cloneNodes.next)
  }
  function reconnectLink() {
    var cloneLink = null
    var head
    while (pNode) {
      if (!cloneLink) {
        cloneLink = pNode.next
        head = cloneLink
      } else {
        cloneLink = pNode.next
      }
      pNode.next = cloneLink.next
      pNode = pNode.next
    }
    return head
  }

  cloneNodes(pNode)
  directSiblings(pNode)
  return reconnectLink()
}

var A = new ComplexLinkNode('A')
var B = new ComplexLinkNode('B')
var C = new ComplexLinkNode('C')
var D = new ComplexLinkNode('D')
var E = new ComplexLinkNode('E')
A.next = B
B.next = C
C.next = D
D.next = E
A.sibling = C
B.sibling = E
D.sibling = B

var res = cloneComplexLinkNode(A)
debugger