# AoC2024

[Advent of Code 2024](https://adventofcode.com/2024) using(/learning) Deno and Zed.

## Usage

Duplicate the `src/00` directory and rename it to the two-digit, one-indexed number of the day's challenge.
Paste the sample and input data into their respective files.

Use the `dev` task to run the tests in watch mode against the sample data:

```sh
DAY=XX deno run dev
```

Use the `solve` task to output a solution based on the input data:

```sh
DAY=XX deno run solve
```

Use the `test` task to run all tests against the sample data (mostly for CI):

```sh
deno run test
```

## Useful references

- https://github.com/denoland/advent-of-code-2024
- https://docs.deno.com/runtime/reference/deno_namespace_apis/
- https://docs.deno.com/examples/
- https://zed.dev/docs/languages/deno
