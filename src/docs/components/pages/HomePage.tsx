import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DocsLayout } from '../layout/DocsLayout';
import { Icon } from '../ui/Icon';
import { cn } from '../../lib/utils';

export interface FeatureCardProps {
  title: string;
  description: string;
  href?: string;
  icon?: ReactNode;
}

export function FeatureCard({ title, description, href, icon }: FeatureCardProps) {
  const content = (
    <div className={cn(
      'group rounded-xl border border-border bg-card p-6 transition-all',
      href && 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5'
    )}>
      {icon && (
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      {href && (
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
          Learn more
          <Icon icon={ArrowRight} size="sm" className="transition-transform group-hover:translate-x-1" />
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }
  return content;
}

export interface HomePageProps {
  title: string;
  description: string;
  features?: FeatureCardProps[];
  primaryAction?: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
  children?: ReactNode;
}

export function HomePage({
  title,
  description,
  features,
  primaryAction,
  secondaryAction,
  children,
}: HomePageProps) {
  return (
    <DocsLayout showSidebar={false} showToc={false}>
      <div className="py-12 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
          
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              {primaryAction && (
                <Link 
                  to={primaryAction.href}
                  className="inline-flex items-center justify-center h-10 px-6 text-base rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {primaryAction.label}
                  <Icon icon={ArrowRight} size="sm" className="ml-2" />
                </Link>
              )}
              {secondaryAction && (
                <Link 
                  to={secondaryAction.href}
                  className="inline-flex items-center justify-center h-10 px-6 text-base rounded-md font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {secondaryAction.label}
                </Link>
              )}
            </div>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard key={i} {...feature} />
            ))}
          </div>
        )}

        {children}
      </div>
    </DocsLayout>
  );
}
