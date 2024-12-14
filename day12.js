/*DFS is a graph traversal algorithm that explores as far as possible along one branch before backtracking.

It starts at a node and recursively visits all its unvisited neighbors.
The algorithm can be implemented recursively or with a stack.
Purpose in This Code:

Explore all cells of the same "color" connected to a starting cell.
Calculate:
Area: The number of connected cells with the same color.
Perimeter: Boundary cells adjacent to cells of a different color.
Sides: Connections between cells of the same color.
5. DFS Implementation
Inputs:

visited: A Set tracking visited nodes to prevent infinite loops.
nodeKey: The current cell (as a string, e.g., "1,2").
color: The color we’re looking for.
dir: The direction from which the current cell was entered (used for specific rules).
Logic:

Base Cases:
If the cell is not of the same color, check the neighbors and adjust perimeter or sides.
If the cell is already visited, return nothing.
Recursive Exploration:
Add the cell to visited.
For each neighbor (up, down, left, right), recursively apply DFS.  */

const fs = require("fs")

// Read and process the input file
const lines = fs.readFileSync("day12Data.txt", "utf-8").trim().split("\n")
const n = lines.length
const m = lines[0].length

// Create the graph as a map
const graph = new Map()
lines.forEach((row, i) => {
  ;[...row].forEach((cell, j) => {
    graph.set(`${i},${j}`, cell) // Use string keys like "i,j"
  })
})

// Add borders to the graph
for (let i = -1; i <= n; i++) {
  graph.set(`${i},-1`, "#")
  graph.set(`${i},${m}`, "#")
}
for (let j = -1; j <= m; j++) {
  graph.set(`-1,${j}`, "#")
  graph.set(`${n},${j}`, "#")
}

const visited = new Set()

// Helper to parse string keys back to integers
function parseKey(key) {
  const [x, y] = key.split(",").map(Number)
  return { x, y }
}

// Depth-First Search (DFS) function
function dfs(visited, nodeKey, color, dir) {
  if (graph.get(nodeKey) !== color) {
    const { x, y } = parseKey(nodeKey)
    const nextKey = `${x + dir.dx},${y + dir.dy}`
    const altKey = `${x - dir.dx + dir.dy},${y + dir.dy}`
    if (graph.get(nextKey) === color || graph.get(altKey) !== color) {
      return [0, 1, 1]
    } else {
      return [0, 1, 0]
    }
  }
  if (visited.has(nodeKey)) {
    return [0, 0, 0]
  }
  visited.add(nodeKey)

  let area = 1
  let perimeter = 0
  let sides = 0

  const directions = [
    { dx: 1, dy: 0 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
  ]

  for (const d of directions) {
    const { x, y } = parseKey(nodeKey)
    const neighborKey = `${x + d.dx},${y + d.dy}`
    const [a, p, s] = dfs(visited, neighborKey, color, d)
    area += a
    perimeter += p
    sides += s
  }
  return [area, perimeter, sides]
}

// Iterate over all nodes in the graph
let ans1 = 0
let ans2 = 0

/*Main Loop
Iterate over all cells in the graph. For each unvisited cell that is not a "#", run DFS to calculate the area, perimeter, and sides of the connected region.  */
for (const nodeKey of graph.keys()) {
  if (!visited.has(nodeKey) && graph.get(nodeKey) !== "#") {
    const [area, perimeter, sides] = dfs(visited, nodeKey, graph.get(nodeKey), {
      dx: 1,
      dy: 0,
    })
    ans1 += area * perimeter
    ans2 += area * sides
  }
}

// Print the results
console.log(ans1, ans2)
