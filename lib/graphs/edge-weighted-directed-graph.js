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
    [x] DFS Traversal
    [x] totalVertices (graph)
    [x] totalEdges (graph)
    [x] getOutDegree (vertex)
    [x] getInDegree (vertex)
    [] getMaxDegree (graph)
    [] getMinDegree (graph)
    [] getAverageDegree (graph)
    [] numberOfSelfLoops (graph)
    [] numberOfParallelEdges (graph)
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
    this.totalEdges = 0;
    this.totalVertices = 0;
  }

  addVertex(vertex) {
    this.adjacencyList[vertex] = [];
    this.totalVertices += 1;
  }

  addEdge(v1, v2, weight) {
    // if vertices aren't in adjacency list, add them by invoking addVertex() method
    if (!this.adjacencyList.hasOwnProperty(v1)) this.addVertex(v1);
    if (!this.adjacencyList.hasOwnProperty(v2)) this.addVertex(v2);
    const edge = new Edge(v1, v2, weight);
    this.adjacencyList[v1].push(edge);
    this.totalEdges += 1;
  }

  // http://www.geeksforgeeks.org/breadth-first-traversal-for-a-graph/

  breadthFirstSearch(source, callback) {
    // create a queue, which we will use to traverse graph
    const queue = [];
    // created a Set of visited vertices
    // instantiate it by adding source vertex
    const visited = new Set([source]);

    // push source to queue
    queue.push(source);
    while (queue.length) {
      // shift off vertex at front of the queue
      const curr = queue.shift();
      // invoke callback (this is where you can do what you want to vertex)
      callback(curr);
      // loop through current vertex's adjacent vertices (edges)
      this.adjacencyList[curr].forEach(edge => {
        // if it hasn't been visited before, add adjacent vertex to queue
        // also mark it as visited to avoid infinite loops!
        if (!visited.has(edge.v2)) {
          queue.push(edge.v2);
          visited.add(edge.v2);
        }
      });
    }
  }

  // http://www.geeksforgeeks.org/depth-first-traversal-for-a-graph/

  depthFirstSearch(source, callback, visited = new Set()) {
    // add source vertex to visited Set
    visited.add(source);
    // invoke callback (this is where you can do what you want with vertex)
    callback(source);
    // loop through source's adjacent vertices (edges)
    this.adjacencyList[source].forEach(edge => {
      // if adjacent vertex (edge.v2) hasn't been visited
      // add adjacent vertex to visited Set and make recursive call
      if (!visited.has(edge.v2)) {
        visited.add(edge.v2);
        this.depthFirstSearch(edge.v2, callback, visited);
      }
    });
  }

  getTotalVertices() {
    return this.totalVertices;
  }

  getTotalEdges() {
    return this.totalEdges;
  }

  getInDegree(source) {
    let count = 0;
    const vertices = Object.keys(this.adjacencyList);
    vertices.forEach(vertex => {
      this.adjacencyList[vertex].forEach(edge => {
        if (edge.v2 == source) count += 1;
      });
    });
    return count;
  }

  getOutDegree(source) {
    let count = 0;
    const vertices = Object.keys(this.adjacencyList);
    vertices.forEach(vertex => {
      this.adjacencyList[vertex].forEach(edge => {
        if (edge.v1 == source) count += 1;
      });
    });
    return count;
  }
}

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
// console.log('in degree -->', graph.getInDegree(1));
// console.log('out degree -->', graph.getOutDegree(0));
// console.log('total vertices -->', graph.getTotalVertices());
// console.log('total edges -->', graph.getTotalEdges());
// console.log(util.inspect(graph, false, null));

// graph.breadthFirstSearch('2', vertex => console.log(vertex)); // logs 2 0 3 1 (in that order)
// graph.depthFirstSearch('2', vertex => console.log(vertex)); // logs 2 0 1 3 (in that order)
