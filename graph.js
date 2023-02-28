class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    for (let node of this.nodes) {
      if (node.adjacent.has(vertex)) {
        node.adjacent.delete(vertex);
      }
    }
    this.nodes.delete(vertex);
  }

  depthFirstSearch(start) {
    const look = new Set();
    const res = [];

    function traverse(vertex) {
      if (!vertex) {
        return null;
      }
      look.add(vertex);
      res.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!look.has(neighbor)) {
          return traverse(neighbor);
        }
      });
    }

    traverse(start);

    return res;
  }

  depthFirstSearchIterative(start) {
    const stack = [start];
    const res = [];
    const look = new Set();
    let currentVertex;

    look.add(start);

    while (stack.length) {
      currentVertex = stack.pop();
      res.push(currentVertex.value);

      currentVertex.adjacent.forEach(neighbor => {
        if (!look.has(neighbor)) {
          look.add(neighbor);
          stack.push(neighbor);
        }
      });
    }
    return res;
  }

  breadthFirstSearch(start) {
    const queue = [start];
    const res = [];
    const look = new Set();
    let currentVertex;

    // visit node
    look.add(start);

    // While there is still remaining vertices in queue
    while (queue.length) {
      currentVertex = queue.shift();
      res.push(currentVertex.value);

      // visit neighbors
      currentVertex.adjacent.forEach(neighbor => {
        if (!look.has(neighbor)) {
          look.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    return res;
  }
}

module.exports = {Graph, Node}