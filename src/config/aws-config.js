const awsConfig = {
    aws_project_region: process.env.REACT_APP_AWS_REGION,
    aws_cognito_identity_pool_id: process.env.REACT_APP_AWS_COGNITO_IDENTITY_POOL_ID,
    aws_cognito_region: process.env.REACT_APP_AWS_REGION,
    aws_user_pools_id: process.env.REACT_APP_AWS_USER_POOLS_ID,
    aws_user_pools_web_client_id: process.env.REACT_APP_AWS_USER_POOLS_WEB_CLIENT_ID,
    
    aws_appsync_graphqlEndpoint: process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT,
    aws_appsync_region: process.env.REACT_APP_AWS_REGION,
    aws_appsync_authenticationType: 'API_KEY',
    aws_appsync_apiKey: process.env.REACT_APP_AWS_APPSYNC_API_KEY,
    
    oauth: {
        domain: process.env.REACT_APP_OAUTH_DOMAIN,
        scope: [
            'phone',
            'email',
            'openid',
            'profile',
            'aws.cognito.signin.user.admin'
        ],
        redirectSignIn: window.location.origin + '/',
        redirectSignOut: window.location.origin + '/',
        responseType: 'code'
    },
    
    federationTarget: 'COGNITO_USER_AND_IDENTITY_POOLS',
    aws_cognito_username_attributes: ['EMAIL'],
    aws_cognito_social_providers: ['GOOGLE'],
    aws_cognito_signup_attributes: ['EMAIL'],
    aws_cognito_mfa_configuration: 'OFF',
    aws_cognito_mfa_types: ['SMS'],
    aws_cognito_password_protection_settings: {
        passwordPolicyMinLength: 8,
        passwordPolicyCharacters: []
    },
    aws_cognito_verification_mechanisms: ['EMAIL'],
    
    aws_user_files_s3_bucket: process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET,
    aws_user_files_s3_bucket_region: process.env.REACT_APP_AWS_USER_FILES_S3_BUCKET_REGION,
    
    API: {
        GraphQL: {
            endpoint: process.env.REACT_APP_AWS_APPSYNC_GRAPHQL_ENDPOINT,
            region: process.env.REACT_APP_AWS_REGION,
            defaultAuthMode: 'apiKey',
            apiKey: process.env.REACT_APP_AWS_APPSYNC_API_KEY
        }
    }
};

export default awsConfig; 