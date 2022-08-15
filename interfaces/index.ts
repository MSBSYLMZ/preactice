export interface Props {
	className?: string;
}

export interface QuestionType {
	id?: number;
	text: string;
	media?: string;
	creator?: {
		id: number
		first_name: string;
		last_name: string;
	};
}
