class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: 'warning' | 'error' | 'critical'
  ) {
    super(message);
  }
}

export const handleError = (error: AppError) => {
  // Log error
  console.error(`[${error.code}] ${error.message}`);
  
  // Show user-friendly message
  toast({
    title: 'Error',
    description: error.message,
    status: error.severity,
  });
}; 