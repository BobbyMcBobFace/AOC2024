const fs = require('fs');

class Graph {
    constructor() {
        this.adjList = new Map();
    }

    addEdge(src, dest) {
        if (!this.adjList.has(src)) {
            this.adjList.set(src, []);
        }
        this.adjList.get(src).push(dest);
    }

    topologicalSort(nodes) {
        const indegree = new Map();
        nodes.forEach(node => indegree.set(node, 0));

        // Calculate indegrees
        this.adjList.forEach((edges, node) => {
            edges.forEach(neighbor => {
                if (indegree.has(neighbor)) {
                    indegree.set(neighbor, indegree.get(neighbor) + 1);
                } else {
                    indegree.set(neighbor, 1);
                }
            });
        });

        const queue = [];
        for (let [node, degree] of indegree) {
            if (degree === 0) {
                queue.push(node);
            }
        }

        const sortedOrder = [];
        while (queue.length > 0) {
            const current = queue.shift();
            sortedOrder.push(current);

            const neighbors = this.adjList.get(current) || [];
            neighbors.forEach(neighbor => {
                indegree.set(neighbor, indegree.get(neighbor) - 1);
                if (indegree.get(neighbor) === 0) {
                    queue.push(neighbor);
                }
            });
        }

        return sortedOrder;
    }
}

function checkUpdates(rulesInput, updatesInput) {
    const rules = rulesInput.trim().split('\n').map(line => line.split('|').map(Number));
    const updates = updatesInput.trim().split('\n').map(line => line.split(',').map(Number));

    const graph = new Graph();

    // Build graph from rules
    for (const [src, dest] of rules) {
        graph.addEdge(src, dest);
    }

    let totalMiddleSum = 0;

    for (const update of updates) {
        const localGraph = new Graph();
        
 
        const localIndegree = new Map();
        
        for (const [src, dest] of rules) {
            if (update.includes(src) && update.includes(dest)) {
                localGraph.addEdge(src, dest);
                localIndegree.set(src, (localIndegree.get(src) || 0));
                localIndegree.set(dest, (localIndegree.get(dest) || 0) + 1);
            }
        }

        const sortedOrder = localGraph.topologicalSort(update);

        if (JSON.stringify(sortedOrder) === JSON.stringify(update)) {
            const middleIndex = Math.floor(update.length / 2);
            const middlePage = update.length % 2 === 0 ? update[middleIndex - 1] : update[middleIndex];
            totalMiddleSum += middlePage;
        }
    }

    return totalMiddleSum;
}

try {
    const rulesInput = fs.readFileSync('List1.txt', 'utf-8');
    const updatesInput = fs.readFileSync('List2.txt', 'utf-8');

    const result = checkUpdates(rulesInput, updatesInput);
    console.log(result); 
} catch (error) {
    console.error('Error reading files:', error);
}
