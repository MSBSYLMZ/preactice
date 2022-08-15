import { gql } from "@apollo/client";


export const getAllQuestions = gql`
	query {
		questions {
			id
			text
            creator{
                id,
                first_name,
                last_name
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
