export const getQuestionById = `
    query Query($questionId: Int!) {
        question(id: $questionId) {
        id
        text
        media
        creator_id
        status
        privacy
        options {
            id
            text
            media
            correct
            question_id
        }
        }
    }
`;

export const getAllQuestions = `
    query Query {
        questions {
        id
        text
        creator_id
        media
        status
        privacy
        options {
            text
            media
            correct
            question_id
            id
        }
        }
    }`;
