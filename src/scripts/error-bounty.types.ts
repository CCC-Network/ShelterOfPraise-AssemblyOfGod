// error-bounty.types.ts

export enum ErrorSeverity {
    CRITICAL = 'critical',    // System failure, data loss, security breach
    HIGH = 'high',            // Major functionality broken, security vulnerability
    MEDIUM = 'medium',        // Partial functionality loss, performance issues
    LOW = 'low',              // Minor UI issues, edge cases
    INFO = 'info'             // Informational, non-breaking issues
  }
  
  export enum ErrorCategory {
    SECURITY = 'security',
    PERFORMANCE = 'performance',
    FUNCTIONAL = 'functional',
    DATA_INTEGRITY = 'data_integrity',
    UI_UX = 'ui_ux',
    NETWORK = 'network',
    AUTHENTICATION = 'authentication',
    AUTHORIZATION = 'authorization',
    PAYMENT = 'payment',
    THIRD_PARTY = 'third_party',
    SYSTEM = 'system'
  }
  
  export interface ErrorBountyContext {
    userId?: string;
    sessionId?: string;
    userAgent: string;
    url: string;
    timestamp: string;
    environment: 'development' | 'staging' | 'production';
    version: string;
    additionalContext?: Record<string, any>;
  }
  
  export interface ErrorDetails {
    message: string;
    stackTrace?: string;
    lineNumber?: number;
    columnNumber?: number;
    fileName?: string;
    componentName?: string;
    methodName?: string;
    inputParameters?: any[];
    stateSnapshot?: any;
  }
  
  export interface BugBountyReport {
    id: string;
    severity: ErrorSeverity;
    category: ErrorCategory;
    title: string;
    description: string;
    reproductionSteps: string[];
    expectedBehavior: string;
    actualBehavior: string;
    impact: string;
    context: ErrorBountyContext;
    errorDetails: ErrorDetails;
    technicalAnalysis: string;
    securityImplications?: string;
    dataAffected?: string[];
    usersAffected?: number;
    frequency: 'once' | 'rare' | 'occasional' | 'frequent' | 'constant';
    priority: number; // Calculated based on severity, impact, frequency
    bountyAmount?: number;
    status: 'reported' | 'investigating' | 'confirmed' | 'fixing' | 'resolved' | 'duplicate' | 'wont_fix';
    reportedBy: string;
    reportedAt: string;
    assignedTo?: string;
    resolvedAt?: string;
    fixVersion?: string;
    attachments?: string[]; // Screenshots, logs, etc.
  }