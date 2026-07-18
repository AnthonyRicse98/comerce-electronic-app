import React from 'react';

interface SVGButtonProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

export const SVGButton = ({ color = 'currentColor', className, children, ...props }: SVGButtonProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    {children}
  </svg>
);