let can = document.getElementById("can");
let ctx = can.getContext("2d");

// fps calc
var filterStrength = 20;
var frameTime = 0,
	lastLoop = new Date,
	thisLoop;

function rotate_point(pt, origin, angle) {
	let s = Math.sin(angle);
	let c = Math.cos(angle);
	return [(pt[0] - origin[0]) * c - (pt[1] - origin[1]) * s + origin[0], (pt[0] - origin[0]) * s + (pt[1] - origin[1]) * c + origin[1]];
}

function rot3Around(pt3, angle) {
	//let around = [(pt3[0][0] + pt3[1][0] + pt3[2][0]) / 3, (pt3[0][1] + pt3[1][1] + pt3[2][1]) / 3];
	let around = [(pt3[0][0] + pt3[1][0] + pt3[2][0]) / 3, (pt3[0][1] + pt3[1][1] + pt3[2][1]) / 3];
	return [rotate_point(pt3[0], around, angle), rotate_point(pt3[1], around, angle), rotate_point(pt3[2], around, angle)];
}

function rotShapeAround(pts, angle) {
	//let around = [(pt3[0][0] + pt3[1][0] + pt3[2][0]) / 3, (pt3[0][1] + pt3[1][1] + pt3[2][1]) / 3];
	let around = [0, 0];
	for (let pt of pts) {
		around[0] += pt[0];
		around[1] += pt[1];
	}
	around[0] /= pts.length;
	around[1] /= pts.length;
	return pts.map((pt) => rotate_point(pt, around, angle));
}

function draw(path, shapes) {
	// Clear
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, can.width, can.height);

	// Draw Shapes
	ctx.fillStyle = "darkgreen";
	ctx.strokeStyle = "lime";
	ctx.lineWidth = 3;
	for (let shape of shapes) {
		ctx.beginPath();
		ctx.moveTo(shape[0][0], shape[0][1]);
		for (let i = 1; i < shape.length; i++) {
			ctx.lineTo(shape[i][0], shape[i][1]);
		}
		ctx.lineTo(shape[0][0], shape[0][1]);
		ctx.fill();
		ctx.stroke();
	}

	// Draw path
	ctx.strokeStyle = "red";
	ctx.lineWidth = 3;
	ctx.beginPath();
	ctx.moveTo(path[0][0], path[0][1]);
	ctx.font = "18px Consolas";
	//ctx.fillText((new Date().getTime() % 10000 / 100), 200, 20); // >20, >45
	ctx.fillText("A", path[0][0] + 3, path[0][1] - 3);
	for (let i = 1; i < path.length; i++) {
		ctx.lineTo(path[i][0], path[i][1]);
	}
	ctx.fillText("B", path[path.length - 1][0] + 3, path[path.length - 1][1] - 3);
	ctx.stroke();

	// Draw dots
	ctx.fillStyle = "MEDIUMAQUAMARINE";
	for (let i = 0; i < path.length; i++) {
		ctx.fillRect(path[i][0] - 5, path[i][1] - 5, 10, 10);
	}

	// Draw FPS
	var thisFrameTime = (thisLoop = new Date) - lastLoop;
	frameTime += (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;
	ctx.fillText((1000 / frameTime).toFixed(1), 450, 20);
}