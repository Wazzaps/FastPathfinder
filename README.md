# FastPathfinder
A fast, Non-rasterizing pathfinder

See an example at http://Wazzaps.github.io/FastPathfinder

# Usage
```javascript
let shapes = [
	[[341,292], [239,349], [152,270], [201,163], [318,176]]
];
let path = makePath([50, 30], [480, 420], shapes); // = [[50,30], [318,176], [480,420]];
```