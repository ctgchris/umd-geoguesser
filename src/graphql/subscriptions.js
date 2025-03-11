/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePuzzle = /* GraphQL */ `
  subscription OnCreatePuzzle($filter: ModelSubscriptionPuzzleFilterInput) {
    onCreatePuzzle(filter: $filter) {
      id
      date
      imageUrl
      actualLat
      actualLng
      hintRadius
      difficulty
      imageDescription
      aiFunFacts
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePuzzle = /* GraphQL */ `
  subscription OnUpdatePuzzle($filter: ModelSubscriptionPuzzleFilterInput) {
    onUpdatePuzzle(filter: $filter) {
      id
      date
      imageUrl
      actualLat
      actualLng
      hintRadius
      difficulty
      imageDescription
      aiFunFacts
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePuzzle = /* GraphQL */ `
  subscription OnDeletePuzzle($filter: ModelSubscriptionPuzzleFilterInput) {
    onDeletePuzzle(filter: $filter) {
      id
      date
      imageUrl
      actualLat
      actualLng
      hintRadius
      difficulty
      imageDescription
      aiFunFacts
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUserScore = /* GraphQL */ `
  subscription OnCreateUserScore(
    $filter: ModelSubscriptionUserScoreFilterInput
  ) {
    onCreateUserScore(filter: $filter) {
      id
      userId
      date
      score
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUserScore = /* GraphQL */ `
  subscription OnUpdateUserScore(
    $filter: ModelSubscriptionUserScoreFilterInput
  ) {
    onUpdateUserScore(filter: $filter) {
      id
      userId
      date
      score
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUserScore = /* GraphQL */ `
  subscription OnDeleteUserScore(
    $filter: ModelSubscriptionUserScoreFilterInput
  ) {
    onDeleteUserScore(filter: $filter) {
      id
      userId
      date
      score
      timestamp
      createdAt
      updatedAt
      __typename
    }
  }
`;
