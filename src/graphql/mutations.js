/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPuzzle = /* GraphQL */ `
  mutation CreatePuzzle(
    $input: CreatePuzzleInput!
    $condition: ModelPuzzleConditionInput
  ) {
    createPuzzle(input: $input, condition: $condition) {
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
export const updatePuzzle = /* GraphQL */ `
  mutation UpdatePuzzle(
    $input: UpdatePuzzleInput!
    $condition: ModelPuzzleConditionInput
  ) {
    updatePuzzle(input: $input, condition: $condition) {
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
export const deletePuzzle = /* GraphQL */ `
  mutation DeletePuzzle(
    $input: DeletePuzzleInput!
    $condition: ModelPuzzleConditionInput
  ) {
    deletePuzzle(input: $input, condition: $condition) {
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
export const createUserScore = /* GraphQL */ `
  mutation CreateUserScore(
    $input: CreateUserScoreInput!
    $condition: ModelUserScoreConditionInput
  ) {
    createUserScore(input: $input, condition: $condition) {
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
export const updateUserScore = /* GraphQL */ `
  mutation UpdateUserScore(
    $input: UpdateUserScoreInput!
    $condition: ModelUserScoreConditionInput
  ) {
    updateUserScore(input: $input, condition: $condition) {
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
export const deleteUserScore = /* GraphQL */ `
  mutation DeleteUserScore(
    $input: DeleteUserScoreInput!
    $condition: ModelUserScoreConditionInput
  ) {
    deleteUserScore(input: $input, condition: $condition) {
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
