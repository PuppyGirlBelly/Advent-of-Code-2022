# 🎄 Advent of Code 2022 - day 3 🎄

## Info

Task description: [link](https://adventofcode.com/2022/day/3)

## Notes

Used Sets to determine unique members of each section to help reduce the search space, but the allocation may have made it much more complicated than it needed to be. Here is the result of the first solution;
```
Part 1: 0.776ms
Part 2: 0.946ms
Total: 1.722ms
```
So let's see how a more simplistic solution works...

Okay! Used `.filter()` and `.includes()` and it reduced the times to the following;
```
Part 1: 0.577ms
Part 2: 0.348ms
Total: 0.925ms
```

