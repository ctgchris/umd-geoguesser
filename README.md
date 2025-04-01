# UMD GeoGuesser
A web application for geography enthusiasts, featuring daily and past puzzles.  Users can test their knowledge of geographic locations by guessing the location of images. An admin panel allows authorized users to add and manage puzzles.

<div align="center">
<img src="https://github.com/ctgchris/umd-geoguesser/blob/main/image-1743495353563.png?raw=true" alt="image-1743495353563.png" />
</div>

<div align="center">
<img src="https://github.com/ctgchris/umd-geoguesser/blob/main/image-1743495576099.png?raw=true" alt="image-1743495576099.png" />
</div>


## Features
* **Daily Puzzle:** A new puzzle is presented daily.
* **Past Puzzles:** Access to a library of past puzzles.
* **Detailed Puzzle View:**  Each puzzle shows the image, allows for a guess, and reveals the actual location and distance from the user's guess.
* **User Authentication:** Secure user login via Google authentication.
* **User Scores:** Tracks and displays user scores for completed puzzles.
* **Admin Panel:**  Allows authorized administrators to add, update, and delete puzzles. Includes features for uploading images and generating location summaries via AI.
* **Analytics Tracking:** Tracks page views and user interactions for analytical purposes.
* **Feedback Section:** Provides a mechanism for users to submit feedback.

## Usage
1. Navigate to the deployed application (link to be added upon deployment).
2. View the daily puzzle and submit your guess.
3. Explore past puzzles and check your scores.
   (For Administrators)
4. Access the Admin Panel (link to be provided upon deployment) to manage puzzles.

## Installation
1. Clone the repository: `git clone git@github.com:<your_username>/geoguesser-umd.git`
2. Navigate to the project directory: `cd geoguesser-umd`
3. Install dependencies: `npm install`
4. Create a `.env` file with the necessary API keys and AWS configurations.  See `.env.example` for placeholders.
5. Start the development server: `npm start`

## Technologies Used
* **React:** JavaScript library for building user interfaces.
* **React Router Dom:**  Routing library for React.
* **AWS Amplify:** Framework for building AWS-powered applications, used for authentication, API interaction, and storage.
* **AWS AppSync:** Serverless GraphQL API service.
* **AWS Cognito:** User authentication and authorization service.
* **AWS S3:** Object storage service for images.
* **Google Maps API:** Used for displaying maps and calculating distances.
* **@google/generative-ai:** Gemini AI API for generating fun facts.
* **Tailwind CSS:** Utility-first CSS framework.
* **Node.js & npm:** JavaScript runtime environment and package manager.

## Configuration
Create a `.env` file in the root directory of your project.  Populate it with the values from `.env.example`, replacing the placeholders with your actual API keys and AWS configurations. This includes:

* `REACT_APP_GOOGLE_MAPS_API_KEY`
* `REACT_APP_GEMINI_API_KEY`
* `REACT_APP_AWS_REGION`
* `REACT_APP_AWS_USER_POOLS_ID`
* `REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID`
* `REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID`
* `REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT`
* `REACT_APP_AWS_APPSYNC_API_KEY`
* `REACT_APP_AWS_USER_FILES_S3_BUCKET`
* `REACT_APP_AWS_USER_FILES_S3_BUCKET_REGION`
* `REACT_APP_OAUTH_DOMAIN`

## API Documentation
The application utilizes a GraphQL API hosted on AWS AppSync. The schema is defined in `src/graphql/schema.json`.  The queries and mutations are found in `src/graphql/queries.js` and `src/graphql/mutations.js` respectively.

## Dependencies
See `package.json` for a complete list of dependencies and their versions.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request.

*README.md was made with [Etchr](https://etchr.dev)*