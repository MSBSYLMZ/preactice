//@ts-nocheck
export const isEmpty = obj => Object.keys(obj).length === 0;
export const isKeysExistsInObject = (obj, keys) => keys.filter(item => !([item] in obj)).length === 0;
export const minifyObjectByKeys = (obj, keys) => keys.reduce((acc, cur) => [cur] in obj && { ...acc, [cur]: obj[cur] }, {});

export function getRndInteger(max, min = 1) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

export function removeElementFromArray(array, index, deleteCount = 1) {
	let result = [...array];
	result.splice(index, deleteCount);
	return result;
}

export function createSlotsInfoObject(slotCount) {
	const result = {};
	for (let i = 0; i < slotCount; i++) {
		result[i] = false;
	}
	return result;
}

export const operators = new Map();
operators.set(0, { operator: "*", method: (a, b) => a * b });
operators.set(1, { operator: "/", method: (a, b) => a / b });
operators.set(2, { operator: "+", method: (a, b) => a + b });
operators.set(3, { operator: "-", method: (a, b) => a - b });
