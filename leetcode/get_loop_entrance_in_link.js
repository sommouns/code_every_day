function LinkNode(val) {
  this.val = val
  this.next = null
}

function getMeetNode(pHead) {

  if (!pHead) return null

  var pSlow = pHead.next
  if (!pSlow) {
    return null
  }
  var pFast = pSlow.next
  if (!pFast) {
    return null
  }

  while (pSlow !== pFast) {
    pSlow = pSlow.next

    pFast = pFast.next
    if (pFast) {
      pFast = pFast.next
    } else {
      return null
    }

  }

  return pSlow
}

function getLoopEntry(pHead) {

  var meetNode = getMeetNode(pHead)
  if (!meetNode) return 'no loop'

  var loopLength = 1;
  var curNode = meetNode.next
  while (curNode !== meetNode) {
    curNode = curNode.next
    loopLength++
  }
  var fastNode = pHead
  for (let i = 0; i < loopLength; i++) {
    fastNode = fastNode.next
  }

  var slowNode = pHead
  while (slowNode !== fastNode) {
    slowNode = slowNode.next
    fastNode = fastNode.next
  }

  return slowNode
}

var head = new LinkNode(1)
var node = head
node.next = new LinkNode(2)
node = node.next
node.next = new LinkNode(3)
node = node.next
var entry = node
node.next = new LinkNode(4)
node = node.next
node.next = new LinkNode(5)
node = node.next
node.next = new LinkNode(6)
node = node.next
node.next = entry

console.log(getLoopEntry(head))