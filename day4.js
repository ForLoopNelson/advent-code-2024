const fs = require("fs")
const test = fs.readFileSync("../../../day4Data.txt", "utf8").trim()

function findXMAS(grid) {
  const word = "XMAS"
  const wordLength = word.length
  const rows = grid.length
  const cols = grid[0].length

  let occurrences = 0

  // Helper function to check a specific direction
  function checkDirection(r, c, dr, dc) {
    let wordFound = ""
    for (let i = 0; i < wordLength; i++) {
      const newRow = r + dr * i
      const newCol = c + dc * i

      // Check if the position is valid in the grid
      if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols) {
        return false
      }
      wordFound += grid[newRow][newCol]
    }
    return wordFound === word
  }

  // Scan the grid for XMAS in all directions
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Check in 8 possible directions from (r, c)
      if (checkDirection(r, c, 0, 1)) occurrences++ // Horizontal right
      if (checkDirection(r, c, 0, -1)) occurrences++ // Horizontal left
      if (checkDirection(r, c, 1, 0)) occurrences++ // Vertical down
      if (checkDirection(r, c, -1, 0)) occurrences++ // Vertical up
      if (checkDirection(r, c, 1, 1)) occurrences++ // Diagonal (top-left to bottom-right)
      if (checkDirection(r, c, -1, -1)) occurrences++ // Diagonal (bottom-right to top-left)
      if (checkDirection(r, c, 1, -1)) occurrences++ // Diagonal (top-right to bottom-left)
      if (checkDirection(r, c, -1, 1)) occurrences++ // Diagonal (bottom-left to top-right)
    }
  }

  return occurrences
}

// Read and parse the data from the file
const data = fs.readFileSync("../../../day4Data.txt", "utf8").trim()
const grid = data.split("\n").map((line) => line.split("")) // Assuming each line is a row in the grid

console.log(findXMAS(grid))
