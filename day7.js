const fs = require("node:fs")

function ints(s, neg = true) {
  let reg = /\d+/g
  if (neg) reg = /-?\d+/g

  return [...s.matchAll(reg)].map((x) => +x[0])
}
function d7(p2) {
  let inp = fs.readFileSync("./d7Data.txt", "utf-8").trim().split("\n")
  let ret = 0

  let ev = (l, v, i, t) => {
    if (i >= l.length) return v == t
    return (
      ev(l, v + l[i], i + 1, t) ||
      ev(l, v * l[i], i + 1, t) ||
      (p2 && ev(l, +("" + v + l[i]), i + 1, t))
    )
  }
  for (let line of inp) {
    let l = ints(line)
    if (ev(l, l[1], 2, l[0])) {
      ret += l[0]
    }
  }
  return ret
}

console.log(d7())
