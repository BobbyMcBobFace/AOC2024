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

    for (const [src, dest] of rules) {
        graph.addEdge(src, dest);
    }

    let totalMiddleSumCorrectlyOrdered = 0;
    let totalMiddleSumIncorrectlyOrdered = 0;

    for (const update of updates) {
        const localGraph = new Graph();
        
        for (const [src, dest] of rules) {
            if (update.includes(src) && update.includes(dest)) {
                localGraph.addEdge(src, dest);
            }
        }

        const sortedOrder = localGraph.topologicalSort(update);

        if (JSON.stringify(sortedOrder) === JSON.stringify(update)) {
            const middleIndex = Math.floor(update.length / 2);
            const middlePage = update.length % 2 === 0 ? update[middleIndex - 1] : update[middleIndex];
            totalMiddleSumCorrectlyOrdered += middlePage;
        } else {
            const correctedOrder = localGraph.topologicalSort(update);
            const middleIndex = Math.floor(correctedOrder.length / 2);
            const middlePage = correctedOrder.length % 2 === 0 ? correctedOrder[middleIndex - 1] : correctedOrder[middleIndex];
            totalMiddleSumIncorrectlyOrdered += middlePage;
        }
    }

    return totalMiddleSumIncorrectlyOrdered;
}

try {
    const rulesInput = fs.readFileSync('List1.txt', 'utf-8');
    const updatesInput = fs.readFileSync('List2.txt', 'utf-8');

    const resultPart2 = checkUpdates(rulesInput, updatesInput);
    console.log(resultPart2); 
} catch (error) {
    console.error('Error reading files:', error);
}
