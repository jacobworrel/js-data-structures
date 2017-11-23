/*
  Graphs to build
    directed weighted graph
    directed unweighted graph
    undirected weighted graph
    undirected unweighted graph

  Methods
    [x] addVertex
    [x] addEdges
    [x] BFS Traversal
    [] DFS Traversal
    [] numberOfSelfLoops (graph)
    [] numberOfParallelEdges (graph)
    [] findOutDegree (vertex)
    [] findInDegree (vertex)
    [] findMaxDegree (graph)
    [] findMinDegree (graph)
    [] findAverageDegree (graph)
    [] reverse (graph)
*/

const util = require("util");

class Edge {
  constructor(v1, v2, weight) {
    this.v1 = String(v1);
    this.v2 = String(v2);
    this.weight = weight;
  }
}

class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    this.adjacencyList[vertex] = [];
  }

  addEdge(v1, v2, weight) {
    // if vertices aren't in adjacency list, add them by invoking addVertex() method
    if (!this.adjacencyList.hasOwnProperty(v1)) this.addVertex(v1);
    if (!this.adjacencyList.hasOwnProperty(v2)) this.addVertex(v2);
    const edge = new Edge(v1, v2, weight);
    this.adjacencyList[v1].push(edge);
  }

  breadthFirstSearch(source, callback) {
    const queue = [];
    const visited = new Set();

    queue.push(source);
    visited.add(source);
    while (queue.length) {
      const curr = queue.shift();
      callback(curr);
      this.adjacencyList[curr].forEach(edge => {
        if (!visited.has(edge.v2)) {
          queue.push(edge.v2);
          visited.add(edge.v2);
        }
      });
    }
  }
}

// http://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/

graph = new Graph();
graph.addVertex(0);
graph.addVertex(1);
graph.addVertex(2);
graph.addVertex(3);
graph.addEdge(0, 1, 0.5);
graph.addEdge(0, 2, 0.5);
graph.addEdge(1, 2, 0.5);
graph.addEdge(2, 0, 0.5);
graph.addEdge(2, 3, 0.5);
graph.addEdge(3, 3, 0.5);
// console.log(util.inspect(graph, false, null));

graph.breadthFirstSearch('2', key => console.log(key));
