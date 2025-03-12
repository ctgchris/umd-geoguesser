import { useCallback } from 'react';
import { trackEvent, trackUserInteraction, trackError } from '../config/analytics';

export const useAnalytics = () => {
  const logEvent = useCallback((eventName, attributes = {}) => {
    trackEvent(eventName, attributes);
  }, []);

  const logUserInteraction = useCallback((action, details = {}) => {
    trackUserInteraction(action, details);
  }, []);

  const logError = useCallback((error, context = {}) => {
    trackError(error, context);
  }, []);

  return {
    logEvent,
    logUserInteraction,
    logError
  };
}; 