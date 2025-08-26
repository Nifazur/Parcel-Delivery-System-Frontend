import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  containerClassName?: string;
  iconBgColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  description,
  iconClassName = "w-7 h-7 text-primary-foreground",
  titleClassName = "text-3xl font-bold text-foreground",
  descriptionClassName = "text-muted-foreground",
  containerClassName = "mb-8",
  iconBgColor = "bg-primary"
}) => {
  return (
    <div className={containerClassName}>
      <div className="flex items-center space-x-3 mb-4">
        <div className={`w-12 h-12 ${iconBgColor} rounded-xl flex items-center justify-center`}>
          <Icon className={iconClassName} />
        </div>
        <div>
          <h1 className={titleClassName}>{title}</h1>
          {description && (
            <p className={descriptionClassName}>{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;