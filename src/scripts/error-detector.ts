// error-detector.ts

import { ErrorSeverity, ErrorCategory, ErrorDetails, BugBountyReport } from './error-bounty.types';

export class ErrorDetector {
  private static readonly SECURITY_PATTERNS = [
    /sql.*injection/i,
    /xss/i,
    /csrf/i,
    /authentication.*failed/i,
    /unauthorized/i,
    /jwt.*expired/i,
    /password.*leak/i,
    /token.*exposed/i,
    /cors.*error/i
  ];

  private static readonly PERFORMANCE_PATTERNS = [
    /timeout/i,
    /slow.*load/i,
    /memory.*leak/i,
    /cpu.*spike/i,
    /database.*slow/i,
    /api.*timeout/i
  ];

  private static readonly DATA_INTEGRITY_PATTERNS = [
    /data.*loss/i,
    /corrupt.*data/i,
    /validation.*failed/i,
    /invalid.*state/i,
    /inconsistent.*data/i
  ];

  public static classifyError(error: Error, details: ErrorDetails): { severity: ErrorSeverity; category: ErrorCategory } {
    const message = error.message.toLowerCase();
    const stack = error.stack?.toLowerCase() || '';

    // Security vulnerabilities (HIGHEST PRIORITY)
    if (this.isSecurityIssue(message, stack)) {
      return { severity: ErrorSeverity.CRITICAL, category: ErrorCategory.SECURITY };
    }

    // Data integrity issues
    if (this.isDataIntegrityIssue(message, stack)) {
      return { severity: ErrorSeverity.HIGH, category: ErrorCategory.DATA_INTEGRITY };
    }

    // Authentication/Authorization issues
    if (this.isAuthIssue(message, stack)) {
      return { severity: ErrorSeverity.HIGH, category: ErrorCategory.AUTHENTICATION };
    }

    // Payment issues
    if (this.isPaymentIssue(message, stack)) {
      return { severity: ErrorSeverity.HIGH, category: ErrorCategory.PAYMENT };
    }

    // Performance issues
    if (this.isPerformanceIssue(message, stack)) {
      return { severity: ErrorSeverity.MEDIUM, category: ErrorCategory.PERFORMANCE };
    }

    // Network issues
    if (this.isNetworkIssue(message, stack)) {
      return { severity: ErrorSeverity.MEDIUM, category: ErrorCategory.NETWORK };
    }

    // Default classification
    return { severity: ErrorSeverity.LOW, category: ErrorCategory.FUNCTIONAL };
  }

  private static isSecurityIssue(message: string, stack: string): boolean {
    return this.SECURITY_PATTERNS.some(pattern => 
      pattern.test(message) || pattern.test(stack)
    );
  }

  private static isDataIntegrityIssue(message: string, stack: string): boolean {
    return this.DATA_INTEGRITY_PATTERNS.some(pattern => 
      pattern.test(message) || pattern.test(stack)
    );
  }

  private static isAuthIssue(message: string, stack: string): boolean {
    return /unauthorized|authentication.*failed|jwt.*expired|token.*invalid/i.test(message);
  }

  private static isPaymentIssue(message: string, stack: string): boolean {
    return /payment.*failed|transaction.*declined|credit.*card|stripe|paypal/i.test(message);
  }

  private static isPerformanceIssue(message: string, stack: string): boolean {
    return this.PERFORMANCE_PATTERNS.some(pattern => 
      pattern.test(message) || pattern.test(stack)
    );
  }

  private static isNetworkIssue(message: string, stack: string): boolean {
    return /network.*error|failed.*fetch|axios.*error|CORS/i.test(message);
  }

  public static calculatePriority(severity: ErrorSeverity, frequency: string): number {
    const severityWeights = {
      [ErrorSeverity.CRITICAL]: 100,
      [ErrorSeverity.HIGH]: 80,
      [ErrorSeverity.MEDIUM]: 60,
      [ErrorSeverity.LOW]: 40,
      [ErrorSeverity.INFO]: 20
    };

    const frequencyWeights = {
      'constant': 1.0,
      'frequent': 0.8,
      'occasional': 0.6,
      'rare': 0.4,
      'once': 0.2
    };

    return severityWeights[severity] * frequencyWeights[frequency];
  }
}