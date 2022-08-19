// Problem 1162 (Hard) from DCP
// This problem was asked at Adobe

// Problem Statement
// You are given a tree with an even number of nodes. 
// Consider each connection between a parent and child node to be an "edge". 
// You would like to remove some of these edges, such that the 
// disconnected subtrees that remain each have an even number of nodes.

// Write a function that returns the maximum number of edges 
// you can remove while still satisfying this requirement.

// Time started = [08:00]

// Solution
// We are starting with an even tree and we need to remove edges
// such that we still remain with an even tree. 
// This means that the tree that is removed is also even.
// So we will have to remove an edge to a node which has an even sub-tree
// I would think about finding the size of each subtree 
// to determine if it is an even ssubtree or not
// Let's store the size of each subtree at the nodes
// Then we'll find the number of even edges until the topmost edge is left.

// First design the tree DS
class TreeNode {
    constructor(value, left=null, right=null) {
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(node) {
        this.root = node
    }

    addLeft(node) {
        this.head.left = node
    }

    addRight(node) {
        this.head.right = node
    }

    // This will print out an indented tree
    printTree(node = this.root, tablevel = 0) {
        console.log(this._getTabs(tablevel) + node.value)
        if (node.left)
            this.printTree(node.left, tablevel + 2)
        
        if (node.right) 
            this.printTree(node.right, tablevel + 2)
    }

    _getTabs(tablevel) {
        let str = ''
        for(let i = 0; i < tablevel - 1; i++) {
            str += ' '
        }
        if (str)
            str += '- '

        return str
    }
}

// Test the tree
console.log('Building and print a simple tree')
let tree1 = new Tree(new TreeNode(10, new TreeNode(20), new TreeNode(30)))
tree1.printTree()
console.log()

console.log('Building and print a complex tree')
let tree2 = new Tree(new TreeNode(10, 
    new TreeNode(20, new TreeNode(40), new TreeNode(50)), 
    new TreeNode(30, new TreeNode(31), 
        new TreeNode(32, new TreeNode(35), new TreeNode(36)))))
tree2.printTree()
console.log()

console.log('Building and print the example tree')
let tree3 = new Tree(new TreeNode(1, 
    new TreeNode(2), 
    new TreeNode(3, 
        new TreeNode(4, 
            new TreeNode(6), 
            new TreeNode(7, new TreeNode(8)), 
        new TreeNode(5)))))
tree3.printTree()
console.log()

// Now we'll create a function to parse the tree and find the edge sizes
// We'll have to parse down to the leaf and sum as we traverse back out
// Instead of returning the size of the node, we will store it in an array
// The leaf node will return an array of [1]
// It's parent will have to sum up the first elements which is the size of it's immediate sub trees
function parseTreeForEdgeSize(node, treeSizeList) {
    if (!node)
        return [0]

    // given no left and right, return count = 1
    // return an array instead of a number
    if (!node.left && !node.right) {
        treeSizeList.unshift(1)
        return treeSizeList
    }

    // Else the size of the node is the sum of left and right sub-trees
    treeSizeList.unshift(1 + 
        parseTreeForEdgeSize(node.right, treeSizeList)[0] + 
        parseTreeForEdgeSize(node.left, treeSizeList)[0])
    return treeSizeList
}

console.log('Testing the size of the complex tree')
console.log(parseTreeForEdgeSize(tree2.root, []), '\n')

console.log('Testing the size of the example tree')
console.log(parseTreeForEdgeSize(tree3.root,[]), '\n')

// Finally, we'll check the list for the number of even edges
function parseEdgesForEven(edgeSizeList) {
    count = 0
    for(size of edgeSizeList) {
        if (size % 2 == 0)
            count++
    }
    return count
}

console.log('Even edges should = 0')
console.log(parseEdgesForEven(parseTreeForEdgeSize(tree2.root, [])))


console.log('Even edges should = 2')
console.log(parseEdgesForEven(parseTreeForEdgeSize(tree3.root, [])))

// Time finished = [09:24]