import React, { type ReactNode } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface AlertProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ 
  children, 
  variant = 'info', 
  title,
  onClose,
  className = '' 
}) => {
  const baseClasses = 'rounded-lg p-4 relative';
  
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  };
  
  const iconClasses = 'h-5 w-5';
  
  const icons = {
    info: <Info className={iconClasses} />,
    success: <CheckCircle className={iconClasses} />,
    warning: <AlertTriangle className={iconClasses} />,
    error: <AlertCircle className={iconClasses} />,
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} role="alert">
      <div className="flex">
        <div className="flex-shrink-0">
          {icons[variant]}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium">
              {title}
            </h3>
          )}
          <div className={`text-sm ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-4 flex-shrink-0">
            <button
              type="button"
              className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;