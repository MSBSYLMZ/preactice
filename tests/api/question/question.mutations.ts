export const questionCreateMutation = `

    mutation addQuestion($text: String!, $options: [QuestionOptionCreateInputs]) {
        text
        media
        creator_id
        status
        privacy
        options {
            text
            correct
        }
    }`;

export const questionCreateMutationsWithoutOptions = `
    mutation Mutation($text: String!) {
        addQuestion(text: $text) {
            text
            media
            creator_id
            status
            privacy
    }`;

export const questionUpdateMutation = `
    mutation Mutation($text: String!) {
        updateQuestion(text: $text) {
            text
            media
            creator_id
            status
            privacy
}`;

export const questionDeleteMutation = `
    mutation Mutation($id: Int!) {
        deleteQuestion(id: $id) {
            text
            media
            creator_id
            status
            privacy
    }`;
