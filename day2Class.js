//Solution accepted. part 2 of challenge only. I don't know what I did

class Solution {
  constructor() {
    this.reports = []
    this.parseInput()
  }

  // Method to parse the input
  parseInput() {
    const fs = require("fs")
    const input = fs.readFileSync("../../../day2Data.txt", "utf8").trim()
    this.reports = input.split("\n").map((line) => line.split(" ").map(Number))
  }

  // Method to check if a report is valid
  isValid(report) {
    if (report.length <= 1) return true

    let isAscending = true
    let isDescending = true

    for (let i = 1; i < report.length; i++) {
      if (report[i] <= report[i - 1] || report[i] - report[i - 1] > 3) {
        isAscending = false
      }
      if (report[i] >= report[i - 1] || report[i - 1] - report[i] > 3) {
        isDescending = false
      }
    }

    return isAscending || isDescending
  }

  //part 1 method
  partOne() {}

  // Part 2 method
  partTwo() {
    let safeReports = 0

    for (let report of this.reports) {
      if (this.isValid(report)) {
        safeReports++
      } else {
        for (let i = 0; i < report.length; i++) {
          // Create a new report by removing the i-th element
          const newReport = [...report.slice(0, i), ...report.slice(i + 1)]
          if (this.isValid(newReport)) {
            safeReports++
            break
          }
        }
      }
    }

    console.log(safeReports)
    return safeReports
  }
}

// Running the solution
const day1 = new Solution()
day1.partTwo()
