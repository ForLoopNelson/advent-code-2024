def load_input(filename):
    machines = []

    with open(filename, "rt") as fin:
        next_machine = []
        for line in fin:
            if line.startswith("B"):
                line = line.split(",")
                next_machine.append(int(line[0].split("+")[1]))
                next_machine.append(int(line[1].split("+")[1]))
            elif line.startswith("P"):
                line = line.split(",")
                next_machine.append(int(line[0].split("=")[1]))
                next_machine.append(int(line[1].split("=")[1]))
                machines.append(next_machine)
            else:
                next_machine = []

    return machines


def get_token_count(machines, convert=False):
    tokens = 0
    for ax, ay, bx, by, prize_x, prize_y in machines:
        if convert:
            prize_x += 10000000000000
            prize_y += 10000000000000
        a = round((prize_y - ((by * prize_x) / bx)) / (ay - ((by * ax) / bx)))
        b = round((prize_x - ax * a) / bx)
        if ax * a + bx * b == prize_x and ay * a + by * b == prize_y:
            tokens += a * 3 + b

    return tokens


def main():
    machines = load_input("day13Data.txt")
    print(f"Part 1: {get_token_count(machines)}")
    print(f"Part 2: {get_token_count(machines, convert=True)}")


if __name__ == "__main__":
    main()