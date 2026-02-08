import { type LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const iconSizes: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
};

export interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
}

export function Icon({ icon: LucideIcon, size = 'md', className }: IconProps) {
  return (
    <LucideIcon 
      size={iconSizes[size]} 
      className={cn('shrink-0', className)} 
    />
  );
}
