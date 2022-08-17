//@ts-nocheck
import { operators, getRndInteger, shuffleArray } from "./index";

export const generateQuestion = () => {
	const operatorIndex = getRndInteger(4);
	const firstElement = getRndInteger(10);
	const secondElement = getRndInteger(10);
	const question = firstElement + operators.get(operatorIndex).operator + secondElement + " = ? ";
	const answer = operators.get(operatorIndex).method(firstElement, secondElement).toFixed(2);
	return {
		question,
		answer,
	};
};

export const generateOptions = answer => {
	const options = [];
	options.push(+answer);
	for (let i = 0; i < 3; i++) {
		let result = generateOption(answer);
		while (options.includes(+result)) {
			result = generateOption(answer);
		}
		options.push(+result);
	}
	return shuffleArray(options);
};

export const generateOption = answer => {
	const operatorIndex = getRndInteger(3);
	const secondElement = getRndInteger(10);
	const result = operators
		.get(operatorIndex)
		.method(+answer, secondElement)
		.toFixed(2);
	return result;
};
