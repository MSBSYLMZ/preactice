import { QuestionType } from "interfaces";

function validateLength(item: string, maxLength: number, minLength: number = 0) {
	return item.length <= maxLength && item.length >= minLength;
}
