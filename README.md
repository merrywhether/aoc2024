# AoC 2024

[![](https://img.shields.io/badge/stars%20⭐-20-yellow)](#2024-results)
[![](https://img.shields.io/badge/days%20completed-10-red)](#2024-results)

[Advent of Code 2024](https://adventofcode.com/2024) using(/learning) Deno and Zed.

## Setup

Create an `.env` file with the following content:

```sh
AOC_SESSION=your_session_cookie
INPUT_KEY=encryption_key
```

Per AoC guidelines, the inputs should not be stored in your repo so that people cannot reverse their generation strategies.
In order to preserve replayability, the input data is encrypted using the `INPUT_KEY` and stored that way instead.
After pulling a fresh copy of the repo, you can decrypt the input data by running the following command (assuming you have the correct key):

```sh
deno run decrypt
```

This was quite the rabbit hole to go down for this small payoff but whatever. 🤷‍♀️

## Daily Workflow

1. Duplicate the `src/00` directory and name the copy `src/XX` using the two-digit, one-indexed number of the day's challenge.
2. Copy-pasta the sample data into `sample.txt`.
3. Use the `dev` task to run the tests in watch mode against the sample data:

```sh
DAY=XX deno run dev
```

4. Use the `solve` task to output a solution based on the input data:

```sh
DAY=XX deno run solve
```

5. Add the solution and timing to the top of that day's `main.ts` for posterity.
6. Duplicate `test.ts` and name the copy `input.test.ts`. Change the target to `input` and update the expected values.
7. Commit with message `day XX` and push, triggering an update of the star/day progress tracking in this README.

## Other Tasks

Use the `test` task to run all tests against the sample data (mostly for CI):

```sh
deno run test
```

Use the `test:input` task to run all tests against the input data (mostly for validating changes to the repo structure):

```sh
deno run test:input
```

<!--- advent_readme_stars table --->
## 2024 Results

| Day | Part 1 | Part 2 |
| :---: | :---: | :---: |
| [Day 1](https://adventofcode.com/2024/day/1) | ⭐ | ⭐ |
| [Day 2](https://adventofcode.com/2024/day/2) | ⭐ | ⭐ |
| [Day 3](https://adventofcode.com/2024/day/3) | ⭐ | ⭐ |
| [Day 4](https://adventofcode.com/2024/day/4) | ⭐ | ⭐ |
| [Day 5](https://adventofcode.com/2024/day/5) | ⭐ | ⭐ |
| [Day 6](https://adventofcode.com/2024/day/6) | ⭐ | ⭐ |
| [Day 7](https://adventofcode.com/2024/day/7) | ⭐ | ⭐ |
| [Day 8](https://adventofcode.com/2024/day/8) | ⭐ | ⭐ |
| [Day 9](https://adventofcode.com/2024/day/9) | ⭐ | ⭐ |
| [Day 10](https://adventofcode.com/2024/day/10) | ⭐ | ⭐ |
<!--- advent_readme_stars table --->

## Useful references

- https://github.com/denoland/advent-of-code-2024
- https://docs.deno.com/runtime/reference/deno_namespace_apis/
- https://docs.deno.com/examples/
- https://zed.dev/docs/languages/deno
