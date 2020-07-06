import React, { ReactNode, HTMLAttributes } from 'react';

interface ExternalLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href?: string;
  rel?: string;
  title?: string;
  id?: string;
}

export default function ExternalLink({ children, ...rest }: ExternalLinkProps) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
