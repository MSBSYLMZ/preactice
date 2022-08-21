import { gql } from "@apollo/client";

export const GET_ALL_QUESTIONS = gql`
	query {
		questions {
			id
			text
			options {
				text
				correct
			}
		}
	}
`;

export const ADD_QUESTION = gql`
	mutation Mutation($text: String!, $options: [QuestionOptionCreateInputs]!) {
		addQuestion(text: $text, options: $options) {
			text
			media
			creator_id
			status
			privacy
			options {
				text
				correct
			}
		}
	}
`;
