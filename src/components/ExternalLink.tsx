import { ReactNode, HTMLAttributes } from 'react';

interface ExternalLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  href?: string;
  rel?: string;
  title?: string;
  id?: string;
}

export function ExternalLink({
  children,
  ...rest
}: ExternalLinkProps): JSX.Element {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );
}
