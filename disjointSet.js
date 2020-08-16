// Author: Qiuran Hu
// Made using the ideas taught in CS61B Spring 19 by Josh Hug.

// Always link root of smaller tree to larger tree.
// This leads to a complexity of log(n) of connect and findParent.

// For the root node, this.parent stores the -1 * height of the tree.
class DisjointSet {
    constructor(size) {
        // Create a disjoint set of a particular size.
        this.parents = [];
        for(let i = 0; i < size; i++) {
            this.parents.push(-1);
        }
    }

    findParent(nodeIndex) {
        let currentNode = nodeIndex;
        // Parent could be 0.
        while(this.parents[currentNode] >= 0) {
            currentNode = this.parents[currentNode];
        }
        return currentNode;
    }

    isConnected(nodeIndex1, nodeIndex2) {
        return this.findParent(nodeIndex1) === this.findParent(nodeIndex2);
    }

    connect(nodeIndex1, nodeIndex2) {
        let parent1 = this.findParent(nodeIndex1);
        let parent2 = this.findParent(nodeIndex2);
        if(parent1 === parent2) {
            return;
        }
        let heightOfTree1 = -this.parents[parent1];
        let heightOfTree2 = -this.parents[parent2];
        let smaller = parent2;
        let bigger = parent1;
        if(heightOfTree1 < heightOfTree2) {
            smaller = parent1;
            bigger = parent2;
        }
        this.parents[smaller] = bigger;
        this.parents[bigger] = -1 * (heightOfTree1 + heightOfTree2);
    }
}

console.log("Create a disjoint set of size 10.")
let disjointSet = new DisjointSet(10);
console.log("Parrent of 0 is " + disjointSet.findParent(8));
console.log("Is 0 and 8 connected? " + disjointSet.isConnected(0, 8));

console.log("Connect 0 and 8.");
disjointSet.connect(0, 8);
console.log("Is 0 and 8 connected? " + disjointSet.isConnected(0, 8));
console.log("The parents array is  " + disjointSet.parents);
console.log("Connect 3 and 4.");
disjointSet.connect(3, 4);
console.log("Connect 4 and 8.");
disjointSet.connect(4, 8);
console.log("Is 0 and 3 connected? " + disjointSet.isConnected(0, 3));