"use strict";
// David's O(N) Pathfinder
// Calculate path

function getNextPoint(a, b, shape) {
	let highestPosPoint = [0, 0];
	let highestNegPoint = [0, 0];
	let highestPosDistance = 0;
	let highestNegDistance = 0;
	let posSet = false;
	let negSet = false;
	let lowerPoint = [0, 0];
	let lowerDistance = 0;

	for (let j = 0; j < shape.length; j++) {
		let distance = ((b[1] - a[1]) * shape[j][0] - (b[0] - a[0]) * shape[j][1] + b[0] * a[1] - b[1] * a[0]) / Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2));
		if (distance > 0 && distance > highestPosDistance) {
			highestPosDistance = distance;
			highestPosPoint = shape[j];
			posSet = true;
		}
		if (distance < 0 && distance < -highestNegDistance) {
			highestNegDistance = -distance;
			highestNegPoint = shape[j];
			negSet = true;
		}
	}

	if (!negSet || (posSet && highestPosDistance < highestNegDistance)) {
		lowerDistance = highestPosDistance;
		lowerPoint = highestPosPoint;
	} else {
		lowerDistance = highestNegDistance;
		lowerPoint = highestNegPoint;
	}

	return lowerPoint;
}

function makePath(a, b, shapes) {
	return [a].concat(makePath2(a, b, shapes)).concat([b]);
}

function makePath2(a, b, shapes, depth) {
	depth = depth || 0;
	if (depth > 500) {
		console.log("Stopping to not overflow!")
		return [];
	}
	let intersecting = false;
	let intersectingShape = [];
	for (let shape of shapes) {
		for (let i = 0; i < shape.length - (shape.length == 2 ? 1 : 0); i++) {
			if (intersect(a, b, shape[i], shape[(i + 1) % shape.length])) {
				intersecting = true;
				intersectingShape = shape;
				break;
			}
		}
		if (intersecting) {
			break;
		}
	}

	if (intersecting) {
		let point = getNextPoint(a, b, intersectingShape);
		return makePath2(a, point, shapes, depth + 1).concat([point]).concat(makePath2(point, b, shapes, depth + 1));
	} else {
		return [];
	}

}

function ccw(A, B, C) {
	return (C[1] - A[1]) * (B[0] - A[0]) > (B[1] - A[1]) * (C[0] - A[0]);
}

function distChk(a, b) {
	//return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)) > 10;
	return a != b;
}

function intersect(A, B, C, D) {
	return distChk(A, B) && distChk(A, C) && distChk(A, D) && distChk(B, C) && distChk(B, D) && distChk(C, D) && (ccw(A, C, D) != ccw(B, C, D) && ccw(A, B, C) != ccw(A, B, D));
}