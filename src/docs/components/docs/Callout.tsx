import { type ReactNode } from 'react';
import { AlertCircle, Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Icon } from '../ui/Icon';

export type CalloutVariant = 'info' | 'warning' | 'danger' | 'success' | 'tip';

const calloutConfig: Record<CalloutVariant, { 
  icon: typeof Info; 
  className: string;
  title: string;
}> = {
  info: {
    icon: Info,
    className: 'border-blue-500/30 bg-blue-500/5 text-blue-600 dark:text-blue-400',
    title: 'Info',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-600 dark:text-yellow-400',
    title: 'Warning',
  },
  danger: {
    icon: AlertCircle,
    className: 'border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400',
    title: 'Danger',
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-500/30 bg-green-500/5 text-green-600 dark:text-green-400',
    title: 'Success',
  },
  tip: {
    icon: Lightbulb,
    className: 'border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400',
    title: 'Tip',
  },
};

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Callout({ variant = 'info', title, children, className }: CalloutProps) {
  const config = calloutConfig[variant];
  
  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 p-4',
        config.className,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon icon={config.icon} size="lg" className="mt-0.5 shrink-0" />
        <div className="flex-1 min-w-0">
          {(title || config.title) && (
            <p className="font-semibold mb-1">{title || config.title}</p>
          )}
          <div className="text-sm text-foreground/80">{children}</div>
        </div>
      </div>
    </div>
  );
}
