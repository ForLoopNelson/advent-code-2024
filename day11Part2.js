let data = "0 5601550 3914 852 50706 68 6 645371"
let stones = data.split(" ").reduce((a, val) => {
  a[val] = 1 // Initialize each stone with a count of 1
  return a
}, {}) // Use an object, not an array

for (let i = 0; i < 75; i++) {
  const newStones = {}

  for (const [stone, count] of Object.entries(stones)) {
    const num = parseInt(stone, 10) // Convert stone to a number
    if (num === 0) {
      newStones[1] = (newStones[1] || 0) + count
    } else if (num.toString().length % 2 === 0) {
      const str = num.toString()
      const mid = str.length / 2
      const left = parseInt(str.slice(0, mid), 10)
      const right = parseInt(str.slice(mid), 10)
      newStones[left] = (newStones[left] || 0) + count
      newStones[right] = (newStones[right] || 0) + count
    } else {
      const newStone = num * 2024
      newStones[newStone] = (newStones[newStone] || 0) + count
    }
  }

  // Update `stones` with the new values
  stones = newStones
}

// Calculate the result
const res = Object.values(stones).reduce((a, c) => a + c, 0)

console.log(res)
