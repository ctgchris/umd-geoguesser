/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPuzzle = /* GraphQL */ `
  query GetPuzzle($id: ID!) {
    getPuzzle(id: $id) {
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
export const listPuzzles = /* GraphQL */ `
  query ListPuzzles(
    $filter: ModelPuzzleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPuzzles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getUserScore = /* GraphQL */ `
  query GetUserScore($id: ID!) {
    getUserScore(id: $id) {
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
export const listUserScores = /* GraphQL */ `
  query ListUserScores(
    $filter: ModelUserScoreFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserScores(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        date
        score
        timestamp
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
