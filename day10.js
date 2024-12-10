const input = require("fs")
  .readFileSync("./d10Data.txt", "utf-8")
  .split(/\r?\n/g)
  .map((x) => x.split("").map((x) => +x))

/*Iterates through the 2D grid (input).
Identifies all positions where the value is 0.
Stores these positions as [row, column] pairs in the zeros array.  */
let zeros = []
for (let i = 0; i < input.length; i++)
  for (let j = 0; j < input[i].length; j++)
    if (input[i][j] == 0) zeros.push([i, j])

/*Takes the position (pos) of a cell in the grid as input.
Looks for adjacent cells (up, down, left, right) that contain the next value in the sequence (current + 1).
The ?. ensures no error occurs if an index is out of bounds.
Returns an array of positions of these "next cells."  */
function findNext(pos) {
  let current = input[pos[0]][pos[1]],
    next = []

  if (input[pos[0] + 1]?.[pos[1]] == current + 1)
    next.push([pos[0] + 1, pos[1]])
  if (input[pos[0] - 1]?.[pos[1]] == current + 1)
    next.push([pos[0] - 1, pos[1]])
  if (input[pos[0]][pos[1] + 1] == current + 1) next.push([pos[0], pos[1] + 1])
  if (input[pos[0]][pos[1] - 1] == current + 1) next.push([pos[0], pos[1] - 1])

  return next
}

/*Initialization:
For each zero in zeros, start a trail search.
Initialize next with the position of the current zero.

Trail Traversal:
While there are positions to explore (next.length > 0):
For each position in next:
If the current cell value is 9, the trail is complete, so increment trailheads.
Otherwise, use findNext to find adjacent cells that continue the trail.
Collect all new positions found in found and update next to continue traversal.

Termination:
The loop stops when no more valid positions are found (next.length === 0).  */

let trailheads = 0
zeros.forEach((pos) => {
  let next = [pos]
  while (next.length) {
    let found = []
    next.forEach((pos) => {
      if (input[pos[0]][pos[1]] == 9) trailheads++
      else found.push(...findNext(pos))
    })
    found.forEach((pos, i) => {
      for (let j = i + 1; j < found.length; j++)
        if (found[j][0] == pos[0] && found[j][1] == pos[1]) found[j] = []
    })
    next = found.filter((x) => x.length)
  }
})

console.log(trailheads)
