import { Analytics } from 'aws-amplify';

// Initialize analytics with default configuration
export const initializeAnalytics = () => {
  Analytics.autoTrack('session', {
    enable: true,
    provider: 'AWSPinpoint'
  });

  Analytics.autoTrack('pageView', {
    enable: true,
    provider: 'AWSPinpoint',
    getUrl: () => window.location.pathname
  });
};

// Track custom events
export const trackEvent = (eventName, attributes = {}) => {
  Analytics.record({
    name: eventName,
    attributes: {
      ...attributes,
      timestamp: new Date().toISOString()
    }
  });
};

// Track user interactions
export const trackUserInteraction = (action, details = {}) => {
  Analytics.record({
    name: 'UserInteraction',
    attributes: {
      action,
      ...details,
      timestamp: new Date().toISOString()
    }
  });
};

// Track errors
export const trackError = (error, context = {}) => {
  Analytics.record({
    name: 'Error',
    attributes: {
      errorMessage: error.message,
      errorStack: error.stack,
      ...context,
      timestamp: new Date().toISOString()
    }
  });
}; 