import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  return (
    <nav className="flex items-center space-x-2 py-4" aria-label="Breadcrumb">
      <Button
        variant="ghost"
        size="sm"
        onClick={items[0]?.onClick}
        className="flex items-center space-x-1 text-muted-foreground hover:text-foreground"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Button>
         
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
          <Button
            variant="ghost"
            size="sm"
            onClick={item.onClick}
            className={`text-sm ${
              index === items.length - 1
                ? 'text-foreground font-medium'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {item.label}
          </Button>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default BreadcrumbNav;