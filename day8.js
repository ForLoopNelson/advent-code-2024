/*Scanning across the city, you find that there are actually many such antennas. Each antenna is tuned to a specific frequency indicated by a single lowercase letter, uppercase letter, or digit. You create a map (your puzzle input) of these antennas  */

/*The signal only applies its nefarious effect at specific antinodes based on the resonant frequencies of the antennas. In particular, an antinode occurs at any point that is perfectly in line with two antennas of the same frequency - but only when one of the antennas is twice as far away as the other. This means that for any pair of antennas with the same frequency, there are two antinodes, one on either side of them.

So, for these two antennas with frequency a, they create the two antinodes marked with #:

..........
...#......
..........
....a.....
..........
.....a....
..........
......#...
..........
..........
  */

const fs = require("fs")
let advent = fs.readFileSync("./d8input.txt", "utf-8")
advent = advent.replace(/\r/g, "") //removes carriage returns (\r) to normalize line endings
if (advent.endsWith("\n")) advent = advent.slice(0, -1)
const data = advent.split("\n").map((e) => e.split(""))
const antinodes = {},
  allAntinodes = {}

function calculateAntinodes(x1, y1, cX, cY, dx, dy) {
  dx ??= cX - x1
  dy ??= cY - y1
  return { a1: { x: x1 - dx, y: y1 - dy }, a2: { x: cX + dx, y: cY + dy } }
}

for (let y1 = 0; y1 < data.length; y1++) {
  for (let x1 = 0; x1 < data[y1].length; x1++) {
    if (data[y1][x1] === ".") continue
    for (let y2 = 0; y2 < data.length; y2++) {
      for (let x2 = 0; x2 < data[y2].length; x2++) {
        if (x1 === x2 && y1 === y2) continue
        if (data[y1][x1] === data[y2][x2]) {
          // Part 1
          const { a1, a2 } = calculateAntinodes(x1, y1, x2, y2)
          if (data[a1.y]?.[a1.x]) (antinodes[a1.y] ??= {})[a1.x] = 1
          if (data[a2.y]?.[a2.x]) (antinodes[a2.y] ??= {})[a2.x] = 1

          // Part 2
          let [cX1, cY1, cX2, cY2] = [x1, y1, x2, y2]
          const deltaX = x2 - x1,
            deltaY = y2 - y1
          ;(allAntinodes[y1] ??= {})[x1] = 1
          ;(allAntinodes[y2] ??= {})[x2] = 1

          while (data[cY1] || data[cY2]) {
            const { a1, a2 } = calculateAntinodes(
              cX1,
              cY1,
              cX2,
              cY2,
              deltaX,
              deltaY
            )
            if (data[a1.y]?.[a1.x]) (allAntinodes[a1.y] ??= {})[a1.x] = 1
            if (data[a2.y]?.[a2.x]) (allAntinodes[a2.y] ??= {})[a2.x] = 1
            ;[cX1, cY1, cX2, cY2] = [a1.x, a1.y, a2.x, a2.y]
          }
        }
      }
    }
  }
}

const countAntinodes = (antinodes) =>
  Object.values(antinodes).map(Object.keys).flat().length

const part1 = countAntinodes(antinodes)
const part2 = countAntinodes(allAntinodes)
console.log("Part 1:", part1)
console.log("Part 2:", part2)
