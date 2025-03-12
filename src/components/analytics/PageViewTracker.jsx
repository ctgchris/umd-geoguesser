import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../../hooks/useAnalytics';

export const PageViewTracker = ({ children, pageName, additionalData = {} }) => {
  const location = useLocation();
  const { logEvent } = useAnalytics();

  useEffect(() => {
    // Track detailed page view information
    logEvent('enhancedPageView', {
      pageName,
      path: location.pathname,
      search: location.search,
      timestamp: new Date().toISOString(),
      referrer: document.referrer,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      ...additionalData
    });
  }, [location, pageName, additionalData, logEvent]);

  return children;
};

export default PageViewTracker; 