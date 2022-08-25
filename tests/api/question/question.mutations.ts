export const questionCreateMutation = `
mutation Mutation($text: String!, $options: [QuestionOptionCreateInputs]!, $media: String, $status: Status, $privacy: Privacy) {
    createQuestion(text: $text, options: $options, media: $media, status: $status, privacy: $privacy) {
      id
      text
      media
      creator_id
      status
      privacy
      options {
        text
        correct
        media
      }
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
    mutation Mutation($id:Int!, $text: String, $creatorId: Int, $status:Status, $privacy:Privacy, $media: String) {
        updateQuestion(id: $id, text: $text, creator_id: $creatorId, status: $status, privacy: $privacy, media: $media ) {
            id
            text
            media
            creator_id
            status
            privacy
            options {
                text
                correct
                media
              }
        }
    }`;

export const questionDeleteMutation = `
    mutation Mutation($id: Int!) {
        deleteQuestion(id: $id) {
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
