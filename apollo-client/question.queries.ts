import { gql } from "@apollo/client";


export const GET_ALL_QUESTIONS = gql`
	query {
		questions {
			id
			text
            options{
                text
                correct
            }
		}
	}
`;

export const addQuestion = gql`
	mutation addQuestion($text: String!) {
		addQuestion(text: $text) {
			id
			text
		}
	}
`;
