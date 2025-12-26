// useErrorBounty.ts

import { useCallback, useContext, useRef } from 'react';
import { BugBountyManager } from './bug-bounty-manager';
import { ErrorDetails, ErrorBountyContext } from './error-bounty.types';

// Create context
const BugBountyContext = React.createContext<BugBountyManager | null>(null);

// Provider component
export const BugBountyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const bountyManager = useRef(new BugBountyManager());
  
  return (
    <BugBountyContext.Provider value={bountyManager.current}>
      {children}
    </BugBountyContext.Provider>
  );
};

// Hook for using the bug bounty system
export const useErrorBounty = () => {
  const bountyManager = useContext(BugBountyContext);
  
  if (!bountyManager) {
    throw new Error('useErrorBounty must be used within a BugBountyProvider');
  }

  const captureError = useCallback((
    error: Error,
    componentName: string,
    methodName?: string,
    additionalContext?: any
  ) => {
    const details: ErrorDetails = {
      message: error.message,
      stackTrace: error.stack,
      componentName,
      methodName,
      stateSnapshot: additionalContext
    };

    const context: ErrorBountyContext = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV as any,
      version: process.env.REACT_APP_VERSION || '1.0.0',
      additionalContext
    };

    return bountyManager.captureError(error, details, context, 'system');
  }, [bountyManager]);

  const reportSecurityIssue = useCallback((
    title: string,
    description: string,
    evidence: any
  ) => {
    const context: ErrorBountyContext = {
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV as any,
      version: process.env.REACT_APP_VERSION || '1.0.0'
    };

    return bountyManager.captureHighRiskIssue(title, description, context, 'user', evidence);
  }, [bountyManager]);

  return {
    captureError,
    reportSecurityIssue,
    getReports: bountyManager.getReports.bind(bountyManager),
    getCriticalReports: bountyManager.getCriticalReports.bind(bountyManager)
  };
};