//@ts-nocheck
export const isEmpty = obj => {
	return Object.keys(obj).length === 0;
};
export const isKeysExistsInObject = (obj, keys) => keys.filter(item => !([item] in obj)).length === 0;
export const minifyObjectByKeys = (obj, keys) => keys.reduce((acc, cur) => [cur] in obj && { ...acc, [cur]: obj[cur] }, {});

export function getRndInteger(max: number, min = 1) {
	return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandUniqueIntArray(max, min = 1, size) {
	const uniqueRandSet = new Set();
	for (let i = 0; i < size; i++) {
		uniqueRandSet.add(getRndInteger(max, min));
	}
	if (uniqueRandSet.size < size) {
		Array.from({ length: size }, (v, i) => uniqueRandSet.add(i + min));
	}
	return Array.from(uniqueRandSet).slice(0, size);
}

export function range(length, startAt = 0) {
	return Array.from({ length }, (_, i) => i + startAt);
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
