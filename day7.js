const fs = require("node:fs")

function ints(s, neg = true) {
  let reg = /\d+/g
  if (neg) reg = /-?\d+/g

  return [...s.matchAll(reg)].map((x) => +x[0])
}
function d7(p1) {
  let input = fs.readFileSync("./d7Data.txt", "utf-8").trim().split("\n")
  let ret = 0

  let ev = (l, v, i, t) => {
    if (i >= l.length) return v == t
    return (
      ev(l, v + l[i], i + 1, t) ||
      ev(l, v * l[i], i + 1, t) ||
      (p1 && ev(l, +("" + v + l[i]), i + 1, t))
    )
  }
  for (let line of input) {
    let l = ints(line)
    if (ev(l, l[1], 2, l[0])) {
      ret += l[0]
    }
  }
  return ret
}

function d7P2() {
  const input = fs.readFileSync("./d7Data.txt", "utf-8").trim().split("\n")
  let total = 0

  // Recursive evaluator function
  const ev = (l, v, i, t) => {
    if (i >= l.length) return v === t // Base case: check if result matches target

    // Try all operators: addition, multiplication, and concatenation
    return (
      ev(l, v + l[i], i + 1, t) || // Try addition
      ev(l, v * l[i], i + 1, t) || // Try multiplication
      ev(l, +("" + v + l[i]), i + 1, t) // Try concatenation
    )
  }

  // Process each line
  for (let line of input) {
    const l = ints(line) // Extract numbers from the line
    const targetValue = l[0] // The target value is the first number
    const operands = l.slice(1) // The rest are operands

    if (ev(operands, operands[0], 1, targetValue)) {
      total += targetValue // Add the target value to the total if valid
    }
  }

  return total
}

console.log(d7())
console.log(d7P2())
