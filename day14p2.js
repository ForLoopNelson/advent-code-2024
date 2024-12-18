const fs = require("fs")
const input = fs.readFileSync("day14Data.txt", "utf8").trim()

function extractVectors(line) {
  const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/
  const match = line.match(regex)

  const px = parseInt(match[1], 10)
  const py = parseInt(match[2], 10)
  const vx = parseInt(match[3], 10)
  const vy = parseInt(match[4], 10)

  return { px, py, vx, vy }
}

// px = vx * t
// py = vy * t

function transformRobots(robotSpecs, time) {
  const { px, py, vx, vy } = robotSpecs

  const x = (((px + vx * time) % 101) + 101) % 101
  const y = (((py + vy * time) % 103) + 103) % 103

  return { x, y }
}

function makeFrame(pos, gh, gw) {
  let grid = Array.from({ length: gh }, () => Array(gw).fill(" "))
  for (const { x, y } of pos) {
    grid[y][x] = "█"
  }
  return grid
}

function countComponents(grid, width, height) {
  let componentCount = 0
  const seen = new Set()
  const DIRECTIONS = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ]

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === "█" && !seen.has(`${x},${y}`)) {
        componentCount++
        const queue = [[x, y]]

        while (queue.length > 0) {
          const [cx, cy] = queue.shift()
          const key = `${cx},${cy}`
          if (seen.has(key)) continue

          seen.add(key)

          DIRECTIONS.forEach(([dx, dy]) => {
            const nx = cx + dx
            const ny = cy + dy

            if (
              nx >= 0 &&
              nx < width &&
              ny >= 0 &&
              ny < height &&
              grid[ny][nx] === "█"
            ) {
              queue.push([nx, ny])
            }
          })
        }
      }
    }
  }

  return componentCount
}

function main(str) {
  const CHECK_THRESHOLD = 10_000
  const GRID_HEIGHT = 103
  const GRID_WIDTH = 101
  const CONNECTED_COMPONENT_LIMIT = 350

  for (let time = 0; time < CHECK_THRESHOLD; time++) {
    const positions = str
      .split("\n")
      .map((line) => transformRobots(extractVectors(line), time))
    const grid = makeFrame(positions, GRID_HEIGHT, GRID_WIDTH)

    // Count connected components using BFS
    const components = countComponents(grid, GRID_WIDTH, GRID_HEIGHT)

    if (components <= CONNECTED_COMPONENT_LIMIT) {
      console.log(time)
      console.log(grid.map((row) => row.join("")).join("\n")) // Uncomment to see the frames
    }
  }
}

main(input) //7672 correct answer for my puzzle input
